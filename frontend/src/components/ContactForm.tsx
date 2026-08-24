import { useState } from "react";
import { sendContact } from "../services/contactApi";
import type { ContactPayload } from "../types/content";
import { Button } from "./Button";

const initial: ContactPayload = { name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validation, setValidation] = useState("");

  const update = (field: keyof ContactPayload, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setValidation("");
    if (!form.name || !form.email || !form.phone || !form.message) {
      setValidation("Please complete name, email, phone and message.");
      return;
    }

    setStatus("loading");
    const result = await sendContact(form);
    if (result.ok) {
      setStatus("success");
      setForm(initial);
    } else {
      setStatus("error");
    }
  }

  const inputClass = "min-h-12 rounded-premium border border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-muted focus:border-orange focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Name" aria-label="Name" />
        <input className={inputClass} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="Email" aria-label="Email" type="email" />
        <input className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Phone" aria-label="Phone" />
        <input className={inputClass} value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company" aria-label="Company" />
        <select className={inputClass} value={form.service} onChange={(event) => update("service", event.target.value)} aria-label="Service">
          <option value="">Service</option>
          <option>Digital Marketing</option>
          <option>SEO</option>
          <option>Social Media</option>
          <option>Web Design</option>
          <option>Video Production</option>
        </select>
        <select className={inputClass} value={form.budget} onChange={(event) => update("budget", event.target.value)} aria-label="Budget">
          <option value="">Budget</option>
          <option>Starter</option>
          <option>Growth</option>
          <option>Premium</option>
        </select>
      </div>
      <textarea className={`${inputClass} min-h-36 py-4`} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Message" aria-label="Message" />
      {validation ? <p className="text-sm font-bold text-orange">{validation}</p> : null}
      {status === "success" ? <p className="text-sm font-bold text-white">Thanks. Your enquiry has been received.</p> : null}
      {status === "error" ? <p className="text-sm font-bold text-orange">We could not send the enquiry right now. Please call or email the team.</p> : null}
      <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send Enquiry"}</Button>
    </form>
  );
}
