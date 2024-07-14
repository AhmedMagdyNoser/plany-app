import { Link } from "react-router-dom";
import { paths } from "@/utils/constants";
import useUser from "@/hooks/useUser";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const { user } = useUser();

  return (
    <header className="shadow">
      <div className="container flex items-center justify-between p-4">
        <Link to="/" className="txt text-xl font-bold">
          Plany
        </Link>
        <nav className="flex items-center gap-2 font-semibold">
          {user ? (
            <>
              <Link to={paths.tasks} className="btn-d">
                Tasks
              </Link>
              <Link to={paths.notes} className="btn-d">
                Notes
              </Link>
              <ToggleThemeButton />
              <Link to={paths.profile} className="transition-opacity hover:opacity-85">
                <img src={user.imgUrl} alt={user.firstName} className="h-10 w-10 rounded-full" />
              </Link>
            </>
          ) : (
            <>
              <ToggleThemeButton />
              <div className="bg-4 h-[20px] w-[2px]"></div>
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
