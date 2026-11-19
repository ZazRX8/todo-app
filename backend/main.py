from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Привет от моего сервера!"}


@app.get("/tasks")
def get_tasks():
    return [
        {"id": 1, "text": "Выучить Python", "done": False},
        {"id": 2, "text": "Создать сервер на FastAPI", "done": True},
        {"id": 3, "text": "Подключить фронтенд к бэкенду", "done": False},
    ]