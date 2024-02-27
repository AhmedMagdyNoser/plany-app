import { store } from "../../Redux/store";
import { setIsNotified } from "../../Redux/tasksSlice";
import { addNotification } from "../../Redux/notificationsSlice";
import notificationsSound from "./../../Sounds/notification.mp3";
import { findObjectById, randomDigits } from "../../utils";

const notificationsAudio = new Audio(notificationsSound);

// Maximum delay time is around 2^31 milliseconds, which is approximately 24.8 days.

export function setTaskReminderNotification(id, reminderDate) {
  const timeDifference = new Date(reminderDate) - new Date();
  if (timeDifference < 2147483647) {
    setTimeout(function () {
      sendNotificationNow(id);
    }, timeDifference);
  }
}

export function remindNotNotifiedTasks() {
  getNotNotifiedTasks()?.forEach((task) => {
    const timeDifference = new Date(task.time) - new Date();
    if (timeDifference > 0) {
      setTaskReminderNotification(task.id, task.time);
    } else {
      sendNotificationNow(task.id);
    }
  });
}

export function sendNotificationNow(id) {
  const task = findObjectById(store.getState().tasks.data, id);
  if (task?.isNotificationOn === true) {
    const notification = {
      id: randomDigits(9),
      title: task.title,
      time: task.time,
      type: "task",
    };
    store.dispatch(addNotification(notification));
    store.dispatch(setIsNotified({ id: task.id, isNotified: true }));
    notificationsAudio.play();
  }
}

export function getNotNotifiedTasks() {
  return store.getState().tasks?.data?.filter((task) => task.isNotified === false);
}
