import bcrypt

class HashPassword:
    def hash_password(self, password: str) -> str:
        """
        Хеширует пароль с использованием bcrypt.
        :param password: Пароль для хеширования
        :return: Хешированный пароль в виде строки
        """
        if not password:
            raise ValueError("Password cannot be empty")
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')  # Декодируем для удобства хранения

    def verify_password(self, password: str, hashed_password: str) -> bool:
        """
        Проверяет, совпадает ли пароль с хешированным паролем.
        :param password: Пароль для проверки
        :param hashed_password: Хешированный пароль
        :return: True, если пароль совпадает, иначе False
        """
        try: 
            return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
        except:
            return False