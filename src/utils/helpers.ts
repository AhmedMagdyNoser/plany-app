import { jwtDecode } from "jwt-decode";
import { globalErrorMessage } from "./constants";

export function getUserFromAccessToken(accessToken: string) {
  return { ...(jwtDecode(accessToken) as any).user, accessToken };
}

export function hasCompleteData(data: Record<string, string>) {
  return Object.values(data).every((value) => value !== "");
}

export async function handleFormSubmission(
  event: React.FormEvent<HTMLFormElement>,
  requiredFields: Record<string, string>,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  callback: () => Promise<void>,
): Promise<void> {
  event.preventDefault();
  // Check if all required fields are provided
  if (!hasCompleteData(requiredFields)) {
    setError("Please fill out all the fields");
  } else {
    try {
      setError("");
      setLoading(true);
      await callback();
    } catch (error) {
      console.log("%cError from handleFormSubmission", "color: red; font-weight: bold;", error);
      setError((error as string) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }
}

export function remeberUser() {
  localStorage.setItem("remember", "true");
}

export function forgetUser() {
  localStorage.removeItem("remember");
}
