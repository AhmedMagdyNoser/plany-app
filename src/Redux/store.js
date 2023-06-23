import { configureStore } from "@reduxjs/toolkit";
import tasks from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks
  }
})