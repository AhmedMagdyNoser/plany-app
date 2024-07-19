export type ApiRequestOptions = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  data?: Record<string, unknown> | string | FormData | null;
  credentials?: RequestCredentials;
};
