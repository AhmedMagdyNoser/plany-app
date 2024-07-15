import { jwtDecode } from "jwt-decode";

export function getUserFromAccessToken(accessToken: string) {
  return { ...(jwtDecode(accessToken) as any).user, accessToken };
}

export function areFieldsFilled(data: Record<string, string>) {
  return Object.values(data).every((value) => value !== "");
}
