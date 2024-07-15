import { jwtDecode } from "jwt-decode";

export function getUserFromAccessToken(accessToken: string) {
  return { ...(jwtDecode(accessToken) as any).user, accessToken };
}
