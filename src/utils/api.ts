import { globalErrorMessage } from "@/utils/constants";
import { logError } from "@/utils/helpers";

export async function apiRequest(url: string, options: RequestInit = {}): Promise<any> {
  try {
    // Prepare headers to set content type as json by default
    const defaultHeaders = { "Content-Type": "application/json" };
    // Check if body exists and is an object, then stringify it
    const body = options.body && typeof options.body === "object" ? JSON.stringify(options.body) : options.body;
    
    const finalOptions = { ...options, body, headers: { ...defaultHeaders, ...options.headers } };

    // Send the request
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, finalOptions);

    // throw an error if the response isn't ok
    if (!response.ok) throw await response.text();

    // return the response as string or object if it's ok
    const contentType = response.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");
    return isJson ? await response.json() : await response.text();
  } catch (error) {
    logError("apiRequest", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw "Oops! We’re having trouble reaching our servers.";
    } else if (typeof error === "string") {
      throw error;
    } else {
      throw globalErrorMessage;
    }
  }
}