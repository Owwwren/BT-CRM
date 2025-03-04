from aiomysql.pool import Pool
from database import create_db_pool


class CRUDWeb:
    pool: Pool = create_db_pool
    async def _execute_query(self, query: str, params: tuple):
        """
        Выполняет SQL-запрос и возвращает результат.
        query: SQL-запрос
        params: Параметры запроса
        :return: Результат запроса
        """
        if self.pool is None:
            raise ValueError("Пул соединений не инициализирован")

        self.pool = await create_db_pool()  # Вызываем функцию и сохраняем объект пула
        async with self.pool.acquire() as connection:
            async with connection.cursor() as cursor:
                await cursor.execute(query, params)  
                await connection.commit()  # Фиксируем изменения
                result = await cursor.fetchone()
                return result


    async def check_login_exists(self, login: str) -> bool:
        """
        Проверяет, существует ли пользователь с указанным логином.
        login: Логин пользователя
        :return: True, если пользователь существует, иначе False
        """
        result = await self._execute_query("SELECT login FROM Employees WHERE login = %s", (login,))
        return result if result else False

    async def get_user_password(self, login: str) -> str:
        """
        Получает хешированный пароль пользователя.
        login: Логин пользователя
        :return: Хешированный пароль или None, если пользователь не найден
        """
        result = await self._execute_query("SELECT password FROM Employees WHERE login = %s", (login,))
        return result['password'] if result else False  # Возвращаем только значение пароля
    
    
    async def get_session_key(self, login: str) -> str:
        """
        Получает ключ сессии пользователя.
        login: Логин пользователя
        :return: Ключ сессии или False, если пользователь не найден
        """
        ressult = await self._execute_query("SELECT session_key FROM Employees WHERE login = %s", (login,))
        return ressult["session_key"] if ressult else False  # Возвращаем только значение сессии
    
    async def update_session_key(self, login: str, session_key: str):
        """
        Обновляет ключ сессии пользователя.
        login: Логин пользователя
        session_key: Новый ключ сессии
        """
        await self._execute_query("UPDATE Employees SET session_key = %s WHERE login = %s", (session_key, login))
        
        
    async def create_session_key(self, login: str, session_key: str):
        """
        Создает ключ сессии для пользователя.
        login: Логин пользователя
        """
        await self._execute_query("INSERT INTO Employees (login, session_key) VALUES (%s, %s)", (login, session_key))
        
    async def get_login_by_session_key(self, session_key: str) -> str:
        """
        Получает логин пользователя по ключу сессии.
        session_key: Ключ сессии
        :return: Логин пользователя
        """
        result = await self._execute_query("SELECT login From Employees WHERE session_key = %s", (str(session_key),))
        return result['login'] if result else False