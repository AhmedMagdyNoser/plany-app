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
      <div className="py-5">
        <div className="container">
          {!editing ?
            <>
              <div className="border-bottom pb-3 mb-3 d-flex justify-content-between ">
                <h1 className="m-0 trancate-1">{note.title}</h1>
                <button onClick={() => setEditing(true)} className="btn btn-primary">تعديل</button>
              </div>
              <ReactMarkdown className="lh-lg">
                {note.description}
              </ReactMarkdown>
            </>
            :
            <form className="d-flex flex-column gap-2">
              <input
                type="text"
                placeholder="العنوان"
                onChange={(e) => dispatchUpdateNote({ title: e.target.value })}
                defaultValue={note.title}
                className="form-control shadow-none border-0 fs-1 p-2"
              />
              <textarea
                className="form-control shadow-none border-0 p-2 overflow-hidden lh-lg"
                onChange={(e) => dispatchUpdateNote({ description: e.target.value })}
                defaultValue={note.description}
                style={{ minHeight: '50vh' }}
              />
              <input type="submit" value="حفظ التعديلات" className="btn btn-primary w-100" />
            </form>
          }
          <span className="text-muted d-block mt-2">تاريخ اخر تعديل: <b>{note.date}</b></span>
        </div>
      </div>
      :
      <h2 className="container my-5 text-center">خطأ</h2>
  )
}