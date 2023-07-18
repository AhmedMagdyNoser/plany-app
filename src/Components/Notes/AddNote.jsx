import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../Redux/notesSlice";
import { formatedCurrentDate, randomDigits } from "../../utils";
import { FadeIn } from "../Utils/Fade";

export default function AddNote() {
  const [isNotePopupOpened, setIsNotePopupOpened] = useState(false);

  return (
    <FadeIn milliSeconds="1000">
      <div
        onClick={() => setIsNotePopupOpened(true)}
        className="p-5 text-primary bg-white rounded shadow-sm flex-center flex-column reverse-opacity-hover cursor-pointer"
        style={{ transition: "50ms" }}
      >
        <div className="border border-primary rounded-circle flex-center" style={{ width: "85px", height: "85px" }}>
          <i className="fa-solid fa-plus fs-3"></i>
        </div>
        <p className="m-0 mt-3">ملاحظة جديدة</p>
      </div>
      {isNotePopupOpened && <NewNotePopup setIsOpened={setIsNotePopupOpened} animationTime={350} />}
    </FadeIn>
  );
}

function NewNotePopup({ setIsOpened, animationTime }) {
  const dispatch = useDispatch();
  const screen = useRef(null);
  const box = useRef(null);
  const titleInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    dispatch(
      addNote({
        id: randomDigits(9),
        title: formData.get("title"),
        description: formData.get("description"),
        time: formatedCurrentDate("ar"),
      })
    );
    e.target.reset();
    handleClose();
  }

  function handleClose() {
    setTimeout(() => {
      setIsOpened(false);
    }, animationTime);
    screen.current.style.animation = `fade-out ${+animationTime}ms`;
    screen.current.style.opacity = `0`;
    box.current.style.animation = `popdown ${+animationTime}ms`;
    box.current.style.scale = `0`;
  }

  function handleClickOutside(event) {
    if (box.current && !box.current.contains(event.target)) {
      handleClose();
    }
  }

  function handleEscapeKey(event) {
    event.key === "Escape" && handleClose();
  }

  useEffect(() => {
    titleInput.current.focus();
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    }; // The cleanup function is executed the component unmounts.
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div ref={screen} className="screen flex-center">
        {/* The Box */}
        <div
          ref={box}
          className="bg-white rounded shadow-lg"
          style={{ width: "500px", maxWidth: "100%", animation: `popup ${animationTime}ms` }}
        >
          <header className="d-flex align-items-center justify-content-between gap-5 py-3 px-4 border-bottom">
            <h4 className="m-0">اضف ملاحظة جديدة</h4>
            <i onClick={handleClose} className="fa-solid fa-xmark gray-hover rounded p-2 cursor-pointer"></i>
          </header>

          <form onSubmit={handleSubmit} className="d-flex flex-column p-4 gap-3">
            <input name="title" type="text" required ref={titleInput} placeholder="العنوان" className="form-control shadow-none" />
            <textarea name="description" rows={10} required placeholder="المحتوى" className="form-control shadow-none" />
            <input type="submit" value="اضف" className="btn btn-primary" />
          </form>
        </div>
      </div>

      <style>
        {`
        .screen {
          background: #0005;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          animation: fade-in ${animationTime}ms;
        }
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; } to { opacity: 0; }
        }
        @keyframes popup {
          from { scale: 0; } to { scale: 1; }
        }
        @keyframes popdown {
          from { scale: 1; } to { scale: 0; }
        }
      `}
      </style>
    </>
  );
}
