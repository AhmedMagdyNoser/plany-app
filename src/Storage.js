export function addTaskToStorage(task, setTasks) {
  // get the old set and add the new one to them
  let allTasks = getAllTasks();
  allTasks.push(task);
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  // render them into the page
  setTasks(getAllTasks());
};

export function updateTaskInStorage(id, checked, setChecked) {
  // get the old set
  let allTasks = getAllTasks();
  // find the task you want to update
  let indexOfTask = allTasks.findIndex(task => task.id === id);
  // update the task
  let updatedTask = { ...allTasks[indexOfTask], checked: checked };
  allTasks[indexOfTask] = updatedTask;
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  // to render updates into the page
  setChecked(checked);
}

export function removeTaskFromStorage(id, setTasks) {
  // get the old set and remove the unwanted task from it
  let allTasks = getAllTasks();
  let filteredTasks = allTasks.filter(task => task.id !== id);
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  // render them into the page
  setTasks(getAllTasks());
}

export function getNumberOfTasks() {
  return getAllTasks().length;
}

export function getAllTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}