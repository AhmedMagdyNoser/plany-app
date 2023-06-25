import { createSlice } from "@reduxjs/toolkit";
import { addNoteToStorage, getAllNotes, removeNoteFromStorage } from "../Storage";

const notes = createSlice({
  name: 'notes',
  initialState: {
    data: getAllNotes(),
    popup: false,
  },
  reducers: {
    addNote: (state, action) => {
      addNoteToStorage(action.payload);
      state.data = getAllNotes();
    },
    removeNote: (state, action) => {
      removeNoteFromStorage(action.payload);
      state.data = getAllNotes();
    },
    openPopup: (state, action) => {
      state.popup = action.payload;
    }
  }
})

export const { addNote, removeNote, openPopup } = notes.actions;

export default notes.reducer;