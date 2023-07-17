import { useRef, useEffect } from "react";

export default function ConfirmBox({ isOpened, setIsOpened, action, message, confirmButtonTitle, discardButtonTitle }) {
  const confirmButtonRef = useRef(null);
  const discardButtonRef = useRef(null);

  function handleAction() {
    action();
    setIsOpened(false);
  }

  useEffect(() => {
    if (isOpened) {
      confirmButtonRef.current.focus();
      document.addEventListener("keydown", handleKeyDown);
    }
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; // The cleanup function is executed when isOpened becomes false or when the component unmounts.
    // eslint-disable-next-line
  }, [isOpened]);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setIsOpened(false);
    } else if (e.key === "ArrowRight") {
      confirmButtonRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      discardButtonRef.current.focus();
    }
  }

  return (
    <div className="screen-overlay check-screen flex-center">
      <div className="check-box border bg-white px-5 py-4 rounded-3 shadow-sm">
        <div className="content flex-center flex-column">
          <span className="fs-1 fw-bold text-warning mb-3 circle flex-center border border-warning">!</span>
          <p className="border-bottom pb-2 text-center">{message}</p>
          <div className="d-flex gap-2 w-100">
            <button
              tabIndex={isOpened ? 1 : -1}
              ref={confirmButtonRef}
              onClick={handleAction}
              className="btn btn-outline-danger flex-fill fw-bold"
            >
              {confirmButtonTitle}
            </button>
            <button
              tabIndex={isOpened ? 1 : -1}
              ref={discardButtonRef}
              onClick={() => setIsOpened(false)}
              className="btn btn-outline-secondary flex-fill fw-bold"
            >
              {discardButtonTitle}
            </button>
          </div>
        </div>
        <style>
          {`
            .check-screen {
              ${isOpened ? "pointer-events: auto; opacity: 1;" : "pointer-events: none; opacity: 0;"}
            }
            .check-box {
              transition: 0.25s ease-in-out;
              ${isOpened ? "scale: 1; opacity: 1;" : "scale: 0; opacity: 0;"}
            }
            .content {
              width: 100%;
              min-width: 175px;
              max-width: 350px;
            }
            span.circle {
              border-radius: 50% !important;
              width: 65px;
              height: 65px;
            }
          `}
        </style>
      </div>
    </div>
  );
}
