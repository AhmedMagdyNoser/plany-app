import { configureStore } from "@reduxjs/toolkit";
import tasks from "./tasksSlice";
import notes from "./notesSlice";
import notifications from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    tasks,
    notes,
    notifications,
  },
});
