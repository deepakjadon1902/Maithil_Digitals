import type { ContactPayload } from "../types/content";
import { requestJson } from "./api";

export const sendContact = async (payload: ContactPayload) => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return { ok: true };
  }

  return requestJson<{ ok: boolean }>("/contact", { ok: false }, {
    method: "POST",
    body: JSON.stringify(payload)
  });
};
