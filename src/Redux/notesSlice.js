import { createSlice } from "@reduxjs/toolkit";

const notes = createSlice({
  name: 'notes',
  initialState: {
    data: [],
    popup: false,
  },
  reducers: {
    openPopup: (state, action) => {
      state.popup = action.payload;
    }
  }
})

export const { openPopup } = notes.actions;

export default notes.reducer;