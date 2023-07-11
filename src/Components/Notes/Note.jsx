import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FadeIn } from "../Utils/Fade";

export default function Note({ note }) {

  return (
    <FadeIn time='1s' className='d-flex'>
      <div className="bg-white w-100 px-4 py-3 rounded shadow-sm d-flex flex-column justify-content-between">
        <Link to={`/notes/${note.id}`} className="text-decoration-none">
          <h4>{note.title}</h4>
          <ReactMarkdown className="text-muted trancate-7 mb-2">
            {note.description}
          </ReactMarkdown>
        </Link>
        <div className="text-muted d-flex justify-content-between align-items-center border-top pt-3">
          <span>{note.date}</span>
        </div>
      </div>
    </FadeIn>
  )
}