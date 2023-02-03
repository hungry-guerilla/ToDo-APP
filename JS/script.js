const form = document.getElementById('form');
const input = document.getElementById('input');
const todoList = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));


if (todos) {
  todos.forEach((todo) => addToDo(todo.text, todo.completed));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    addToDo();
  }
});

function addToDo(todo, completed) {
  let inputText = input.value.trim();
  if (todo) {
    inputText = todo;
  }
  const newLi = document.createElement('li');
  newLi.innerText = inputText;
  if (completed) {
    newLi.classList.add('completed');
  }
  todoList.appendChild(newLi);
  input.value = '';

  newLi.addEventListener('click', (event) => {
    newLi.classList.toggle('completed');
    updateLS();
  });
  newLi.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    newLi.remove();
    updateLS();
  });
  updateLS();
}

function updateLS() {
  const listElements = todoList.querySelectorAll('li');
  const todos = [];
  listElements.forEach((element) =>
    todos.push({
      text: element.innerText,
      completed: element.classList.contains('completed'),
    })
  );
  localStorage.setItem('todos', JSON.stringify(todos));
}
