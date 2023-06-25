import Note from "../Components/Notes/Note"
import NewNote from "../Components/Notes/NewNote";
import { useSelector } from "react-redux";

export default function NotesPage() {

  const notes = useSelector(store => store.notes.data)

  return (
    <div className='container list my-4'>
      {notes.length ? notes.map(note => <Note key={note.id} note={note} />) : null }
      <NewNote />
    </div>
  )
}