"use client";

import Image, { type StaticImageData } from "next/image";
import { portfolioCards } from "@/lib/siteExtras";
import { useBooking } from "@/context/BookingContext";

import frame00 from "@/assets/video-frames-0342/frame_00.png";
import frame01 from "@/assets/video-frames-0342/frame_01.png";
import frame02 from "@/assets/video-frames-0342/frame_02.png";
import frame03 from "@/assets/video-frames-0342/frame_03.png";
import frame04 from "@/assets/video-frames-0342/frame_04.png";
import frame05 from "@/assets/video-frames-0342/frame_05.png";
import frame06 from "@/assets/video-frames-0342/frame_06.png";
import frame07 from "@/assets/video-frames-0342/frame_07.png";
import frame08 from "@/assets/video-frames-0342/frame_08.png";
import frame09 from "@/assets/video-frames-0342/frame_09.png";
import frame10 from "@/assets/video-frames-0342/frame_10.png";
import frame11 from "@/assets/video-frames-0342/frame_11.png";
import frame12 from "@/assets/video-frames-0342/frame_12.png";

const frames: StaticImageData[] = [
  frame00,
  frame01,
  frame02,
  frame03,
  frame04,
  frame05,
  frame06,
  frame07,
  frame08,
  frame09,
  frame10,
  frame11,
  frame12,
];

function Ring({ pct }: { pct: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <svg className="portfolio-ring" width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="#fb3640"
        strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

export default function TradingPortfolioSection() {
  const { openBooking } = useBooking();
  const cards = [...portfolioCards, ...portfolioCards];

  return (
    <section id="portfolio" className="portfolio-automation">
      <div className="portfolio-stage portfolio-automation">
        <div className="portfolio-automation-head reveal">
          <h2>Trading bot portfolio</h2>
          <p>Live performance snapshots from production Expert Advisors and hedge systems.</p>
        </div>
        <div className="portfolio-marquee-shell">
          <div className="portfolio-marquee-fade portfolio-marquee-fade--left" aria-hidden />
          <div className="portfolio-marquee-fade portfolio-marquee-fade--right" aria-hidden />
          <div className="portfolio-marquee-viewport">
            <div className="portfolio-marquee-track">
              {cards.map((card, i) => {
                const src = frames[card.frame % frames.length];
                return (
                  <article key={`${card.label}-${i}`} className="portfolio-card">
                    <Image src={src} alt="" fill className="portfolio-card-img" sizes="228px" />
                    <div className="portfolio-card-overlay">
                      <div className="portfolio-card-stat">
                        <Ring pct={Math.min(94, 60 + (card.frame % 5) * 8)} />
                        <div className="portfolio-card-meta">
                          <span className="portfolio-card-label">{card.label}</span>
                          <span className="portfolio-card-value">{card.value}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div className="portfolio-automation-cta-wrap">
          <button type="button" className="portfolio-automation-cta openBooking" onClick={openBooking}>
            Request a custom EA build
          </button>
        </div>
      </div>
    </section>
  );
}
