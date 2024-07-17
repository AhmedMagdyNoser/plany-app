import { apiRequest } from "@/utils/api";
import { getUserFromAccessToken, logError } from "@/utils/helpers";
import useUser from "./useUser";

function useRefresh() {
  const { setUser } = useUser();

  const refreshAccessToken = async () => {
    try {
      const at = await apiRequest("auth/refresh-access-token", { method: "GET", credentials: "include" });
      setUser(getUserFromAccessToken(at));
      return at;
    } catch (error) {
      logError("refreshAccessToken", error);
      throw error;
    }
  };

  return refreshAccessToken;
}

export default useRefresh;
