from fastapi import APIRouter, HTTPException, Query, Response, Cookie, status
from .crud import CRUDWeb
from .models import AutorizationData
from .schemas import HashPassword
import uuid 

db = CRUDWeb()
hash_password = HashPassword()
# Создаем роутер
router = APIRouter()

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
 
@router.post("/authorization", 
            tags=["Работники"],
            )
async def user_authorization(response: Response, auth_data: AutorizationData):
    if not await db.check_login_exists(auth_data.login):
        raise HTTPException(
            status_code=422,
            detail=[
                {
                    "type": "value_error",
                    "loc": ["body", "login"],
                    "msg": "Value error, Неверный логин или пароль",
                    "input": auth_data.login,  # Пример входных данных
                    "ctx": {"error": {}}  # Дополнительный контекст
                }
            ]
        )
    else:
        hashed_password = await db.get_user_password(auth_data.login)
        if not (hashed_password and hash_password.verify_password(auth_data.password, hashed_password)):
            raise HTTPException(
                status_code=422,
                detail=[ 
                    {
                        "type": "value_error",
                        "loc": ["body", "login"],
                        "msg": "Value error, Неверный логин или пароль",
                        "input": auth_data.password,  # Пример входных данных
                        "ctx": {"error": {}}  # Дополнительный контекст
                    }
                ]
            )
        else:
            # Генерируем уникальный идентификатор сессии
            session_key = str(uuid.uuid4())
            
            
            # Устанавливаем куку с идентификатором сессии          
            if auth_data.rememberMe:
                response.set_cookie(key="session_key",
                                    value=session_key,
                                    max_age=30 * 24 * 60 * 60,    
                                    httponly=True,  
                                    secure=True,  
                                    samesite="lax",  
                                    )
                
            if not auth_data.rememberMe:
                response.set_cookie(key="session_key", value=session_key)
                
                

            await db.update_session_key(auth_data.login, session_key)      

            return {"success": True, "message": "Пользователь найден", 
                    "session_key": "Сессия сохранина" if auth_data.rememberMe else None}

    
@router.get("/authorization/session", 
            tags=["Работники"],
            )
async def get_user_session(session_key: str = Cookie(None)):
    if not session_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=[
                {
                    "type": "session_error",
                    "loc": ["body", "session_key"],
                    "msg": "Session x error, Нет ключа сессии",
                    "input": 'Top secret :-)',  # Пример входных данных
                    "ctx": {"error": {}}  # Дополнительный контекст
                }
            ]
        )
        
    session = await db.get_login_by_session_key(session_key)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=[
                {
                    "type": "session_error",
                    "loc": ["body", "session_key"],
                    "msg": "Session error, У вас нет сессии",
                    "input": 'Top secret :-)',  # Пример входных данных
                    "ctx": {"error": {}}  # Дополнительный контекст
                }
            ]
        )
    return {"username": session}


