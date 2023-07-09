import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { useState } from "react";

export default function Header() {

  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);

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
          <i className="fa-solid fa-bars text-white fa-2x cursor-pointer" onClick={() => setIsNavMenuOpened(true)} ></i>
        </div>
      </header>
      <NavMenu isOpened={isNavMenuOpened} setIsOpened={setIsNavMenuOpened}/>
    </>
  );
}
