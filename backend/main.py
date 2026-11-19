from fastapi import FastAPI

app = FastAPI()


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