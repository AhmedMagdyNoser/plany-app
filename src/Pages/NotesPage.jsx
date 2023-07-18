import { useState } from "react";
import { useSelector } from "react-redux";
import Note from "../Components/Notes/Note";
import AddNote from "../Components/Notes/AddNote";
import { FadeIn } from "../Components/Utils/Fade";

export default function NotesPage() {
  const notes = useSelector((store) => store.notes.data);
  const [isNotePopupOpened, setIsNotePopupOpened] = useState(false);

  return (
    <div className="container list my-4">
      {notes?.length ? notes.map((note) => <Note key={note.id} note={note} isNotePopupOpened={isNotePopupOpened} />) : null}
      <AddingButton onClick={() => setIsNotePopupOpened(true)} isNotePopupOpened={isNotePopupOpened} />
      {isNotePopupOpened && <AddNote setIsOpened={setIsNotePopupOpened} animationTime={350} />}
    </div>
  );
}

function AddingButton({ onClick, isNotePopupOpened }) {
  return (
    <FadeIn milliSeconds={500}>
      <button
        onClick={onClick}
        tabIndex={isNotePopupOpened ? -1 : 1}
        className="w-100 border-0 p-5 text-primary bg-white rounded shadow-sm flex-center flex-column reverse-opacity-hover"
        style={{ transition: "50ms" }}
      >
        <div className="border border-primary rounded-circle flex-center" style={{ width: "85px", height: "85px" }}>
          <i className="fa-solid fa-plus fs-3"></i>
        </div>
        <p className="m-0 mt-3">ملاحظة جديدة</p>
      </button>
    </FadeIn>
  );
}
