import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { removeNote, updateNote } from "../Redux/notesSlice";
import { findObjectById, formatDateAndTime } from "../utils";
import { FadeIn } from "../Components/Utils/Fade";
import PopupBox from "../Components/Utils/PopupBox";
import PageNotFound from "./PageNotFound";

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

  useEffect(() => {
    document.addEventListener("keydown", handleDeleteKey);
    return () => {
      document.removeEventListener("keydown", handleDeleteKey);
    };
  }, []);

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
              <PopupBox
                setIsOpened={setIsRemoveBoxOpened}
                className="flex-center flex-column bg-white p-4 rounded-3 shadow-lg"
                style={{ width: "350px" }}
                confirmAction={handleRemove}
                confirmButtonTitle="حذف"
                confirmButtonClass="btn btn-outline-danger flex-fill fw-bold"
                cancelButtonTitle="إلغاء"
                cancelButtonClass="btn btn-outline-secondary flex-fill fw-bold"
                animationTime={250}
              >
                <i className="fa-solid fa-circle-exclamation text-warning py-3" style={{ fontSize: "4.5rem" }}></i>
                <p className="border-bottom pb-2 text-center">هل انت متأكد من الحذف؟</p>
              </PopupBox>
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
          تاريخ اخر تعديل: <b>{formatDateAndTime(note.time, "ar")}</b>
        </span>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
}
