"use client";

import { FormEvent, useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { serviceOptions } from "@/lib/data";
import Box from "./Box";

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeBooking();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeBooking]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          service: fd.get("service"),
          budget: fd.get("budget"),
          timeline: fd.get("timeline"),
          details: fd.get("details"),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(payload.error || "Failed to send message.");
      }

      setStatus("success");
      form.reset();
      window.setTimeout(() => {
        closeBooking();
      }, 1600);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <Box
      id="modal-overlay"
      className={isOpen ? "open" : ""}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBooking();
      }}
    >
      <Box className="modal">
        <Box className="modal-head">
          <Box>
            <h2 className="modal-title">LET&apos;S WORK TOGETHER</h2>
            <p className="modal-sub">
              Tell us about your project — we&apos;ll get back within 24 hours.
            </p>
          </Box>
          <button type="button" className="modal-close" onClick={closeBooking} aria-label="Close">
            ✕
          </button>
        </Box>
        <form id="bookingForm" onSubmit={handleSubmit}>
          <Box className="form-grid">
            <Box className="field">
              <label>
                Full Name <span className="req">*</span>
              </label>
              <input type="text" name="name" placeholder="John Doe" required />
            </Box>
            <Box className="field">
              <label>
                Email Address <span className="req">*</span>
              </label>
              <input type="email" name="email" placeholder="john@company.com" required />
            </Box>
          </Box>
          <Box className="form-grid full">
            <Box className="field">
              <label>Company (Optional)</label>
              <input type="text" name="company" placeholder="Your Company Name" />
            </Box>
          </Box>
          <Box className="form-grid full">
            <Box className="field">
              <label>
                Service Needed <span className="req">*</span>
              </label>
              <select name="service" required defaultValue="">
                <option value="">Select a service</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
          <Box className="form-grid">
            <Box className="field">
              <label>Budget Range</label>
              <select name="budget" defaultValue="">
                <option value="">Select budget range</option>
                <option>Under $2,000</option>
                <option>$2,000 – $5,000</option>
                <option>$5,000 – $15,000</option>
                <option>$15,000 – $50,000</option>
                <option>$50,000+</option>
              </select>
            </Box>
            <Box className="field">
              <label>Timeline</label>
              <select name="timeline" defaultValue="">
                <option value="">Select timeline</option>
                <option>ASAP (1–2 weeks)</option>
                <option>Within a month</option>
                <option>1–3 months</option>
                <option>3+ months</option>
                <option>Just exploring</option>
              </select>
            </Box>
          </Box>
          <Box className="form-grid full">
            <Box className="field">
              <label>
                Project Details <span className="req">*</span>
              </label>
              <textarea
                name="details"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                required
              />
            </Box>
          </Box>

          {status === "success" && (
            <p className="form-status form-status--success" role="status">
              Message sent — we&apos;ll reply within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="form-status form-status--error" role="alert">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          )}

          <Box className="modal-actions">
            <button type="button" className="btn-cancel" onClick={closeBooking}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
