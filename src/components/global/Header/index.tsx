import { Link } from "react-router-dom";
import { paths } from "@/utils/constants";
import useUser from "@/hooks/useUser";
import DefaultProfileImg from "@/components/global/DefaultProfileImg";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const { user } = useUser();

  return (
    <header className="bg-header brdr-basic-3 sticky top-0 z-40 shadow dark:border-b">
      <div className="container flex items-center justify-between p-4">
        <Link to="/" className="txt-basic-h text-xl font-bold">
          Plany
        </Link>
        <nav className="flex items-center gap-3 font-semibold">
          {user ? (
            <>
              <Link to={paths.tasks} className="btn-basic">
                Tasks
              </Link>
              <Link to={paths.notes} className="btn-basic">
                Notes
              </Link>
              <ToggleThemeButton />
              <Link to={paths.profile} className="transition-opacity hover:opacity-85">
                {user.imgUrl ? (
                  <img src={user.imgUrl} alt={user.fullName} className="h-10 w-10 rounded-full" />
                ) : (
                  <div className="h-10 w-10">
                    <DefaultProfileImg />
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <ToggleThemeButton />
              <div className="bg-basic-3 h-[20px] w-[2px]"></div>
              <Link to={paths.login} className="btn-basic">
                Login
              </Link>
              <Link to={paths.register} className="btn-primary">
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
