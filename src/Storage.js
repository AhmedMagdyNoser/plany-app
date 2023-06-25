// ========================== Tasks ==========================

export function addTaskToStorage(task) {
  // get the old set and add the new one to them
  let allTasks = getAllTasks(); allTasks.push(task);
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(allTasks));
};

export function updateTaskInStorage(id, checked) {
  // get the old set
  let allTasks = getAllTasks();
  // find the task you want to update
  let indexOfTask = allTasks.findIndex(task => task.id === id);
  // update the task
  let updatedTask = { ...allTasks[indexOfTask], checked: checked };
  allTasks[indexOfTask] = updatedTask;
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

export function removeTaskFromStorage(id) {
  // get the old set and remove the unwanted task from it
  let allTasks = getAllTasks();
  let filteredTasks = allTasks.filter(task => task.id !== id);
  // set the new set to the local storage again
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

export function getAllTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

// ========================== Notes ==========================

export function addNoteToStorage(note) {
  // get the old set and add the new one to them
  let allNotes = getAllNotes(); allNotes.push(note);
  // set the new set to the local storage again
  localStorage.setItem('notes', JSON.stringify(allNotes));
};

export function removeNoteFromStorage(id) {
  // get the old set and remove the unwanted note from it
  let allNotes = getAllNotes();
  let filteredNotes = allNotes.filter(note => note.id !== id);
  // set the new set to the local storage again
  localStorage.setItem('notes', JSON.stringify(filteredNotes));
}

export function getNote(id) {
  // get the old set
  const allNotes = getAllNotes();
  // find the note you want to update
  const note = allNotes.find(note => note.id === id);
  return note;
}

export function getAllNotes() {
  return JSON.parse(localStorage.getItem('notes'));
}