"use client";

import { useState } from "react";
import { faqItems, faqMetrics } from "@/lib/siteExtras";
import { useBooking } from "@/context/BookingContext";

export default function FaqSection() {
  const { openBooking } = useBooking();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="faqm-section">
      <div className="faqm-shell">
        <div className="faqm-head reveal">
          <h2>Trading bot FAQ</h2>
          <p>
            Answers for operators evaluating MT5 automation, prop firm compliance, and production deployment.
          </p>
          <button type="button" className="faqm-cta openBooking" onClick={openBooking}>
            Book a strategy call
          </button>
        </div>
        <div className="faqm-grid">
          <div className="faqm-metrics">
            {faqMetrics.map((m) => (
              <div key={m.label} className="faqm-metric-card reveal">
                <p className="faqm-metric-label">{m.label}</p>
                <p className="faqm-metric-value">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="faqm-faq-list">
            {faqItems.map((item, i) => (
              <div key={item.q} className={`faqm-item reveal${openId === i ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="faqm-trigger"
                  onClick={() => setOpenId(openId === i ? null : i)}
                  aria-expanded={openId === i}
                >
                  {item.q}
                  <span className="faqm-plus">{openId === i ? "−" : "+"}</span>
                </button>
                {openId === i && <p className="faqm-answer">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
