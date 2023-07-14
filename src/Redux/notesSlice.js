import { createSlice } from "@reduxjs/toolkit";
import { addNoteToStorage, getAllNotes, removeNoteFromStorage, updateNoteInStorage } from "../Storage";

const notes = createSlice({
  name: "notes",
  initialState: {
    data: getAllNotes(),
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
  },
});

export const { addNote, updateNote, removeNote } = notes.actions;

export default notes.reducer;
