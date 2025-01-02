export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface APIResponse {
  status: number;
  statusText: string;
  data: any;
  timestamp: string;
}

export interface TestResult {
  response: APIResponse;
  isSuccess: boolean;
  error?: string;
}

export interface APIConfig {
  url: string;
  method: APIMethod;
  headers?: Record<string, string>;
  body?: string;
}