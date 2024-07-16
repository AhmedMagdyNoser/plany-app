import { apiRequest } from "@/utils/api";
import { getUserFromAccessToken } from "@/utils/helpers";
import useUser from "./useUser";

function useRefresh() {
  const { setUser } = useUser();

  const refreshAccessToken = async () => {
    const at = await apiRequest("auth/refresh-access-token", { method: "GET", credentials: "include" });
    setUser(getUserFromAccessToken(at));
    return at;
  };

  return refreshAccessToken;
}

export default useRefresh;
