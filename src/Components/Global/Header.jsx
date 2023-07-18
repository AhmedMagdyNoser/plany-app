import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavMenu from "./NavMenu";
import NotiArea from "./NotiArea";

export default function Header() {
  const notifications = useSelector((store) => store.notifications.data);

  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isNotiAreaOpened, setIsNotiAreaOpened] = useState(false);

  return (
    <>
      <header className="bg-dark py-3" style={{ position: "relative", zIndex: "5" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="fw-bold fs-2">
            <Link to={"/"} className="text-white text-decoration-none">
              <img style={{ height: "50px" }} src={require("../../Imgs/plany.ico")} alt="Plany" />
            </Link>
          </div>
          <div className="flex-center gap-3">
            <HeaderButton onClick={() => setIsNotiAreaOpened(true)}>
              <i className={"fa-regular fa-bell " + (notifications?.length && "fa-solid")} style={{ position: "relative" }}>
                {notifications?.length ? (
                  <i
                    className="fa-solid fa-circle fa-2xs text-danger"
                    style={{ position: "absolute", top: "5px", left: "10px", fontSize: "0.75rem" }}
                  ></i>
                ) : null}
              </i>
            </HeaderButton>
            <HeaderButton onClick={() => setIsNavMenuOpened(true)}>
              <i className="fa-solid fa-bars"></i>
            </HeaderButton>
          </div>
        </div>
      </header>
      {isNavMenuOpened && <NavMenu setIsOpened={setIsNavMenuOpened} animationTime={350} />}
      {isNotiAreaOpened && <NotiArea setIsOpened={setIsNotiAreaOpened} animationTime={350} />}
    </>
  );
}

function HeaderButton({ children, tabIndex, onClick, className, style }) {
  return (
    <button
      onClick={onClick}
      tabIndex={tabIndex}
      className={className + " text-white p-2 opacity-hover rounded dark-hover"}
      style={{ ...style, background: "none", border: "none", fontSize: "1.5rem" }}
    >
      {children}
    </button>
  );
}
