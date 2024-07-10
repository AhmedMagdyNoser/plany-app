import { Link } from "react-router-dom";
import { paths } from "@/utils/constants";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const auth = false; // testing

  return (
    <header className="flex justify-between bg-gray-100 p-4 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
      <Link to="/">Plany</Link>
      <nav className="flex gap-2">
        {auth ? (
          <>
            <Link to={paths.tasks}>Tasks</Link>
            <Link to={paths.notes}>Notes</Link>
            <Link to={paths.contact}>Profile</Link>
            <ToggleThemeButton />
          </>
        ) : (
          <>
            <ToggleThemeButton />
            <Link to={paths.login}>Login</Link>
            <Link to={paths.register}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
