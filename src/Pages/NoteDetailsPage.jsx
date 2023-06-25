import { useState } from "react";
import { useParams } from "react-router-dom"
import { getNote } from "../Storage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function NoteDetailsPage() {

  let params = useParams();

  let [note] = useState(getNote(parseInt(params.id)))

  return (
    note ?
      <div className="container bg-white my-5 p-4 rounded shadow-sm">
        <h1>{note.title}</h1>
        <ReactMarkdown className="lh-lg">
          {note.description}
        </ReactMarkdown>
        <span className="text-muted">تاريخ اخر تعديل: <b>{note.date}</b></span>
      </div>
      :
      null
  )
}