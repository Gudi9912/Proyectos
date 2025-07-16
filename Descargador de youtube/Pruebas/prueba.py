from pytubefix import YouTube
from pytubefix.exceptions import VideoUnavailable, RegexMatchError

def listar_calidades(url):
    try:
        yt = YouTube(url)
        
        # Obtener todos los streams de video (progresivos y DASH)
        streams = yt.streams.filter(progressive=True, file_extension="mp4", type="video").order_by("resolution")
        
        print("\n🎬 Video:", yt.title)
        print("\n📡 Calidades disponibles:")
        
        # Mostrar opciones numeradas
        for i, stream in enumerate(streams):
            fps = f"{stream.fps}fps" if stream.fps else ""
            print(f"{i+1}. {stream.resolution} ({stream.mime_type.split('/')[1]}, {fps})")
        
        return streams
    
    except VideoUnavailable:
        print("❌ Error: Video no disponible (privado/eliminado).")
    except RegexMatchError:
        print("❌ Error: URL de YouTube inválida.")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
    return None

def descargar_calidad(streams, eleccion, carpeta="."):
    try:
        stream = streams[eleccion - 1]  # Convertir input a índice
        print(f"\n⬇️ Descargando: {stream.resolution}...")
        
        # Descargar (si es progresivo ya incluye audio)
        if stream.is_progressive:
            stream.download(output_path=carpeta, filename_prefix=f"{stream.resolution}_")
            print("✅ ¡Descarga completada! (Video + Audio incluidos)")
        else:
            # Para DASH (solo video) sugerir descargar audio por separado
            print("⚠️ Stream DASH detectado: Solo contiene video.")
            print("   Usa el método para 1080p+ con FFmpeg si necesitas audio.")
            stream.download(output_path=carpeta, filename_prefix=f"{stream.resolution}_video_")
    
    except IndexError:
        print("❌ Error: Número de calidad inválido.")
    except Exception as e:
        print(f"❌ Error al descargar: {e}")

# --- Ejecución principal ---
if __name__ == "__main__":
    url = input("Ingresa la URL del video de YouTube: ")
    streams = listar_calidades(url)
    
    if streams:
        try:
            eleccion = int(input("\n👉 Elige el número de la calidad a descargar: "))
            descargar_calidad(streams, eleccion)
        except ValueError:
            print("❌ Error: Ingresa un número válido.")