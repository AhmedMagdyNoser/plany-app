import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../Redux/notesSlice";
import { randomDigits } from "../../utils";
import { FadeIn } from "../Utils/Fade";

export default function NewNote() {
  const [isNotePopupOpened, setIsNotePopupOpened] = useState(false);

  return (
    <FadeIn time="1s">
      <div
        onClick={() => setIsNotePopupOpened(true)}
        className="add p-5 text-primary bg-white rounded shadow-sm d-flex flex-column align-items-center justify-content-center cursor-pointer"
      >
        <div
          className="border border-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "85px", height: "85px" }}
        >
          <i className="fa-solid fa-plus fs-2"></i>
        </div>
        <p className="m-0 mt-3">ملاحظة جديدة</p>
      </div>
      <style>{` .add:hover {  opacity: 0.75; } `}</style>
      <NewNotePopup
        isOpened={isNotePopupOpened}
        setIsOpened={setIsNotePopupOpened}
      />
    </FadeIn>
  );
}

function NewNotePopup({ isOpened, setIsOpened }) {
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formattedDate = new Date().toLocaleDateString("ar-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    dispatch(
      addNote({
        id: randomDigits(9),
        title: formData.get("title"),
        description: formData.get("description"),
        date: formattedDate,
      })
    );
    e.target.reset();
    setIsOpened(false);
  }

  return (
    <>
      <div className="overlay d-flex align-items-center justify-content-center">
        <div className="popup-box bg-white rounded shadow-lg">
          <div className="d-flex align-items-center justify-content-between gap-5 py-3 px-4 border-bottom">
            <h4 className="m-0">اضف ملاحظة جديدة</h4>
            <i
              onClick={() => setIsOpened(false)}
              className="fa-solid fa-xmark gray-hover rounded p-2 cursor-pointer"
            ></i>
          </div>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column p-4 gap-3"
          >
            <input
              name="title"
              type="text"
              placeholder="العنوان"
              className="form-control shadow-none"
            />
            <textarea
              name="description"
              rows={10}
              placeholder="المحتوى"
              className="form-control shadow-none"
            />
            <input type="submit" value="اضف" className="btn btn-primary" />
          </form>
        </div>
      </div>

      <style>
        {`
        .overlay {
          background: #0003;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transition: 0.25s;
          ${
            isOpened
              ? "pointer-events: auto; opacity: 1;"
              : "pointer-events: none; opacity: 0;"
          }
        }
        .popup-box {
          width: 500px;
          max-width: 95%;
          transition: 0.25s ease-in-out; 
          ${isOpened ? "scale: 1; opacity: 1;" : "scale: 0; opacity: 0;"}
        }
      `}
      </style>
    </>
  );
}
