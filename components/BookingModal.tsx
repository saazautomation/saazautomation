"use client";

import { FormEvent, useState } from "react";
import { serviceOptions } from "@/lib/data";
import { useBooking } from "@/context/BookingContext";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`SAAZ Strategy Call — ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
    );
    window.location.href = `mailto:support@saazautomation.com?subject=${subject}&body=${body}`;
    setStatus("sent");
    window.setTimeout(() => {
      closeBooking();
      setStatus("idle");
      form.reset();
    }, 800);
  };

  return (
    <div
      id="modal-overlay"
      className={isOpen ? "open" : ""}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBooking();
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <h2 id="modal-title" className="modal-title">
              BOOK A CALL
            </h2>
            <p className="modal-sub">Tell us what you want to automate. We respond within 24 hours.</p>
          </div>
          <button type="button" className="modal-close" onClick={closeBooking} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>
                Name <span className="req">*</span>
              </label>
              <input name="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label>
                Email <span className="req">*</span>
              </label>
              <input name="email" type="email" required placeholder="you@company.com" />
            </div>
          </div>
          <div className="form-grid full">
            <div className="field">
              <label>
                Service <span className="req">*</span>
              </label>
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-grid full">
            <div className="field">
              <label>Project details</label>
              <textarea name="message" placeholder="What should we build?" />
            </div>
          </div>
          <button type="submit" className="btn-r" style={{ width: "100%", marginTop: "0.5rem" }}>
            <span>{status === "sent" ? "OPENING EMAIL…" : "SEND REQUEST"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
