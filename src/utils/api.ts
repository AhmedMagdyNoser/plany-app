export async function apiRequest(url: string, options: RequestInit = {}): Promise<string> {
  try {
    const defaultHeaders = { "Content-Type": "application/json" };
    const finalOptions = { ...options, headers: { ...defaultHeaders, ...options.headers } };
    let response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, finalOptions);
    if (!response.ok) throw await response.text();
    return await response.text();
  } catch (error) {
    throw (error as string) || "`apiRequest` helper function error.";
  }
}
