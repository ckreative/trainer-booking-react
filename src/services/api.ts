const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const APP_KEY = import.meta.env.VITE_APP_KEY || '';

interface ApiError {
  error: string;
  message: string;
}

class ApiClient {
  private baseUrl: string;
  private appKey: string;

  constructor(baseUrl: string, appKey: string) {
    this.baseUrl = baseUrl;
    this.appKey = appKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-App-Key': this.appKey,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'Unknown Error',
        message: 'An unexpected error occurred',
      }));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_URL, APP_KEY);
