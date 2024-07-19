export type ApiRequestOptions = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  data?: Record<string, unknown> | string | null;
  credentials?: RequestCredentials;
};
