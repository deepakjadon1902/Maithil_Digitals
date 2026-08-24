const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
};

async function adminRequest<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: options.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    ...options
  });
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !json.success) throw new Error(json.message || "Request failed");
  return json.data;
}

export const adminApi = {
  login: (payload: { email: string; password: string }) => adminRequest<{ admin: { email: string } }>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => adminRequest("/auth/logout", { method: "POST" }),
  me: () => adminRequest<{ admin: { email: string } }>("/auth/me"),
  changePassword: (payload: { currentPassword: string; newPassword: string }) => adminRequest("/auth/change-password", { method: "POST", body: JSON.stringify(payload) }),
  dashboard: () => adminRequest<Record<string, unknown>>("/admin/dashboard"),
  list: (resource: string) => adminRequest<{ items: Record<string, unknown>[]; pagination: Record<string, number> }>(`/admin/${resource}`),
  create: (resource: string, payload: Record<string, unknown>) => adminRequest(`/admin/${resource}`, { method: "POST", body: JSON.stringify(payload) }),
  update: (resource: string, id: string, payload: Record<string, unknown>) => adminRequest(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (resource: string, id: string) => adminRequest(`/admin/${resource}/${id}`, { method: "DELETE" }),
  updateSingleton: (resource: string, payload: Record<string, unknown>) => adminRequest(`/admin/${resource}`, { method: "PUT", body: JSON.stringify(payload) }),
  enquiries: () => adminRequest<{ items: Record<string, unknown>[]; pagination: Record<string, number> }>("/admin/enquiries"),
  updateEnquiryStatus: (id: string, status: string) => adminRequest(`/admin/enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  uploadImage: (file: File) => {
    const data = new FormData();
    data.append("image", file);
    return adminRequest<{ url: string; optimizedUrl: string; fileId: string; alt: string; originalSize: number; optimizedSize: number; savedBytes: number }>("/admin/media/images", { method: "POST", body: data });
  },
  uploadVideo: (file: File) => {
    const data = new FormData();
    data.append("video", file);
    return adminRequest<{ url: string; optimizedUrl: string; fileId: string; alt: string; originalSize: number; optimizedSize: number; savedBytes: number; note?: string }>("/admin/media/videos", { method: "POST", body: data });
  }
};
