"""
   Prueba de la libreria yt-dlp para descargar videos de youtube, video + audio.
   Este programa descarga el sonido y el video en una calidad especificada por el usuario.
   Una vez ambos streams descargados, los combina en un solo archivo MP4.
"""

import yt_dlp
from yt_dlp.utils import DownloadError

def listar_calidades_mejorado(url):
    """
    Obtiene las calidades disponibles para un video de YouTube.
    
    Args:
        url (str): URL del video de YouTube
        
    Returns:
        tuple: (lista de resoluciones disponibles, información del video) o (None, None) si hay error
    """
    try:
        # Configuración para obtener información detallada sin descargar
        ydl_opts = {
            'quiet': True,              # Silencia la salida de yt-dlp
            'no_warnings': True,        # Omite advertencias
            'extract_flat': False,      # No extraer información de playlists
            'playlist_items': '1',      # Solo procesar el primer elemento si es playlist
            'ignoreerrors': True        # Ignorar errores en playlists
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extraer información del video (sin descargar)
            info = ydl.extract_info(url, download=False)
            
            # Si es una playlist, tomar solo el primer video
            if 'entries' in info:
                info = info['entries'][0]
                print("\n⚠️ Se detectó una playlist. Solo se procesará el primer video.")
            
            print("\n🎬 Video:", info.get('title', 'Desconocido'))
            print("\n📡 Calidades disponibles (se combinará audio+video automáticamente):")
            
            # Extraer todas las resoluciones de video únicas
            resolutions = set()
            for f in info.get('formats', []):
                if f.get('vcodec') != 'none':  # Solo formatos que contienen video
                    res = f.get('height', '?')  # Obtener altura del video
                    if res:
                        resolutions.add(res)
            
            # Ordenar resoluciones de mayor a menor
            sorted_res = sorted(resolutions, reverse=True)
            
            # Mostrar opciones numeradas al usuario
            for i, res in enumerate(sorted_res):
                print(f"{i+1}. {res}p")
            
            return sorted_res, info
    
    except DownloadError as e:
        if 'Private video' in str(e):
            print("❌ Error: Video no disponible (privado/eliminado).")
        elif 'is not a valid URL' in str(e):
            print("❌ Error: URL de YouTube inválida.")
        else:
            print(f"❌ Error inesperado: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
    return None, None

def descargar_calidad_mejorado(info, resolucion, carpeta="."):
    """
    Descarga un video en la calidad seleccionada, combinando audio y video automáticamente.
    
    Args:
        info (dict): Información del video obtenida de yt-dlp
        resolucion (int): Resolución seleccionada para descargar
        carpeta (str): Carpeta de destino para la descarga
    """
    try:
        print(f"\n⬇️ Descargando video {resolucion}p con audio...")
        
        # Configuración optimizada para combinar lo mejor de video+audio
        ydl_opts = {
            # Selecciona el mejor video en la resolución solicitada (MP4) + mejor audio (AAC)
            'format': f'bestvideo[height<={resolucion}][ext=mp4]+bestaudio[ext=m4a]/best[height<={resolucion}]',
            
            # Plantilla para el nombre del archivo: "Título_720p.mp4"
            'outtmpl': f"{carpeta}/%(title)s_{resolucion}p.%(ext)s",
            
            # Formato final combinado (MP4)
            'merge_output_format': 'mp4',
            
            # Mostrar progreso de descarga
            'quiet': False,
            
            # Hook para mostrar progreso
            'progress_hooks': [lambda d: print_progress(d)],
            
            # Postprocesador para asegurar formato MP4
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',  # Asegurar formato MP4 final
            }],
            
            # Configuración para manejar playlists (solo descargar el video actual)
            'playlist_items': '1',
            'ignoreerrors': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Descargar el video usando la URL canónica del video
            ydl.download([info['webpage_url']])
        
        print("\n✅ ¡Descarga completada! (Video + Audio combinados)")
    
    except Exception as e:
        print(f"❌ Error al descargar: {e}")

def print_progress(d):
    """
    Muestra el progreso de la descarga en tiempo real.
    
    Args:
        d (dict): Diccionario con información de progreso de yt-dlp
    """
    if d['status'] == 'downloading':
        percent = d.get('_percent_str', '?')  # Porcentaje completado
        speed = d.get('_speed_str', '?')      # Velocidad de descarga
        print(f"\rProgreso: {percent} a {speed}", end='', flush=True)
    elif d['status'] == 'finished':
        print("\nCombinando audio y video...")

# --- Ejecución principal ---
if __name__ == "__main__":
    # Solicitar URL al usuario
    url = input("Ingresa la URL del video de YouTube: ")
    
    # Obtener calidades disponibles
    resoluciones, info = listar_calidades_mejorado(url)
    
    if resoluciones:
        try:
            print("\nℹ️ yt-dlp combinará automáticamente el mejor video+audio para la calidad seleccionada")
            
            # Solicitar selección de calidad al usuario
            eleccion = int(input("\n👉 Elige el número de la calidad a descargar: "))
            
            # Validar selección y descargar
            if 1 <= eleccion <= len(resoluciones):
                descargar_calidad_mejorado(info, resoluciones[eleccion-1])
            else:
                print("❌ Error: Número fuera de rango.")
        except ValueError:
            print("❌ Error: Ingresa un número válido.")