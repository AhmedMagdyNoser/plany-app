import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FadeIn } from "../Utils/Fade";

export default function Note({ note }) {
  return (
    <FadeIn milliSeconds="1000" className="d-flex">
      <Link
        tabIndex={-1}
        to={`/notes/${note.id}`}
        style={{transition: '50ms'}}
        className="bg-white text-decoration-none reverse-opacity-hover w-100 px-4 py-3 rounded shadow-sm d-flex flex-column justify-content-between"
      >
        <div>
          <h4>{note.title}</h4>
          <ReactMarkdown className="text-muted trancate-7 mb-2">{note.description}</ReactMarkdown>
        </div>
        <footer className="text-muted d-flex justify-content-between align-items-center pt-3">
          <span>{note.time}</span>
        </footer>
      </Link>
    </FadeIn>
  );
}
