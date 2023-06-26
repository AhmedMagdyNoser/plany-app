import { createSlice } from "@reduxjs/toolkit";
import { addNoteToStorage, getAllNotes, removeNoteFromStorage, updateNoteInStorage } from "../Storage";

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
    updateNote: (state, action) => {
      const { id, updatedFields } = action.payload;
      updateNoteInStorage(id, updatedFields);
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

export const { addNote, updateNote, removeNote, openPopup } = notes.actions;

export default notes.reducer;