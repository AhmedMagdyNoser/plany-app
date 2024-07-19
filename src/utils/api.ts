import { ApiRequestOptions } from "@/types/api";
import { globalErrorMessage } from "@/utils/constants";
import { logError } from "@/utils/helpers";

export async function apiRequest({
  url,
  method = "GET",
  headers = {},
  data = null,
  credentials = "same-origin",
}: ApiRequestOptions): Promise<string | object> {
  try {
    // Stringify the data if it's an object
    const body = data && typeof data === "object" ? JSON.stringify(data) : data;

    // Prepare the final options
    const finalOptions = { method, headers: { "Content-Type": "application/json", ...headers }, body, credentials };

    // Send the request
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, finalOptions);

    // Throw an error if the response isn't ok
    if (!response.ok) throw await response.text();

    // If it's ok, return the response as string or object
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
