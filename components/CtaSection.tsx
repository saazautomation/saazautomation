"use client";

import { useBooking } from "@/context/BookingContext";

export default function CtaSection() {
  const { openBooking } = useBooking();

  return (
    <section id="cta" className="reveal">
      <div className="cta-rays" aria-hidden />
      <h2 className="cta-h">
        READY TO
        <br />
        AUTOMATE?
      </h2>
      <div className="cta-bar" />
      <p className="cta-sub">
        Tell us what you want to build — trading systems, AI agents, or full-stack automation. We respond within 24 hours.
      </p>
      <div className="cta-btns">
        <button type="button" className="btn-r openBooking" onClick={openBooking}>
          <span>BOOK STRATEGY CALL</span>
        </button>
        <a href="mailto:support@saazautomation.com" className="btn-o">
          EMAIL US
        </a>
      </div>
    </section>
  );
}
