"use client";

import { useBooking } from "@/context/BookingContext";

export default function ShowreelSection() {
  const { openBooking } = useBooking();

  return (
    <section id="showreel" className="bundle-section">
      <div className="bundle-stage">
        <p className="bundle-eyebrow">
          <span className="bundle-eyebrow-icon" aria-hidden />
          SAAZ showreel — systems in motion
        </p>
        <div className="bundle-mega-top">
          <h2 className="bundle-mega">
            <span className="bundle-mega-line bundle-mega-line-full">GET THE FULL</span>
          </h2>
        </div>
        <div className="bundle-row">
          <div className="bundle-col-left">
            <h2 className="bundle-mega bundle-mega-stack">
              <span className="bundle-mega-line">AUTOMATION</span>
              <span className="bundle-mega-line">SHOWREEL</span>
            </h2>
            <div className="bundle-mega-stat">
              <span className="bundle-stat-mark">▶</span>
              <span className="bundle-stat-num">2:40</span>
              <span className="bundle-stat-word-text">demo reel</span>
            </div>
          </div>
          <div className="bundle-col-video">
            <video
              className="bundle-video"
              src="/media/saaz-showreel.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/media/demo-vault-preview.png"
            />
          </div>
          <button type="button" className="bundle-col-cta openBooking" onClick={openBooking}>
            <span className="bundle-cta-title">book your build</span>
            <span className="bundle-cta-buy">
              start <span className="bundle-cta-buy-arrow">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
