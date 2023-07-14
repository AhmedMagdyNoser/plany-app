import { createSlice } from "@reduxjs/toolkit";
import { addNotificationToStorage, removeNotificationFromStorage, getAllNotifications } from "../Storage";

const notifications = createSlice({
  name: "notifications",
  initialState: {
    data: getAllNotifications(),
  },
  reducers: {
    addNotification: (state, action) => {
      addNotificationToStorage(action.payload);
      state.data = getAllNotifications();
    },
    removeNotification: (state, action) => {
      removeNotificationFromStorage(action.payload);
      state.data = getAllNotifications();
    },
  },
});

export const { addNotification, removeNotification } = notifications.actions;

export default notifications.reducer;
