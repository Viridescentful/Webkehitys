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

// add your code here

const htmllist = document.querySelector('ul');

for (let i = 0; i < todoList.length; i++) {
  const currenttask = todoList[i];
  const checked = currenttask.completed ? 'checked' : '';

  const html = `
    <li>
      <input type="checkbox" id="todo-${currenttask.id}" ${checked}>
      <label for="todo-${currenttask.id}">${currenttask.task}</label>
    </li>
    `;
  htmllist.insertAdjacentHTML('beforeend', html);
}

