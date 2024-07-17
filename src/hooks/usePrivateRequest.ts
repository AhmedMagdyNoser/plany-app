import { apiRequest } from "@/utils/api";
import useRefresh from "./useRefresh";
import useUser from "./useUser";
import useLogout from "./useLogout";

function usePrivateRequest() {
  const { user } = useUser();
  const logout = useLogout();
  const refreshAccessToken = useRefresh();

  async function privateRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      if (!user) throw "privateRequest Error: Please login first";
      // Add the access token to the request headers if it doesn't exist
      let finalOptions = options;
      if (!options?.headers?.auth)
        finalOptions = { ...options, headers: { auth: `Bearer ${user.accessToken}`, ...options.headers } };
      // Send the request
      return await apiRequest(url, finalOptions);
    } catch (error) {
      if (error === "Invalid access token.") {
        try {
          const newAccessToken = await refreshAccessToken();
          const newOptions = { ...options, headers: { auth: `Bearer ${newAccessToken}`, ...options.headers } };
          return await privateRequest(url, newOptions); // Send a new request with the new access token
        } catch (error) {
          if (error === "Invalid refresh token.") logout();
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  return privateRequest;
}

export default usePrivateRequest;
