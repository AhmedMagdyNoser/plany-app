import { useRef, useEffect } from "react";

export default function PopupBox({
  children,
  setIsOpened,
  className,
  style,
  confirmAction,
  confirmButtonTitle,
  confirmButtonClass,
  cancelButtonTitle,
  cancelButtonClass,
  animationTime,
}) {
  const screen = useRef(null);
  const box = useRef(null);
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  function handleConfirm() {
    confirmAction();
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
    } else if (confirmButtonTitle && cancelButtonTitle) {
      if (event.key === "ArrowRight") {
        confirmButtonRef.current.focus();
      } else if (event.key === "ArrowLeft") {
        cancelButtonRef.current.focus();
      }
    }
  }

  useEffect(() => {
    confirmButtonRef.current && confirmButtonRef.current.focus();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={screen} className="screen flex-center">
      <div ref={box} className={className} style={{ maxWidth: "100%", animation: `popup ${animationTime}ms`, ...style }}>
        {children}
        <div className="d-flex gap-2 w-100">
          {confirmButtonTitle && (
            <button type="button" ref={confirmButtonRef} onClick={handleConfirm} className={confirmButtonClass}>
              {confirmButtonTitle}
            </button>
          )}
          {cancelButtonTitle && (
            <button type="button" ref={cancelButtonRef} onClick={handleClose} className={cancelButtonClass}>
              {cancelButtonTitle}
            </button>
          )}
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
    </div>
  );
}
