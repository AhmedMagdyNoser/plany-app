import { configureStore } from "@reduxjs/toolkit";
import tasks from "./tasksSlice";
import notes from "./notesSlice";

export const store = configureStore({
  reducer: {
    tasks,
    notes
  }
})