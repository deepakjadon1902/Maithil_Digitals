import type { FormEvent } from "react";
import { useState } from "react";
import { sendContact } from "../services/contactApi";
import type { ContactPayload } from "../types/content";
import { Button } from "./Button";

const services = [
  "Social Media Management",
  "Reels",
  "Photoshoot",
  "Photography",
  "Creative Design",
  "Branding",
  "Digital Advertising",
  "Complete Digital Marketing"
];

const initial: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  servicesRequired: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validation, setValidation] = useState("");

  const update = (field: keyof ContactPayload, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setValidation("");
    if (!form.name || !form.phone || !form.servicesRequired || !form.message) {
      setValidation("Please complete name, phone, service required and message.");
      return;
    }

    setStatus("loading");
    const result = await sendContact({
      ...form,
      company: form.businessName,
      service: form.servicesRequired
    });
    if (result.ok) {
      setStatus("success");
      setForm(initial);
    } else {
      setStatus("error");
    }
  }

  const inputClass = "min-h-12 w-full rounded-premium border border-navy/15 bg-white px-4 text-navy shadow-sm placeholder:text-navy/35 focus:border-orange focus:outline-none";
  const labelClass = "grid gap-2 text-sm font-black text-navy";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
        </label>
        <label className={labelClass}>
          Business Name
          <input className={inputClass} value={form.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Business or brand name" />
        </label>
        <label className={labelClass}>
          Phone Number
          <input className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" />
        </label>
        <label className={labelClass}>
          Email
          <input className={inputClass} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="Email address" type="email" />
        </label>
        <label className={labelClass}>
          Business Type
          <input className={inputClass} value={form.businessType} onChange={(event) => update("businessType", event.target.value)} placeholder="Restaurant, salon, school..." />
        </label>
        <label className={labelClass}>
          Services Required
          <select className={inputClass} value={form.servicesRequired} onChange={(event) => update("servicesRequired", event.target.value)}>
            <option value="">Select service</option>
            {services.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
      </div>
      <label className={labelClass}>
        Message
        <textarea className={`${inputClass} min-h-36 py-4`} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us what you want to build or improve." />
      </label>
      {validation ? <p className="text-sm font-bold text-orange">{validation}</p> : null}
      {status === "success" ? <p className="text-sm font-bold text-navy">Thanks. Your enquiry has been received.</p> : null}
      {status === "error" ? <p className="text-sm font-bold text-orange">We could not send the enquiry right now. Please call or WhatsApp the team.</p> : null}
      <Button className="w-full sm:w-fit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send Enquiry"}</Button>
    </form>
  );
}
