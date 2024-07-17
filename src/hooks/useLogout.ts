import { apiRequest } from "@/utils/api";
import { forgetUser, logError } from "@/utils/helpers";
import useUser from "@/hooks/useUser";

function useLogout() {
  const { setUser } = useUser();

  const logout = async () => {
    try {
      setUser(null);
      forgetUser();
      await apiRequest("auth/logout", { method: "POST", credentials: "include" });
    } catch (error) {
      logError("logout", error);
      throw error;
    }
  };

  return logout;
}

export default useLogout;
