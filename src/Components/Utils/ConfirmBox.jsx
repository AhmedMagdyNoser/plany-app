import { useRef, useEffect } from "react";

export default function ConfirmBox({ setIsOpened, action, message, confirmButtonTitle, discardButtonTitle, animationTime }) {
  const screen = useRef(null);
  const box = useRef(null);
  const confirmButton = useRef(null);
  const discardButton = useRef(null);

  function handleConfirm() {
    action();
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

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "ArrowRight") {
      confirmButton.current.focus();
    } else if (event.key === "ArrowLeft") {
      discardButton.current.focus();
    }
  }

  useEffect(() => {
    confirmButton.current.focus();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }; // The cleanup function is executed when the component unmounts.
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={screen} className="screen flex-center">
      {/* The Box */}
      <div
        ref={box}
        className="flex-center flex-column bg-white px-5 py-4 rounded-3 shadow-lg"
        style={{ width: "350px", maxWidth: "100%", animation: `popup ${animationTime}ms` }}
      >
        <i className="fa-solid fa-circle-exclamation text-warning py-3" style={{ fontSize: "4.5rem" }}></i>
        <p className="border-bottom pb-2 text-center">{message}</p>
        <div className="d-flex gap-2 w-100">
          <button ref={confirmButton} onClick={handleConfirm} className="btn btn-outline-danger flex-fill fw-bold">
            {confirmButtonTitle}
          </button>
          <button ref={discardButton} onClick={handleClose} className="btn btn-outline-secondary flex-fill fw-bold">
            {discardButtonTitle}
          </button>
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
            animation: fade-in  ${animationTime}ms;
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
    </div>
  );
}
