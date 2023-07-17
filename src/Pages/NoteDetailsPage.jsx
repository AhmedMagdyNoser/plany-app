import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { removeNote, updateNote } from "../Redux/notesSlice";
import ConfirmBox from "../Components/Utils/ConfirmBox";
import { FadeIn } from "../Components/Utils/Fade";
import { findObjectById } from "../utils";

export default function NoteDetailsPage() {
  const navigate = useNavigate();

  const params = useParams();
  const id = parseInt(params.id);

  const dispatch = useDispatch();

  // Getting the required note from the store
  const notes = useSelector((store) => store.notes.data);
  const note = findObjectById(notes, id);

  let [editingMode, setEditingMode] = useState(false);

  const [isRemoveBoxOpened, setIsRemoveBoxOpened] = useState(false);

  function handleDeleteKey(e) {
    e.key === "Delete" && setIsRemoveBoxOpened(true);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteKey);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleDeleteKey);
    }; // The cleanup function is executed when the component unmounts.
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    dispatch(
      updateNote({
        id,
        updatedFields: {
          title: formData.get("title"),
          description: formData.get("description"),
        },
      })
    );
    setEditingMode(false);
  }

  function handleRemove() {
    dispatch(removeNote(note.id));
    navigate("/notes");
  }

  return note ? (
    <div className={"py-5 " + (!editingMode && "bg-white")}>
      <div className="container">
        {!editingMode ? (
          <FadeIn milliSeconds={500}>
            <header className="border-bottom pb-3 mb-3 d-flex justify-content-between ">
              <h1 className="m-0 trancate-1">{note.title}</h1>
              <div className="d-flex gap-2">
                <button tabIndex={isRemoveBoxOpened ? -1 : 1} onClick={() => setEditingMode(true)} className="btn btn-primary">
                  تعديل
                </button>
                <button tabIndex={isRemoveBoxOpened ? -1 : 1} onClick={() => setIsRemoveBoxOpened(true)} className="btn btn-primary">
                  حذف
                </button>
              </div>
            </header>
            <ReactMarkdown className="lh-lg">{note.description}</ReactMarkdown>
            {isRemoveBoxOpened && (
              <ConfirmBox
                setIsOpened={setIsRemoveBoxOpened}
                action={handleRemove}
                message="هل انت متأكد من الحذف؟"
                confirmButtonTitle="حذف"
                discardButtonTitle="إلغاء"
                animationTime={200}
              />
            )}
          </FadeIn>
        ) : (
          <form onSubmit={handleUpdate} className="d-flex flex-column gap-2">
            <input
              type="text"
              name="title"
              placeholder="العنوان"
              defaultValue={note.title}
              className="form-control shadow-none border-0 fs-1 p-3"
            />
            <textarea
              name="description"
              defaultValue={note.description}
              style={{ minHeight: "50vh" }}
              className="form-control shadow-none border-0 p-3 lh-lg"
            />
            <div className="d-flex gap-2">
              <input type="submit" value="حفظ التعديلات" className="btn btn-primary w-100" />
              <button onClick={() => setEditingMode(false)} className="btn btn-secondary">
                إلغاء
              </button>
            </div>
          </form>
        )}
        <span className="text-muted d-block mt-2">
          تاريخ اخر تعديل: <b>{note.time}</b>
        </span>
      </div>
    </div>
  ) : (
    <h2 className="container my-5 text-center">خطأ</h2>
  );
}
