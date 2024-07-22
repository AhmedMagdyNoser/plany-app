import { ApiRequestOptions } from "@/types/api";
import { apiRequest } from "@/utils/api";
import { logError } from "@/utils/helpers";
import useRefresh from "./useRefresh";
import useUser from "./useUser";
import useLogout from "./useLogout";

function usePrivateRequest() {
  const { user } = useUser();
  const logout = useLogout();
  const refreshAccessToken = useRefresh();

  async function privateRequest({
    url,
    method = "GET",
    headers = {},
    data = null,
    credentials = "same-origin",
  }: ApiRequestOptions) {
    try {
      if (!user) throw "No user logged in.";
      // Add the access token to the request headers if it doesn't exist
      let newHeaders = headers;
      if (!(headers as any).authorization) newHeaders = { authorization: `Bearer ${user.accessToken}`, ...headers };
      // Send the request with the access token
      return await apiRequest({ url, method, headers: newHeaders, data, credentials });
    } catch (error) {
      if (error === "Invalid access token.") {
        try {
          // Refresh the access token
          const newAccessToken = await refreshAccessToken();
          const newHeaders = { authorization: `Bearer ${newAccessToken}`, ...headers };
          // Send a new request with the new access token
          return await privateRequest({ url, method, headers: newHeaders, data, credentials });
        } catch (error) {
          if (error === "Invalid refresh token.") logout();
          throw error;
        }
      } else {
        logError("privateRequest", error);
        throw error;
      }
    }
  }

  return privateRequest;
}

export default usePrivateRequest;
