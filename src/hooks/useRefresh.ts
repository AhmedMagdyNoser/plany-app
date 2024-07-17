import { apiRequest } from "@/utils/api";
import { getUserFromAccessToken } from "@/utils/helpers";
import useUser from "./useUser";

function useRefresh() {
  const { setUser } = useUser();

  const refreshAccessToken = async () => {
    try {
      const at = await apiRequest("auth/refresh-access-token", { method: "GET", credentials: "include" });
      setUser(getUserFromAccessToken(at));
      return at;
    } catch (error) {
      console.log("%cError from `refreshAccessToken` function", "color: red; font-weight: bold;", error);
      throw error;
    }
  };

  return refreshAccessToken;
}

export default useRefresh;
