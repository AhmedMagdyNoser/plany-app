import { useNavigate } from "react-router-dom";

export default function NavMenu({ isOpened, setIsOpened }) {
  return (
    <div
      className={`side-menu bg-white shadow ${!isOpened && "side-menu-closed"}`}
    >
      <div
        style={{ background: "#f8f8f8" }}
        className="border-bottom p-3 d-flex justify-content-between align-items-center"
      >
        <span className="d-flex gap-2 align-items-center">
          <i className="fa-solid fa-bars"></i>
          <span className="fw-bold">الاقسام</span>
        </span>
        <i
          onClick={() => setIsOpened(false)}
          className="fa-solid fa-xmark gray-hover p-2 rounded cursor-pointer"
        ></i>
      </div>
      <div className="d-flex flex-column">
        <NavLink
          onClick={() => setIsOpened(false)}
          title="قائمة المهام"
          path="/tasks"
          iconClass="fa-solid fa-circle-check"
        />
        <NavLink
          onClick={() => setIsOpened(false)}
          title="الملاحظات"
          path="/notes"
          iconClass="fa-solid fa-pen-clip"
        />
      </div>
    </div>
  );
}

function NavLink({ title, path, iconClass, onClick }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(path);
    onClick();
  }

  return (
    <div
      onClick={handleClick}
      className="gray-hover p-4 cursor-pointer text-muted d-flex gap-2 align-items-center border-bottom"
    >
      <i className={iconClass}></i>
      {title}
    </div>
  );
}
