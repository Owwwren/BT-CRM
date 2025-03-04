from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from Employees.APIapp import router as employees_router
from fastapi.middleware.cors import CORSMiddleware
# from Orders.APIapp import app as orders_app
# from Client.APIapp import app as client_app

# Создаем главное приложение
app = FastAPI()


# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://crm.bt.servebiz.space"],  # Разрешить запросы от этого домена
    allow_credentials=True,  # Разрешить куки и заголовки авторизации
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)

# Подключаем роутеры из каждого приложения
app.include_router(employees_router, prefix="/Employees")
# app.mount("/Clients", client_app)
# app.mount("/Orders", orders_app)



@app.post("/")
async def root():
    raise HTTPException(status_code=200, detail="Hello")

# Подключаем статические файлы из папки "static"
app.mount("/static", StaticFiles(directory="static"), name="static")

# Корневой маршрут
# @app.get("/")
# def read_root():
#     raise HTTPException(status_code=404)

# Запускаем сервер
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8000, reload=True)
