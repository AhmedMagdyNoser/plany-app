export function addTaskToStorage(task, setTasks) {
  let allTasks = getAllTasks();
  allTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  setTasks(getAllTasks());
};

export function removeTaskFromStorage(id, setTasks) {
  let allTasks = getAllTasks();
  let filteredTasks = allTasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  setTasks(getAllTasks());
}

export function getNumberOfTasks() {
  return getAllTasks().length;
}

export function getAllTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}