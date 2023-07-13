import { createSlice } from "@reduxjs/toolkit";
import { addTaskToStorage, updateTaskInStorage, removeTaskFromStorage, getAllTasks } from "../Storage";

const tasks = createSlice({
  name: 'tasks',
  initialState: {
    data: getAllTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      addTaskToStorage(action.payload);
      state.data = getAllTasks();
    },
    updateTask: (state, action) => {
      const { id, notify, checked } = action.payload;
      updateTaskInStorage(id, notify, checked);
      state.data = getAllTasks();
    },
    removeTask: (state, action) => {
      removeTaskFromStorage(action.payload);
      state.data = getAllTasks();
    }
  }
})

export const { addTask, updateTask, removeTask } = tasks.actions;

export default tasks.reducer;