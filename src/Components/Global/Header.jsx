import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { useState } from "react";
import NotiArea from "./NotiArea";

export default function Header() {
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);
  const [isNotiAreaOpened, setIsNotiAreaOpened] = useState(false);

  return (
    <>
      <header className="bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="fw-bold fs-2">
            <Link to={"/"} className="text-white text-decoration-none">
              <img
                style={{ height: "50px" }}
                src={require("../../Imgs/plany.ico")}
                alt="Plany"
              />
            </Link>
          </div>
          <div className="d-flex gap-4 justify-content-center align-items-center">
            <i
              className="fa-regular fa-bell text-white cursor-pointer"
              style={{ fontSize: "1.5rem" }}
              onClick={() => setIsNotiAreaOpened(true)}
            ></i>
            <i
              className="fa-solid fa-bars text-white cursor-pointer"
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

function NotificationArea() {
  return (
    <div className="box position-absolute bg-white border rounded shadow-sm">
      
      <style>
        {`
        .box {
          top: calc(100% + 25px);
          left: 50%;
          transform: translateX(-50%);
          width: 250px
        }
        `}
      </style>
    </div>
  );
}

