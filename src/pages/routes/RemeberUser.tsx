import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useRefresh from "@/hooks/useRefresh";
import useLogout from "@/hooks/useLogout";
import solidIcons from "@/components/icons/solid";

export default function RememberUser() {
  const { user } = useUser();

  const accessToken = user?.accessToken;

  const [remember, setRemember] = useState<boolean>(localStorage.getItem("remember") === "true");

  const refreshAccessToken = useRefresh();

  const logout = useLogout();

  // in StrictMode, this component will be rendered twice causing the refreshAccessToken to be called twice.
  const effectHasRun = useRef(false);

  useEffect(() => {
    if (!accessToken && remember && !effectHasRun.current) {
      effectHasRun.current = true;
      (async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          setRemember(false);
          await logout();
        }
      })();
    }
  }, [accessToken, remember, refreshAccessToken, logout]);

  return !accessToken && remember ? <FullScreenLoader /> : <Outlet />;
}

// =======================================================================

function FullScreenLoader({ message = "Just one second..." }) {
  return (
    <div className="flex-center h-screen flex-col gap-5">
      <solidIcons.Spinner className="txt-primary" size={30} />
      <p className="txt-h text-xl">{message}</p>
    </div>
  );
}
