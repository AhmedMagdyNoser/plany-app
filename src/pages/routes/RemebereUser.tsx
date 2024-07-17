import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useUser from "@/hooks/useUser";
import useRefresh from "@/hooks/useRefresh";
import useLogout from "@/hooks/useLogout";
import FullScreenLoader from "@/components/global/FullScreenLoader";

function RemembereUser() {
  const { user } = useUser();

  const accessToken = user?.accessToken;

  const [remember, setRemember] = useState<Boolean>(localStorage.getItem("remember") === "true");
  
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

export default RemembereUser;
