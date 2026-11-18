const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", function () {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const li = document.createElement("li");
  li.textContent = text;

  taskList.appendChild(li);

  input.value = "";
});