import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function NavMenu({ setIsOpened, animationTime }) {
  const box = useRef();

  function handleClose() {
    setTimeout(() => {
      setIsOpened(false);
    }, animationTime);
    box.current.style.animation = `close ${+animationTime}ms`;
    box.current.style.left = `-500px`;
  }

  function handleClickOutside(event) {
    if (box.current && !box.current.contains(event.target)) {
      handleClose();
    }
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    }; // The cleanup function is executed when the component unmounts.
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={box} className="window bg-white shadow">
      <header style={{ background: "#f8f8f8" }} className="border-bottom p-3 flex-center justify-content-between">
        <span className="d-flex gap-2 align-items-center">
          <i className="fa-solid fa-bars"></i>
          <span className="fw-bold">الاقسام</span>
        </span>
        <button onClick={handleClose} style={{ background: "transparent" }} className="p-2 gray-hover rounded border-0">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>

      <nav className="d-flex flex-column">
        <NavLink onClick={handleClose} title="قائمة المهام" path="/tasks" iconClass="fa-solid fa-circle-check" />
        <NavLink onClick={handleClose} title="الملاحظات" path="/notes" iconClass="fa-solid fa-pen-clip" />
      </nav>

      <style>
        {`
        .window {
          position: fixed;
          top: 0;
          left: 0;
          width: 500px;
          max-width: 100%;
          height: 100vh;
          z-index: 9;
          animation: open ${+animationTime}ms;
        }
        @keyframes open {
          from { left: -500px; } to { left: 0; }
        }
        @keyframes close {
          from { left: 0; } to { left: -500px; }
        }
        `}
      </style>
    </div>
  );
}

function NavLink({ title, path, iconClass, onClick }) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className="text-decoration-none text-dark p-4 opacity-hover gray-hover cursor-pointer d-flex gap-2 align-items-center border-bottom"
    >
      <i className={iconClass}></i>
      {title}
    </Link>
  );
}
