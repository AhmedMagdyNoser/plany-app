import Note from "../Components/Notes/Note";
import AddNote from "../Components/Notes/AddNote";
import { useSelector } from "react-redux";

export default function NotesPage() {
  const notes = useSelector((store) => store.notes.data);

  return (
    <div className="container list my-4">
      {notes.length ? notes.map((note) => <Note key={note.id} note={note} />) : null}
      <AddNote />
    </div>
  );
}
