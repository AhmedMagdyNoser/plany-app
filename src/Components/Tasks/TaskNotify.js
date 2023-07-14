import { store } from "../../Redux/store";
import { addNotification } from "../../Redux/notificationsSlice";

export function setNotificationReminder(id, reminderDate) {
  reminderDate = new Date(reminderDate);
  let currentDate = new Date();
  let timeDifference = reminderDate - currentDate;

  setTimeout(function () {
    sendNotification(id);
  }, timeDifference);
}

export function sendNotification(id) {
  // Getting the required note from the store
  const [task] = store.getState().tasks.data.filter((task) => task.id === id);
  if (task.notify === true) {
    store.dispatch(addNotification(task));
  } 
}
