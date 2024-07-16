import { apiRequest } from "@/utils/api";
import { forgetUser } from "@/utils/helpers";
import useUser from "@/hooks/useUser";

function useLogout() {
  const { setUser } = useUser();

  const logout = async () => {
    try {
      setUser(null);
      forgetUser();
      await apiRequest("auth/logout", { method: "POST", credentials: "include" });
    } catch (error) {
      console.log("%cError from `Logout` function", "color: red; font-weight: bold;", error);
    }
  };

  return logout;
}

export default useLogout;
