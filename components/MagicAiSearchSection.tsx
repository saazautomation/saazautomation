"use client";

import { magicSearchLines } from "@/lib/siteExtras";
import { useBooking } from "@/context/BookingContext";

const lines = [...magicSearchLines, ...magicSearchLines];

export default function MagicAiSearchSection() {
  const { openBooking } = useBooking();

  return (
    <section className="magic-search-section" aria-labelledby="magic-search-title">
      <div className="magic-search-glow magic-search-glow--left" aria-hidden />
      <div className="magic-search-glow magic-search-glow--right" aria-hidden />
      <div className="magic-search-inner">
        <div className="magic-search-head">
          <h2 id="magic-search-title" className="magic-search-title">
            Describe what you want to automate
          </h2>
          <p className="magic-search-subtitle">
            Trading bots, voice agents, workflows, and custom AI — tell us the outcome and we architect the system.
          </p>
          <button type="button" className="magic-search-cta openBooking" onClick={openBooking}>
            Start your build
          </button>
        </div>
        <div
          className="magic-search-stage"
          style={{ ["--magic-item-count" as string]: String(lines.length) }}
        >
          <div className="magic-search-viewport" aria-hidden>
            <div className="magic-search-fade magic-search-fade--top" />
            <ul className="magic-search-track magic-search-track--muted">
              {lines.map((line, i) => (
                <li key={`muted-${i}`} className="magic-search-line">
                  <span className="magic-search-line-text">{line}</span>
                </li>
              ))}
            </ul>
            <div className="magic-search-fade magic-search-fade--bottom" />
          </div>
          <div className="magic-search-bar" role="presentation">
            <span className="magic-search-icon magic-search-icon--add" aria-hidden>
              +
            </span>
            <div className="magic-search-bar-window">
              <ul className="magic-search-track magic-search-track--active">
                {lines.map((line, i) => (
                  <li key={`active-${i}`} className="magic-search-line">
                    <span className="magic-search-line-text">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="magic-search-icon magic-search-icon--submit" aria-hidden>
              →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
