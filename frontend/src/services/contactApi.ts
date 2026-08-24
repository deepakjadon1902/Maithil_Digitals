import type { ContactPayload } from "../types/content";
import { requestJson } from "./api";

const ENQUIRIES_KEY = "md_demo_admin_enquiries";

function saveDemoEnquiry(payload: ContactPayload) {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(ENQUIRIES_KEY);
  const enquiries = stored ? JSON.parse(stored) as Record<string, unknown>[] : [];
  const enquiry = {
    _id: `demo-enquiry-${Date.now()}`,
    ...payload,
    status: "new",
    createdAt: new Date().toISOString()
  };
  window.localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([enquiry, ...enquiries]));
  window.dispatchEvent(new Event("md-content-updated"));
}

export const sendContact = async (payload: ContactPayload) => {
  const result = await requestJson<{ ok: boolean }>("/contact", { ok: false }, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  if (!result.ok) saveDemoEnquiry(payload);
  return result.ok ? result : { ok: true };
};
