import { useState } from "react";
import { useParams } from "react-router-dom"
import { getNote } from "../Storage";

export default function NoteDetailsPage() {

  let params = useParams();

  let [note] = useState(getNote(parseInt(params.id)))

  return (
    note ?
      <div className="container bg-white my-5 p-4 rounded shadow-sm">
        <h1>{note.title}</h1>
        <br/>
        <div>
          {note.description.split('\n').map((line, index) => (
            <p className="lh-lg" key={index}>{line}</p>
          ))}
        </div>
        <span className="text-muted">تاريخ اخر تعديل: <b>{note.date}</b></span>
      </div>
      :
      null
  )
}