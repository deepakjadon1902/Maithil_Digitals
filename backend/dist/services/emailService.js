import { Resend } from "resend";
import { env } from "../config/env.js";
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
export async function sendEnquiryNotification(enquiry) {
    if (!resend)
        return;
    await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: "maithildigitals@gmail.com",
        subject: "New Website Enquiry - Maithil Digitals",
        html: `
      <div style="font-family:Arial,sans-serif;color:#111226">
        <h1 style="color:#F06A00">New Website Enquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(enquiry.email ?? "")}</p>
        <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
        <p><strong>Business:</strong> ${escapeHtml(enquiry.businessName ?? enquiry.company ?? "")}</p>
        <p><strong>Business Type:</strong> ${escapeHtml(enquiry.businessType ?? "")}</p>
        <p><strong>Service Required:</strong> ${escapeHtml(enquiry.servicesRequired ?? enquiry.service ?? "")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(enquiry.message).replace(/\n/g, "<br />")}</p>
      </div>
    `
    });
}
function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] ?? char);
}
