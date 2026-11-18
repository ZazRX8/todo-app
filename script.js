const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

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

    // Клик по самой задаче — переключаем статус выполнения
    li.addEventListener("click", function () {
      task.done = !task.done;
      render();
    });

    // Бонус: кнопка удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (event) {
      // Останавливаем всплытие, чтобы клик по крестику не засчитался как клик по li
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