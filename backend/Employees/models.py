from pydantic import BaseModel, Field, field_validator
import bleach 
import re 

class AutorizationData(BaseModel):
    login: str 
    password: str
    rememberMe: bool

    @field_validator('login')
    def check_login(cls, value):
        # Очищаем логин от HTML-тегов и потенциально вредоносного кода
        value = bleach.clean(value, tags=[], attributes={}, strip=True)
        
        # Проверяем, что логин не содержит запрещенных слов
        if value == 'Error_LoginBlocked' or value == 'Error_WrongSize' or value == 'Error_InvalidChars':
            raise ValueError('Неверный логин или пароль')
        
        # Проверяем, что логин от 3 до 50 символов
        if len(value) < 3 or len(value) > 50:
            raise ValueError('Логин должен быть от 3 до 50 символов')
        
        # Проверяем, что логин содержит только буквы, цифры
        if not re.match(r'^\w+$', value):
            raise ValueError('Логин может содержать только буквы и цифры') 
        return value

    @field_validator('password')
    def check_password(cls, value):
        
        # Проверяем, что пароль от 8 до 50 символов
        if len(value) < 8 or len(value) > 50:
            raise ValueError('Пароль должен быть от 3 до 50 символов')
            
        # Проверяем, что пароль содержит хотя бы одну заглавную букву    
        if not any(char.isupper() for char in value):
            raise ValueError('Пароль должен содержать хотя бы одну заглавную букву')
        return value

    # class Config:
    #     orm_mode = True