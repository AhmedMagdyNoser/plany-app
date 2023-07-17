import { useRef, useEffect } from "react";

export default function ConfirmBox({ setIsOpened, action, message, confirmButtonTitle, discardButtonTitle, animationTime }) {
  const screen = useRef(null);
  const box = useRef(null);
  const confirmButton = useRef(null);
  const discardButton = useRef(null);

  function handleConfirm() {
    action();
    setIsOpened(false);
  }

  function handleClose() {
    setTimeout(() => {
      setIsOpened(false);
    }, animationTime);
    screen.current.style.animation = `fade-out ${+animationTime +100}ms`;
    screen.current.style.opacity = `0`;
    box.current.style.animation = `popdown ${+animationTime +100}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    box.current.style.scale = `0`;
  }

  useEffect(() => {
    confirmButton.current.focus();
    document.addEventListener("keydown", handleKeyDown);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; // The cleanup function is executed when the component unmounts.
    // eslint-disable-next-line
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "ArrowRight") {
      confirmButton.current.focus();
    } else if (e.key === "ArrowLeft") {
      discardButton.current.focus();
    }
  }

  return (
    <div ref={screen} className="screen flex-center">
      {/* The Box */}
      <div ref={box} className="box border bg-white px-5 py-4 rounded-3 shadow-sm">
        <div className="content flex-center flex-column">
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
          .box {
            animation: popup ${animationTime}ms;
          }
          .content {
            width: 100%;
            min-width: 175px;
            max-width: 350px;
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
