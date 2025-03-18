import os

import requests
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Credenciales desde .env
CLIENT_ID = os.getenv('CLIENT_ID')

# Obtener el top 3 de historias de un subreddit (sin autenticación OAuth2)
def get_top_stories(subreddit):
    headers = {
        'User-Agent': 'TraductorDeHistorias/1.0'
    }
    url = f'https://www.reddit.com/r/{subreddit}/top.json?limit=3'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        # Mostrar el límite de tasa
        ratelimit_used = response.headers.get('X-Ratelimit-Used')
        ratelimit_remaining = response.headers.get('X-Ratelimit-Remaining')
        ratelimit_reset = response.headers.get('X-Ratelimit-Reset')

        print(f"Solicitudes usadas: {ratelimit_used}")
        print(f"Solicitudes restantes: {ratelimit_remaining}")
        print(f"Tiempo para reinicio: {ratelimit_reset} segundos")

        return response.json()
    else:
        print(f"Error al obtener historias: {response.status_code}")
        print(response.json())
        return None

# Obtener el contenido completo de un post
def get_post_content(permalink):
    headers = {
        'User-Agent': 'TraductorDeHistorias/1.0'
    }
    url = f'https://www.reddit.com{permalink}.json'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error al obtener el contenido del post: {response.status_code}")
        print(response.json())
        return None

# Ejecutar el script
if __name__ == '__main__':
    # Especifica el subreddit que quieres consultar
    subreddit = 'HistoriasDeReddit'  # Cambia esto al subreddit que prefieras
    stories = get_top_stories(subreddit)

    if stories:
        print(f"\nTop 3 historias de /r/{subreddit}:")
        for post in stories['data']['children']:
            title = post['data']['title']
            url = post['data']['url']
            permalink = post['data']['permalink']
            print(f"\n- {title} ({url})")

            # Obtener el contenido completo del post
            post_content = get_post_content(permalink)
            if post_content:
                # El contenido del post está en el primer elemento de la respuesta
                post_data = post_content[0]['data']['children'][0]['data']
                selftext = post_data.get('selftext', '')  # Texto del post
                score = post_data.get('score', 0)  # Puntuación del post
                num_comments = post_data.get('num_comments', 0)  # Número de comentarios

                print(f"  Contenido: {selftext}")
                print(f"  Puntuación: {score}")
                print(f"  Comentarios: {num_comments}")
    else:
        print("No se pudieron obtener las historias.")