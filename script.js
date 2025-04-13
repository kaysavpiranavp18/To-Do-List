const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const clearCompletedButton = document.getElementById('clearCompleted');
const themeToggleButton = document.getElementById('themeToggle');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos.length) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

clearCompletedButton.addEventListener('click', () => {
  const completedTodos = document.querySelectorAll('.completed');
  completedTodos.forEach(todo => todo.remove());
  updateLS();
});

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});

// Apply the stored theme when the page loads
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

function addTodo(todo) {
  let todoText = input.value.trim();

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  clearCompletedButton.disabled = !document.querySelectorAll('.completed').length;
}
