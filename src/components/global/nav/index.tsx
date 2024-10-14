import { Link } from "react-router-dom";
import { appName, paths } from "@/utils/constants";
import { useDisclosure } from "@mantine/hooks";
import useTheme from "@/hooks/useTheme";
import useUser from "@/hooks/useUser";
import logo from "@/assets/imgs/logo.png";
import DefaultProfileImg from "@/components/global/default-profile-img";
import outlineIcons from "@/components/icons/outline";
import solidIcons from "@/components/icons/solid";
import MobileDrawer from "./mobile-drawer";

export default function Header() {
  const { user } = useUser();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="bg-header brdr-basic-3 sticky top-0 z-40 h-[75px] shadow dark:border-b">
      <div className="container flex h-full items-center justify-between px-4">
        <Link to="/" className="txt-basic-h flex items-center gap-3 text-xl font-bold">
          <img src={logo} alt="Plany Logo" className="h-[25px] w-[25px]" />
          {appName}
        </Link>

        <button className="btn-basic rounded-primary px-4 py-3 md:hidden" onClick={open}>
          <solidIcons.Menu size={17.5} />
        </button>

        <nav className="hidden items-center gap-3 font-semibold md:flex">
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

      {/* Mobile Drawer */}
      <MobileDrawer opened={opened} close={close} />
    </header>
  );
}

// =======================================================================

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-basic flex-center h-10 w-10 rounded-full p-0">
      {theme === "dark" ? <solidIcons.LightMode size={21} /> : <outlineIcons.DarkMode size={21} />}
    </button>
  );
}
