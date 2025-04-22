# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from yt_dlp import YoutubeDL
from pathlib import Path
from datetime import datetime
import logging
from dotenv import load_dotenv
import ffmpeg

# Configuración inicial
load_dotenv()
app = FastAPI(title="YouTube DL API 2025", version="2025.3.31")

# Logger config
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Directorios
TEMP_DIR = Path(os.getenv("TEMP_DIR", "temp_downloads"))
TEMP_DIR.mkdir(exist_ok=True)

class DownloadManager:
    @staticmethod
    def clean_filename(filename: str) -> str:
        """Limpia caracteres inválidos en nombres de archivo"""
        return "".join(c for c in filename if c.isalnum() or c in (' ', '.', '_')).rstrip()

    @staticmethod
    def get_video_info(url: str) -> dict:
        """Obtiene metadatos del video sin descargar"""
        with YoutubeDL({'quiet': True}) as ydl:
            return ydl.extract_info(url, download=False)

    @staticmethod
    def combine_streams(video_path: Path, audio_path: Path, output_path: Path) -> Path:
        """Combina video y audio con FFmpeg"""
        try:
            (
                ffmpeg
                .input(str(video_path))
                .output(str(audio_path), str(output_path), vcodec='copy', acodec='copy')
                .run(overwrite_output=True, quiet=True)
            )
            return output_path
        except Exception as e:
            raise Exception(f"Error combinando streams: {str(e)}")

    @staticmethod
    def download_video(url: str, quality: str = "1080") -> Path:
        """Descarga y procesa el video (con combinación para 1080p+)"""
        try:
            is_high_quality = int(quality) >= 1080
            
            if is_high_quality:
                # Descarga separada para alta calidad
                video_opts = {
                    'format': f'bestvideo[height<={quality}]',
                    'outtmpl': str(TEMP_DIR / 'video_temp.%(ext)s'),
                    'quiet': True,
                }
                audio_opts = {
                    'format': 'bestaudio',
                    'outtmpl': str(TEMP_DIR / 'audio_temp.%(ext)s'),
                    'quiet': True,
                }

                with YoutubeDL(video_opts) as ydl_video, YoutubeDL(audio_opts) as ydl_audio:
                    info = ydl_video.extract_info(url, download=True)
                    ydl_audio.extract_info(url, download=True)
                    
                    video_path = next(TEMP_DIR.glob('video_temp.*'))
                    audio_path = next(TEMP_DIR.glob('audio_temp.*'))
                    final_filename = DownloadManager.clean_filename(info['title']) + ".mp4"
                    final_path = TEMP_DIR / final_filename
                    
                    # Combina streams
                    DownloadManager.combine_streams(video_path, audio_path, final_path)
                    
                    # Limpieza
                    video_path.unlink()
                    audio_path.unlink()
            else:
                # Descarga normal para <1080p
                ydl_opts = {
                    'format': f'bestvideo[height<={quality}]+bestaudio/best',
                    'outtmpl': str(TEMP_DIR / 'temp_%(title)s.%(ext)s'),
                    'merge_output_format': 'mp4',
                    'quiet': True,
                }
                with YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=True)
                    temp_file = next(TEMP_DIR.glob('temp_*'))
                    final_filename = DownloadManager.clean_filename(info['title']) + ".mp4"
                    final_path = TEMP_DIR / final_filename
                    temp_file.rename(final_path)

            logger.info(f"Video descargado: {final_path}")
            return final_path

        except Exception as e:
            logger.error(f"Error en descarga: {str(e)}")
            raise

@app.get("/info")
async def get_video_info(url: str):
    """Obtiene información del video sin descargar"""
    try:
        info = DownloadManager.get_video_info(url)
        return {
            "title": info.get('title'),
            "duration": info.get('duration'),
            "formats": [
                {
                    "resolution": f.get('height'),
                    "fps": f.get('fps'),
                    "codec": f.get('vcodec')
                } 
                for f in info.get('formats', []) 
                if f.get('vcodec') != 'none'
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/download")
async def download(
    url: str,
    quality: str = "1080",
    audio_only: bool = False
):
    """
    Descarga video/audio de YouTube
    
    Parámetros:
    - url: URL de YouTube (requerido)
    - quality: Resolución (144, 240, 360, 480, 720, 1080, etc.)
    - audio_only: Descargar solo audio (mp3)
    """
    try:
        if audio_only:
            quality = "bestaudio/best"
            
        file_path = DownloadManager.download_video(url, quality)
        return FileResponse(
            path=file_path,
            filename=file_path.name,
            media_type='audio/mp3' if audio_only else 'video/mp4'
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Configuración para producción
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        http="h11"
    )