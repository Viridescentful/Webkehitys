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

const addButton = document.getElementById('addbutton');

const iteminput = document.getElementById('iteminput');
const itemsubmit = document.getElementById('itemsubmit');
const itemdialog = document.getElementById('itemdialog');
const itemform = document.getElementById('itemform');

function addTask(currenttask) {
  const list = document.createElement('li');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.id = `todo-${currenttask.id}`;
  input.checked = currenttask.completed;

  const label = document.createElement('label');
  label.htmlFor = `todo-${currenttask.id}`;
  label.textContent = currenttask.task;

  const button = document.createElement('button');
  button.textContent = 'Delete';

  button.addEventListener('click', function() {
    todoList.splice(currenttask.index, 1);
    htmllist.removeChild(list);
    console.log(`Task ${currenttask.id} deleted`);
  })

  input.addEventListener('change', function() {
    currenttask.completed = input.checked;
    console.log(`Task ${currenttask.id} completed status: ${currenttask.completed}`);
  })

  list.appendChild(input);
  list.appendChild(label);
  list.appendChild(button);

  htmllist.appendChild(list);
}

addButton.addEventListener('click', function() {
  itemdialog.showModal()
})

itemform.addEventListener('submit', function() {
  event.preventDefault();

  const newtask = {
    id: todoList.length + 1,
    task: iteminput.value,
    completed: false,
  };

  todoList.push(newtask);

  addTask(newtask);

  itemdialog.close();
})

for (let i = 0; i < todoList.length; i++) {
  const currenttask = todoList[i];
  addTask(currenttask);
}
