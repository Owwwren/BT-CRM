import aiomysql
from dotenv import load_dotenv
import os

load_dotenv()
# Настройки подключения к базе данных
DATABASE_CONFIG = {
    'host': 'localhost',
    'port': 3306, 
    'user': os.getenv('DB_LOGIN'),
    'password': os.getenv('DB_PASSWORD'),
    'db': os.getenv('DB_NAME'),
    'cursorclass': aiomysql.DictCursor  # Чтобы результаты возвращались в виде словаря
}

async def create_db_pool():
    try:
        connection = await aiomysql.create_pool(**DATABASE_CONFIG)
        return connection
    except Exception as e:
        print(f"Ошибка подключения к базе данных: {e}")
        raise