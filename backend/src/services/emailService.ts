import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

type EnquiryEmail = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

export async function sendEnquiryNotification(enquiry: EnquiryEmail) {
  if (!resend) return;

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: "maithildigitals@gmail.com",
    subject: "New Website Enquiry — Maithil Digitals",
    html: `
      <div style="font-family:Arial,sans-serif;color:#111226">
        <h1 style="color:#F06A00">New Website Enquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(enquiry.company ?? "")}</p>
        <p><strong>Service:</strong> ${escapeHtml(enquiry.service ?? "")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(enquiry.budget ?? "")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(enquiry.message).replace(/\n/g, "<br />")}</p>
      </div>
    `
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] ?? char);
}
