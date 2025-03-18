import os
import requests
import openai
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Credenciales desde .env
CLIENT_ID = os.getenv('CLIENT_ID')
OLLAMA_ENDPOINT = os.getenv("OLLAMA_ENDPOINT")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")

# Configurar Ollama
client = openai.OpenAI(base_url=OLLAMA_ENDPOINT, api_key="nokeyneeded")

# Obtener el top 3 de historias de un subreddit (sin autenticación OAuth2)
def get_top_stories(subreddit):
    headers = {
        'User-Agent': 'TraductorDeHistorias/1.0'
    }
    url = f'https://www.reddit.com/r/{subreddit}/top.json?limit=1'
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

# Función para traducir el texto
def translate_text(text):
    response = client.chat.completions.create(
        model=OLLAMA_MODEL,
        temperature=0.7,
        messages=[{"role": "system", "content": "Eres un traductor capaz de transpasar textos en ingles a español neutro, "
        "pudiendo mantener significado de las frases a la perfección. Eres una persona y no usas palabras demasiado técnicas, "
        "a no ser que sea absolutamente necesario."},
            {"role": "user", "content": f"Traduce esto al español: {text}"}],
    )
    return response.choices[0].message.content

# Función para revisar la claridad y coherencia del texto
def review_text(text):
    response = client.chat.completions.create(
        model=OLLAMA_MODEL,
        temperature=0.7,
        messages=[{"role": "system", "content": "Eres un revisor de textos y debes proporcionar comentarios detallados sobre claridad, coherencia y comprensión del texto, con especial enfasis en que el texto sea lo mas parecido posible a un escrito humano."},
            {
                "role": "user",
                "content": (
                    "Revisa este texto y proporciona comentarios detallados sobre claridad, coherencia "
                    "y si se entiende bien (pero no lo edites tú mismo):\n\n"
                )
                + text,
            }
        ],
    )
    return response.choices[0].message.content

# Función para corregir el texto basado en los comentarios
def correct_text(text, feedback):
    response = client.chat.completions.create(
        model=OLLAMA_MODEL,
        temperature=0.7,
        messages=[
            {"role": "system", "content": "Eres un corrector de textos y debes mejorar el texto, "
            "basándote en los comentarios proporcionados por el revisor."},
            {
                "role": "user",
                "content": (
                    "Revisa este texto utilizando los siguientes comentarios y mejóralo:\n\n"
                    f"Texto original:\n{text}\n\nComentarios:\n{feedback}"
                ),
            }
        ],
    )
    return response.choices[0].message.content

# Ejecutar el script
if __name__ == '__main__':
    # Especifica el subreddit que quieres consultar
    subreddit = 'IDontWorkHereLady'  # Cambia esto al subreddit que prefieras
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

                print(f"  Contenido original: {selftext}")
                print(f"  Puntuación: {score}")
                print(f"  Comentarios: {num_comments}")

                # Traducir el texto
                translated_text = translate_text(selftext)
                print("\n  Texto traducido: ", translated_text)

                # Revisar el texto traducido
                feedback = review_text(translated_text)
                print("\n  Retroalimentación: ", feedback)

                # Corregir el texto basado en la retroalimentación
                corrected_text = correct_text(translated_text, feedback)
                print("\n  Texto corregido: ", corrected_text)
    else:
        print("No se pudieron obtener las historias.")