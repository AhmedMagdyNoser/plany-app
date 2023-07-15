import { store } from "../../Redux/store";
import { addNotification } from "../../Redux/notificationsSlice";
import notificationsSound from "./../../Sounds/notification.mp3";
import { findObjectById, randomDigits } from "../../utils";

const notificationsAudio = new Audio(notificationsSound);

export function setTaskReminderNotification(id, reminderDate) {
  const timeDifference = new Date(reminderDate) - new Date();
  setTimeout(function () {
    sendNotification(id);
  }, timeDifference);
}

export function sendNotification(id) {
  const task = findObjectById(store.getState().tasks.data, id)
  if (task.isNotificationOn === true) {
    const notification = {
      id: randomDigits(9),
      title: task.title,
      time: task.time,
      type: "task",
    };
    store.dispatch(addNotification(notification));
    notificationsAudio.play();
  }
}
