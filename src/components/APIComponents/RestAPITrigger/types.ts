export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

export interface APIResponse {
  status: number;
  statusText: string;
  headers?: Record<string, string>;
  data: any;
  timestamp: string;
}

export interface APIDetails {
  id?: string;
  name: string;
  url: string;
  method: APIMethod;
  headers: Record<string, string>;
  body?: string;
  response: APIResponse;
  curlCommand: string;
}
