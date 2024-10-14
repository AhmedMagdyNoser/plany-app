import { appName, paths } from "@/utils/constants";
import { Drawer } from "@mantine/core";
import { Link } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useTheme from "@/hooks/useTheme";
import useWindowHeight from "@/hooks/useWindowHeight";
import logo from "@/assets/imgs/logo.png";
import DefaultProfileImg from "@/components/global/default-profile-img";
import outlineIcons from "@/components/icons/outline";
import solidIcons from "@/components/icons/solid";

export default function MobileDrawer({ opened, close }: { opened: boolean; close: () => void }) {
  const { user } = useUser();

  const windowHeight = useWindowHeight();

  return (
    <Drawer opened={opened} onClose={close} withCloseButton={false} padding={0} size="xs">
      <div className="bg-basic-1 txt-basic-p flex flex-col transition-colors" style={{ height: windowHeight }}>
        {/* Header */}
        <header className="flex h-[75px] items-center justify-between px-4 shadow">
          <Link to="/" className="txt-basic-h flex items-center gap-3 text-xl font-bold">
            <img src={logo} alt="Plany Logo" className="h-[25px] w-[25px]" />
            {appName}
          </Link>

          <button className="btn-basic rounded-primary px-4 py-3" onClick={close}>
            <solidIcons.Xmark size={17.5} />
          </button>
        </header>

        {/* Nav */}
        <nav className="flex flex-1 flex-col items-center justify-between gap-2 py-2 font-semibold">
          {user ? (
            <>
              <div className="flex w-[95%] flex-col gap-2">
                <Link to={paths.tasks} className="btn-basic py-4" onClick={close}>
                  Tasks
                </Link>
                <Link to={paths.notes} className="btn-basic py-4" onClick={close}>
                  Notes
                </Link>
              </div>
              <div className="flex w-[95%] flex-col gap-2">
                <ToggleThemeButton />
                <Link to={paths.profile} className="transition-opacity hover:opacity-85">
                  <button className="btn-basic flex w-full items-center gap-2 py-4" onClick={close}>
                    {user.imgUrl ? (
                      <img src={user.imgUrl} alt={user.fullName} className="h-6 w-6 rounded-full" />
                    ) : (
                      <div className="h-6 w-6">
                        <DefaultProfileImg />
                      </div>
                    )}
                    {user.fullName}
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-[95%] flex-col gap-2">
                <ToggleThemeButton />
              </div>
              <div className="flex w-[95%] flex-col gap-2">
                <Link to={paths.login} onClick={close} className="btn-basic py-4">
                  Login
                </Link>
                <Link to={paths.register} onClick={close} className="btn-primary py-4">
                  Start for free
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </Drawer>
  );
}

// =======================================================================

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-basic flex items-center gap-2 py-4">
      {theme === "dark" ? (
        <>
          <solidIcons.LightMode size={21} />
          Light Mode
        </>
      ) : (
        <>
          <outlineIcons.DarkMode size={21} />
          Dark Mode
        </>
      )}
    </button>
  );
}
