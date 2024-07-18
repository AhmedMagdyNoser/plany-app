import { jwtDecode } from "jwt-decode";

export function logRender(componentName: string, dataObject?: Record<string, any>) {
  console.log(`%c\`${componentName}\` Rendered`, "color: green; font-weight: bold;", dataObject ? dataObject : "");
}

export function logError(functionName: string, error?: any) {
  console.log(`%c\`${functionName}\` Error`, "color: red; font-weight: bold;", error ? error : "");
}

export function getUserFromAccessToken(accessToken: string) {
  const data = jwtDecode(accessToken) as any;
  return { ...data.user, fullName: `${data.user.firstName} ${data.user.lastName}`, accessToken };
}

export function getCoverColor(color: "red" | "green" | "blue" | "orange" | "fuchsia") {
  switch (color) {
    case "red":
      return "radial-gradient(circle, #fca5a5, #f87171, #ef4444)";
    case "green":
      return "radial-gradient(circle, #86efac, #4ade80, #22c55e)";
    case "blue":
      return "radial-gradient(circle, #93c5fd, #60a5fa, #3b82f6)";
    case "orange":
      return "radial-gradient(circle, #fdba74, #fb923c, #f97316)";
    case "fuchsia":
      return "radial-gradient(circle, #f0abfc, #e879f9, #d946ef)";
  }
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
      logError("handleFormSubmission", error);
      setError(error as string);
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
