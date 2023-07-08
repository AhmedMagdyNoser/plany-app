import { useState } from "react";
import { useParams } from "react-router-dom"
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../Redux/notesSlice";

export default function NoteDetailsPage() {

  const params = useParams();
  const id = parseInt(params.id);

  const dispatch = useDispatch();
  const notes = useSelector(store => store.notes.data) // Needs Updates
  const [note] = notes.filter(note => note.id === id)
  
  let [editing, setEditing] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    dispatch(updateNote({
      id,
      updatedFields: {
        title: formData.get('title'),
        description: formData.get('description'),
      }
    }))
    setEditing(false)
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
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
              <input
                type="text"
                name="title"
                placeholder="العنوان"
                defaultValue={note.title}
                className="form-control shadow-none border-0 fs-1 p-2"
              />
              <textarea
                name="description"
                defaultValue={note.description}
                style={{ minHeight: '50vh' }}
                className="form-control shadow-none border-0 p-2 overflow-hidden lh-lg"
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