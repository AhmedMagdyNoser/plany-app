export default function Note({ note }) {

  return (
    <>
      <div className="bg-white px-4 py-3 rounded shadow-sm d-flex flex-column justify-content-between">
        <div>
          <h4>{note.title}</h4>
          <p className="text-muted">{note.description}</p>
        </div>
        <div className="text-muted d-flex justify-content-between align-items-center border-top pt-3">
          <span>{note.date}</span>
          <span className="d-flex gap-2">
            <i className="fa-solid fa-edit cursor-pointer option"></i>
            <i className="fa-solid fa-trash cursor-pointer option"></i>
          </span>
        </div>
      </div>
      <style>
        {`
          .option {
            opacity: 0.75;
            transition: 0.25s
          }
          .option:hover {
            opacity: 1
          }
        `}
      </style>
    </>
  )
}