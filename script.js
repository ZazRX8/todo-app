const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = [];
let nextId = 1;

function render() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
    }

    li.addEventListener("click", function () {
      task.done = !task.done;
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();

      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });
      render();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({
    id: nextId,
    text: text,
    done: false,
  });

  nextId++;
  input.value = "";
  render();
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

async function loadTasks() {
  try {
    errorMessage.textContent = ""; // очищаем старую ошибку перед запросом

    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!response.ok) {
      throw new Error("Сервер ответил ошибкой: " + response.status);
    }

    const data = await response.json();

    tasks = data.map(function (item) {
      return {
        id: item.id,
        text: item.title,
        done: item.completed,
      };
    });

    if (tasks.length > 0) {
      const maxId = Math.max(...tasks.map(function (t) {
        return t.id;
      }));
      nextId = maxId + 1;
    }

    render();
  } catch (error) {
    console.error("Не удалось загрузить задачи:", error);
    errorMessage.textContent = "Не удалось загрузить задачи. Проверьте подключение к интернету.";
  }
}

loadTasks();