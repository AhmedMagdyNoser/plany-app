import { createSlice } from "@reduxjs/toolkit";
import { addTaskToStorage, updateTaskInStorage, removeTaskFromStorage, getAllTasks, setIsTaskNotifiedInStorage } from "../Storage";

const tasks = createSlice({
  name: "tasks",
  initialState: {
    data: getAllTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      addTaskToStorage(action.payload);
      state.data = getAllTasks();
    },
    updateTask: (state, action) => {
      const { id, isNotificationOn, isChecked } = action.payload;
      updateTaskInStorage(id, isNotificationOn, isChecked);
      state.data = getAllTasks();
    },
    setIsNotified: (state, action) => {
      const { id, isNotified } = action.payload;
      setIsTaskNotifiedInStorage(id, isNotified);
      state.data = getAllTasks();
    },
    removeTask: (state, action) => {
      removeTaskFromStorage(action.payload);
      state.data = getAllTasks();
    },
  },
});

export const { addTask, updateTask, setIsNotified, removeTask } = tasks.actions;

export default tasks.reducer;
