import { excludeObjectById, findIndexById, findObjectById, formatedCurrentDate } from "./utils";

// ========================== Tasks ==========================

export function addTaskToStorage(task) {
  // get the old set and add the new one to them
  let allTasks = getAllTasks();
  allTasks.push(task);
  // set the new set to the local storage again
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function updateTaskInStorage(id, isNotificationOn, isChecked) {
  // get the old set
  const allTasks = getAllTasks();
  // find the index of the required task you want to update
  const index = findIndexById(allTasks, id);
  // create a new task with the updated fields (+ if the task is checked then the isNotificationOn should be false)
  const updatedTask = { ...allTasks[index], isNotificationOn: isChecked ? false : isNotificationOn, isChecked };
  // update the array with the new task
  allTasks[index] = updatedTask;
  // set the new set to the local storage again
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function removeTaskFromStorage(id) {
  // get the old set and remove the unwanted task from it
  let filteredTasks = excludeObjectById(getAllTasks(), id);
  // set the new set to the local storage again
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

export function getAllTasks() {
  return JSON.parse(localStorage.getItem("tasks"));
}

// ========================== Notes ==========================

export function addNoteToStorage(note) {
  // get the old set and add the new one to them
  let allNotes = getAllNotes();
  allNotes.push(note);
  // set the new set to the local storage again
  localStorage.setItem("notes", JSON.stringify(allNotes));
}

export function updateNoteInStorage(id, updatedFields) {
  // get the old set
  const allNotes = getAllNotes();
  // find the index of the required note you want to update
  const index = findIndexById(allNotes, id);
  // create a new note with the updated fields
  const updatedNote = { ...allNotes[index], ...updatedFields, time: formatedCurrentDate("ar") };
  // update the array with the new note
  allNotes[index] = updatedNote;
  // set the new set to the local storage again
  localStorage.setItem("notes", JSON.stringify(allNotes));
}

export function removeNoteFromStorage(id) {
  // get the old set and remove the unwanted note from it
  let filteredNotes = excludeObjectById(getAllNotes(), id);
  // set the new set to the local storage again
  localStorage.setItem("notes", JSON.stringify(filteredNotes));
}

export function getNote(id) {
  // get the old set
  const allNotes = getAllNotes();
  // find the note you want to update
  const note = allNotes.find((note) => note.id === id);
  return note;
}

export function getAllNotes() {
  return JSON.parse(localStorage.getItem("notes"));
}

// ========================== Notifications ==========================

export function addNotificationToStorage(notification) {
  // get the old set and add the new one to them
  let allNotifications = getAllNotifications();
  allNotifications.push(notification);
  // set the new set to the local storage again
  localStorage.setItem("notifications", JSON.stringify(allNotifications));
}

export function removeNotificationFromStorage(id) {
  // get the old set and remove the unwanted notification from it
  let filteredNotifications = excludeObjectById(getAllNotifications(), id);
  // set the new set to the local storage again
  localStorage.setItem("notifications", JSON.stringify(filteredNotifications));
}

export function getAllNotifications() {
  return JSON.parse(localStorage.getItem("notifications"));
}
