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
  let allTasks = getAllTasks();
  // find the task you want to update
  let indexOfTask = allTasks.findIndex((task) => task.id === id);
  // update the task
  let updatedTask;
  if (isChecked && isNotificationOn) {
    updatedTask = { ...allTasks[indexOfTask], isNotificationOn: false, isChecked, };
  } else {
    updatedTask = { ...allTasks[indexOfTask], isNotificationOn, isChecked, };
  }
  allTasks[indexOfTask] = updatedTask;
  // set the new set to the local storage again
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function removeTaskFromStorage(id) {
  // get the old set and remove the unwanted task from it
  let allTasks = getAllTasks();
  let filteredTasks = allTasks.filter((task) => task.id !== id);
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
  // find the note you want to update
  const noteIndex = allNotes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    // create a new note object with updated fields
    const updatedNote = {
      ...allNotes[noteIndex],
      ...updatedFields,
      date: new Date().toLocaleDateString("ar-US", { month: "long", day: "numeric", year: "numeric" }),
    };
    // update the note in the array
    allNotes[noteIndex] = updatedNote;
    // set the new set to the local storage again
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }
}

export function removeNoteFromStorage(id) {
  // get the old set and remove the unwanted note from it
  let allNotes = getAllNotes();
  let filteredNotes = allNotes.filter((note) => note.id !== id);
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
  let allNotifications = getAllNotifications();
  let filteredNotifications = allNotifications.filter((notification) => notification.id !== id);
  // set the new set to the local storage again
  localStorage.setItem("notifications", JSON.stringify(filteredNotifications));
}

export function getAllNotifications() {
  return JSON.parse(localStorage.getItem("notifications"));
}