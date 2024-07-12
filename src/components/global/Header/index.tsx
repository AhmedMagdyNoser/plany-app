import { Link } from "react-router-dom";
import { paths } from "@/utils/constants";
import useUser from "@/hooks/useUser";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const { user } = useUser();

  return (
    <header className="shadow">
      <div className="container flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-l-txt dark:text-d-txt">
          Plany
        </Link>
        <nav className="flex gap-2 font-semibold">
          {user ? (
            <>
              <Link to={paths.tasks} className="btn-d">
                Tasks
              </Link>
              <Link to={paths.notes} className="btn-d">
                Notes
              </Link>
              <ToggleThemeButton />
              <Link to={paths.contact} className="btn-d">
                Profile
              </Link>
            </>
          ) : (
            <>
              <ToggleThemeButton />
              <div className="bg-l-bg-4 dark:bg-d-bg-4 my-2 w-[2px]"></div>
              <Link to={paths.login} className="btn-d">
                Login
              </Link>
              <Link to={paths.register} className="btn-a">
                Start for free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
