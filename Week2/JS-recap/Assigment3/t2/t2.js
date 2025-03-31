// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

const htmllist = document.querySelector('ul');

for (let i = 0; i < todoList.length; i++) {
  const currenttask = todoList[i];

  const list = document.createElement('li');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.id = `todo-${currenttask.id}`;
  input.checked = currenttask.completed;

  const label = document.createElement('label');
  label.htmlFor = `todo-${currenttask.id}`;
  label.textContent = currenttask.task;

  list.appendChild(input);
  list.appendChild(label);

  htmllist.appendChild(list);
}
