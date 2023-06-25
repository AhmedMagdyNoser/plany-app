import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeNote } from "../../Redux/notesSlice";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Note({ note }) {

  let dispatch = useDispatch();

  return (
    <>
      <div className="bg-white px-4 py-3 rounded shadow-sm d-flex flex-column justify-content-between">
        <Link to={`/notes/${note.id}`} className="text-decoration-none">
          <h4>{note.title}</h4>
          <ReactMarkdown className="text-muted trancate mb-2">
            {note.description}
          </ReactMarkdown>
        </Link>
        <div className="text-muted d-flex justify-content-between align-items-center border-top pt-3">
          <span>{note.date}</span>
          <i onClick={() => dispatch(removeNote(note.id))} className="fa-solid fa-trash cursor-pointer option"></i>
        </div>
      </div>
      <style>
        {`
          .note-box:hover {
            background: #fbfbfb !important;
          }
          .option {
            opacity: 0.75;
          }
          .option:hover {
            opacity: 1
          }
          .trancate {
            display: -webkit-box;
            -webkit-line-clamp: 7; /* number of lines to display */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}