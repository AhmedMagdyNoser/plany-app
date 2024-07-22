import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "@/hooks/useUser";
import { paths } from "@/utils/constants";

function AuthGaurd({ requireLoggedIn }: { requireLoggedIn: boolean }) {
  const { user } = useUser();
  const location = useLocation();

  if (requireLoggedIn) {
    return user ? <Outlet /> : <Navigate to={`/${paths.login}`} state={{ from: location.pathname }} replace={true} />;
  }
  
  return !user ? <Outlet /> : <Navigate to={location.state?.from || "/"} replace={true} />;
}

export default AuthGaurd;
