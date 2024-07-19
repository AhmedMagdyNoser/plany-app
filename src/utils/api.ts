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
    // Prepare the body and headers
    let body: ApiRequestOptions["data"] = null;
    let finalHeaders = headers;

    if (data)
      if (data instanceof FormData) body = data;
      else {
        body = JSON.stringify(data);
        finalHeaders = { ...headers, "Content-Type": "application/json" };
      }

    // Prepare final options
    const finalOptions = { method, headers: finalHeaders, body, credentials };

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
