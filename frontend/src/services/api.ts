const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export type ApiState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

export async function requestJson<T>(path: string, fallback: T, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) return fallback;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });

    if (!response.ok) {
      throw new Error("Content unavailable");
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}
