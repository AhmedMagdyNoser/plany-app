import { useState } from "react";
import { useParams } from "react-router-dom"
import { getNote } from "../Storage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch } from "react-redux";
import { updateNote } from "../Redux/notesSlice";

export default function NoteDetailsPage() {

  const params = useParams();
  const id = parseInt(params.id);
  const dispatch = useDispatch();
  let [editing, setEditing] = useState(false);
  let [note] = useState(getNote(id))

  function dispatchUpdateNote(updatedFields) {
    dispatch(updateNote({ id, updatedFields }))
  }

  return (
    note ?
      <div className="container bg-white my-5 p-4 rounded shadow-sm">
        {!editing ?
          <h1 onDoubleClick={() => setEditing(true)} >{note.title}</h1>
          :
          <input
            type="text"
            placeholder="العنوان"
            onChange={(e) => dispatchUpdateNote({ title: e.target.value })}
            defaultValue={note.title}
            className="form-control shadow-none border-0 fs-1 p-0 mb-2"
          />
        }
        {
          !editing ?
            <ReactMarkdown className="lh-lg">
              {note.description}
            </ReactMarkdown>
            :
            <textarea
              className="form-control shadow-none border-0 p-0 overflow-hidden lh-lg"
              onChange={(e) => dispatchUpdateNote({ description: e.target.value })}
              defaultValue={note.description}
              style={{minHeight: '65vh'}}
            />
        }
        <span className="text-muted">تاريخ اخر تعديل: <b>{note.date}</b></span>
      </div>
      :
      <h2 className="container my-5 text-center">خطأ</h2>
  )
}