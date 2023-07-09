import { useNavigate } from "react-router-dom";

export default function NavMenu({ isOpened, setIsOpened }) {
  return (
    <div
      className={`nav-menu bg-white shadow ${
        !isOpened && "nav-menu-closed"
      }`}
    >
      <div
        style={{ background: "#f5f5f5" }}
        className="border-bottom p-3 d-flex justify-content-between align-items-center"
      >
        <span className="fw-bold">الاقسام</span>
        <i
          onClick={() => setIsOpened(false)}
          className="fa-solid fa-xmark p-2 rounded cursor-pointer"
        ></i>
      </div>
      <div className="d-flex flex-column">
        <NavLink onClick={() => setIsOpened(false)} title="قائمة المهام" path="/tasks" iconClass='fa-solid fa-circle-check' />
        <NavLink onClick={() => setIsOpened(false)} title="الملاحظات" path="/notes" iconClass='fa-solid fa-pen-clip' />
      </div>

      <style>
        {`
          .nav-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            max-width: 100%;
            min-height: 100vh;
            z-index: 9;
            transition: 0.35s
          }
          .nav-menu-closed {
            left: -325px;
            // box-shadow: none !important;
          }
          .fa-xmark {
            transition: 0.25s;
          }
          .fa-xmark:hover {
            background: #eee;
          }
        `}
      </style>
    </div>
  );
}

function NavLink({ title, path, iconClass, onClick  }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(path);
    onClick();
  }

  return (
    <div onClick={handleClick} className="link p-4 cursor-pointer text-muted d-flex gap-2 align-items-center border-bottom">
      <i className={iconClass}></i>
      {title}
      <style>
        {`
          .link {
            transition: 0.2s;          
          }
          .link:hover {
            color: black !important;
            background: #eee;
          }
        `}
      </style>
    </div>
  );
}
