import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { useState } from "react";
import NotiArea from "./NotiArea";
import { useSelector } from "react-redux";

export default function Header() {
  const notifications = useSelector((store) => store.notifications.data);

  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isNotiAreaOpened, setIsNotiAreaOpened] = useState(false);

  return (
    <>
      <header className="bg-dark py-3" style={{position: 'relative', zIndex: '5'}}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="fw-bold fs-2">
            <Link to={"/"} className="text-white text-decoration-none">
              <img style={{ height: "50px" }} src={require("../../Imgs/plany.ico")} alt="Plany" />
            </Link>
          </div>
          <div className="flex-center gap-4">
            <i
              className={"fa-regular fa-bell text-white opacity-hover cursor-pointer " + (notifications?.length && "fa-solid")}
              style={{ fontSize: "1.5rem", position: "relative" }}
              onClick={() => setIsNotiAreaOpened(true)}
            >
              {notifications?.length ? (
                <i
                  className="fa-solid fa-circle fa-2xs text-danger"
                  style={{ position: "absolute", top: "5px", left: "8px", scale: "0.75" }}
                ></i>
              ) : null}
            </i>
            <i
              className="fa-solid fa-bars text-white opacity-hover cursor-pointer"
              style={{ fontSize: "1.5rem" }}
              onClick={() => setIsNavMenuOpened(true)}
            ></i>
          </div>
        </div>
      </header>
      <NavMenu isOpened={isNavMenuOpened} setIsOpened={setIsNavMenuOpened} />
      <NotiArea isOpened={isNotiAreaOpened} setIsOpened={setIsNotiAreaOpened} />
    </>
  );
}
