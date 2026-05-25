"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookingProvider, useBooking } from "@/context/BookingContext";
import RealEstateNav from "./RealEstateNav";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";
import BookingModal from "./BookingModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSmoothAnchorLinks } from "@/hooks/useSmoothAnchorLinks";
import Reveal from "@/components/motion/Reveal";

/** Replace with your agency demo file in /public (e.g. /videos/ai-systems-demo.mp4) */
const RE_DEMO_VIDEO_SRC = "/media/saaz-showreel.mp4";

const RE_IMAGES = {
  featureCards: "/images/real-estate/feature-cards.png",
  mapAgents: "/images/real-estate/map-agents.png",
  supportCalls: "/images/real-estate/support-calls.png",
  integrationsHub: "/images/real-estate/integrations-hub.png",
  worldMap: "/images/real-estate/world-map.png",
  globeActive: "/images/real-estate/globe-active.png",
} as const;

const waveBars = Array.from({ length: 60 }, (_, i) => {
  const heights = [0.2, 0.4, 0.7, 1, 0.85, 0.6, 0.35, 0.55, 0.9, 0.75];
  const h = heights[i % heights.length];
  return { height: `${Math.round(h * 120 + 16)}px`, delay: `${((i * 0.04) % 1.8).toFixed(2)}s` };
});

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { openBooking } = useBooking();
  return (
    <motion.button
      type="button"
      className={`re-cta-btn ${className}`}
      onClick={openBooking}
      whileHover={{ y: -3, boxShadow: "0 16px 40px var(--red-glow)" }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

function ReSectionVisual({
  src,
  alt,
  className = "",
  priority = false,
  theme = "dark",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  theme?: "dark" | "light";
}) {
  return (
    <motion.div
      className={`re-visual re-visual--${theme} ${className}`.trim()}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {theme === "dark" && <div className="re-visual-glow" aria-hidden />}
      <div className={theme === "light" ? "re-visual-light-frame" : undefined}>
        <Image
          src={src}
          alt={alt}
          width={960}
          height={1024}
          className="re-visual-img"
          sizes="(max-width: 900px) 92vw, 480px"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`re-section-head ${center ? "" : "re-section-head--left"}`}>
      {eyebrow && <p className="re-eyebrow">{eyebrow}</p>}
      <h2 className="re-h2">{title}</h2>
      {subtitle && <p className="re-lead">{subtitle}</p>}
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function ReHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  return (
    <section id="re-hero" className="re-hero va-hero" ref={sectionRef}>
      <div className="va-hero-grid" />
      <motion.div
        className="orb"
        style={{ width: 600, height: 600, top: -150, right: -150, background: "rgba(251,54,64,.08)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="va-waveform" aria-hidden>
        {waveBars.map((bar, i) => (
          <div key={i} className="va-wave-bar" style={{ height: bar.height, animationDelay: bar.delay }} />
        ))}
      </div>

      <motion.div className="re-hero-inner" style={{ y, opacity }}>
        <motion.div
          className="va-hero-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="va-badge-dot" />
          AI Systems Platform for Modern Teams
        </motion.div>

        <motion.h1
          className="va-hero-h re-hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
        >
          <span className="line-1">LAUNCH YOUR</span>
          <span className="line-2">AI CALLING</span>
          <span className="line-3">PLATFORM</span>
        </motion.h1>

        <p className="re-hero-tagline">Built for AI Automation and Voice Workflows</p>
        <p className="re-hero-gci">Capture More Revenue, Eliminate Bottlenecks, and Add $10K–$50K+ in Annual Profit</p>
        <p className="re-hero-sub">
          Let AI handle follow-ups, qualify opportunities, and book calls 24/7 while your team focuses on execution.
        </p>
        <p className="re-hero-social">Join 1,200+ teams already scaling faster with AI voice systems and custom automation.</p>

        <div className="re-pricing-pill">
          <span className="re-price-old">$97</span>
          <span className="re-price-new">$29<span>/mo</span></span>
        </div>

        <CtaButton>Claim Your Access →</CtaButton>
      </motion.div>
    </section>
  );
}

/* ─── VIDEO (below hero) ─────────────────────────────────────── */
function ReVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  const applyVolume = useCallback((v: number) => {
    const el = videoRef.current;
    const next = Math.min(1, Math.max(0, v));
    setVolume(next);
    if (el) {
      el.volume = next;
      if (next > 0) {
        el.muted = false;
        setMuted(false);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  }, []);

  const bumpVolume = useCallback(
    (delta: number) => applyVolume(volume + delta),
    [applyVolume, volume],
  );

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3200);
    }
  }, [playing]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [volume]);

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const volumePct = Math.round(volume * 100);

  return (
    <section
      id="re-video"
      className="re-video-section"
      ref={sectionRef}
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
    >
      <div className="re-video-bg-grid" aria-hidden />
      <div className="re-video-bg-orb re-video-bg-orb--1" aria-hidden />
      <div className="re-video-bg-orb re-video-bg-orb--2" aria-hidden />
      <div className="re-video-bars-wrap" aria-hidden>
        <div className="re-video-bar re-video-bar-1" />
        <div className="re-video-bar re-video-bar-2" />
        <div className="re-video-bar re-video-bar-3" />
      </div>
      <div className="re-video-glow-left" aria-hidden />
      <div className="re-video-glow-right" aria-hidden />

      <div className="re-video-inner">

        <motion.div className="re-video-stage" style={{ scale, opacity }}>
          <div className="re-video-frame">
            <div className="re-video-chrome">
              <div className="re-video-dots">
                <span /><span /><span />
              </div>
              <div className="re-video-url">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="1" y="6" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                app.saazautomation.com/real-estate-demo
              </div>
              <span className="re-video-live">
                <span className="va-vid-db-live-dot" />
                Live Demo
              </span>
            </div>

            <div
              className={`re-video-player ${playing ? "is-playing" : ""}`}
              onClick={togglePlay}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={playing ? "Pause video" : "Play video"}
            >
              <video
                ref={videoRef}
                className="re-video-el"
                src={RE_DEMO_VIDEO_SRC}
                playsInline
                preload="metadata"
              />

              {!playing && (
                <div className="re-video-play-overlay" aria-hidden>
                  <motion.button
                    type="button"
                    className="re-video-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label="Play video"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </motion.button>
                </div>
              )}

              <div
                className={`re-video-controls ${showControls || !playing ? "is-visible" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="re-video-ctrl"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  )}
                </button>

                <div className="re-video-volume">
                  <button
                    type="button"
                    className="re-video-ctrl"
                    onClick={() => bumpVolume(-0.1)}
                    aria-label="Volume down"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="16" y1="9" x2="20" y2="15" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="re-video-ctrl re-video-ctrl--mute"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted || volume === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    className="re-video-ctrl"
                    onClick={() => bumpVolume(0.1)}
                    aria-label="Volume up"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  </button>

                  <input
                    type="range"
                    className="re-video-slider"
                    min={0}
                    max={100}
                    value={muted ? 0 : volumePct}
                    onChange={(e) => applyVolume(Number(e.target.value) / 100)}
                    aria-label="Volume"
                  />
                  <span className="re-video-vol-label">{muted ? "Muted" : `${volumePct}%`}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5-STEP PROCESS ─────────────────────────────────────────── */
const steps5 = [
  { num: "1", title: "Activate Your AI Systems Hub", desc: "Get instant access to your complete automation and voice operations dashboard", visual: "activate" as const },
  { num: "2", title: "Train It On Your Workflows & SOPs", desc: "Upload your SOPs, offers, FAQs, and scripts in under 10 minutes", visual: "train" as const },
  { num: "3", title: "Connect Your Business Stack", desc: "Sync ads, forms, CRM, support inboxes, and internal tools automatically", visual: "connect" as const },
  { num: "4", title: "Launch Automated Workflows & Calls", desc: "AI responds to every new lead within 60 seconds and books calls on your calendar", visual: "launch" as const },
  { num: "5", title: "Scale Operations on Autopilot", desc: "Watch your pipeline grow while AI runs the tasks your team never had time to finish", visual: "close" as const },
];

const launchTags = [
  "Instant Dashboard",
  "10-Min Setup",
  "CRM + API Sync",
  "60-Sec Callbacks",
  "Calendar Sync",
  "No Coding Required",
  "24/7 Autopilot",
  "Custom Integrations",
];

function LaunchStepVisual({ variant }: { variant: (typeof steps5)[number]["visual"] }) {
  if (variant === "activate") {
    return (
      <motion.div className="re-launch-visual re-launch-visual--graph" aria-hidden>
        <svg viewBox="0 0 200 100" fill="none" className="re-launch-svg">
          <defs>
            <linearGradient id="reLaunchGrad1" x1="0" y1="0" x2="200" y2="0">
              <stop offset="0%" stopColor="#fb3640" stopOpacity="0" />
              <stop offset="50%" stopColor="#fb3640" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff5a63" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M10 75 Q50 70 80 55 T130 40 T190 15" stroke="url(#reLaunchGrad1)" strokeWidth="2" fill="none" />
          <circle cx="130" cy="40" r="6" fill="#fb3640" opacity="0.9" />
          <circle cx="130" cy="40" r="14" fill="#fb3640" opacity="0.15" />
          <circle cx="130" cy="40" r="22" fill="#fb3640" opacity="0.06" />
        </svg>
      </motion.div>
    );
  }

  if (variant === "train") {
    return (
      <motion.div className="re-launch-visual re-launch-visual--bars" aria-hidden>
        <div className="re-launch-bars">
          {[38, 62, 48, 78, 55, 88, 42].map((h, i) => (
            <div
              key={i}
              className="re-launch-bar"
              style={{
                height: `${h}%`,
                opacity: 0.35 + (i % 3) * 0.2,
                background: i % 2 === 0
                  ? "linear-gradient(180deg, #fb3640 0%, #ff5a63 100%)"
                  : "linear-gradient(180deg, #ff5a63 0%, rgba(251, 54, 64, 0.55) 100%)",
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (variant === "connect") {
    return (
      <motion.div className="re-launch-visual re-launch-visual--pills" aria-hidden>
        <div className="re-launch-pill re-launch-pill--1">
          <span className="re-launch-pill-dot" />
          New lead synced
        </div>
        <motion.div className="re-launch-pill re-launch-pill--2">
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path d="M8 1l1.5 4.5H14l-3.7 2.7 1.4 4.3L8 10l-3.7 2.5 1.4-4.3L2 5.5h4.5z" />
          </svg>
          CRM connected
        </motion.div>
        <motion.div
          className="re-launch-bolt"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === "launch") {
    return (
      <motion.div className="re-launch-visual re-launch-visual--apps" aria-hidden>
        <div className="re-launch-app re-launch-app--z">Z</div>
        <div className="re-launch-app re-launch-app--phone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </div>
        <div className="re-launch-app re-launch-app--cal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
        <div className="re-launch-app re-launch-app--crm">CRM</div>
      </motion.div>
    );
  }

  return (
    <motion.div className="re-launch-visual re-launch-visual--avatars" aria-hidden>
      {[
        { initials: "JR", ring: "#fb3640" },
        { initials: "DM", ring: "#fbbf24" },
        { initials: "SP", ring: "#ff5a63" },
        { initials: "BT", ring: "rgba(251, 54, 64, 0.75)" },
      ].map((a, i) => (
        <div
          key={a.initials}
          className="re-launch-avatar"
          style={{ borderColor: a.ring, zIndex: 4 - i, marginLeft: i > 0 ? -12 : 0 }}
        >
          {a.initials}
        </div>
      ))}
      <div className="re-launch-growth">
        <svg viewBox="0 0 80 40" fill="none">
          <path d="M5 35 L25 28 L45 18 L75 5" stroke="#fb3640" strokeWidth="2" />
          <circle cx="75" cy="5" r="4" fill="#fb3640" />
        </svg>
      </div>
    </motion.div>
  );
}

function ReFiveSteps() {
  return (
    <section id="re-process" className="re-section re-section-launch">
      <div className="container">
        <SectionHead
          eyebrow="⚡ Simple 5-Step Process"
          title={<>How to Launch Your AI Automation System Fast</>}
          subtitle="From setup to live workflows in less than 72 hours with no coding and no technical overhead"
        />
        <div className="re-launch-bento">
          {steps5.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <motion.article
                className={`re-launch-card ${i >= 3 ? "re-launch-card--wide" : ""}`}
                whileHover={{ y: -4, borderColor: "rgba(251, 54, 64, 0.35)" }}
                transition={{ duration: 0.25 }}
              >
                <span className="re-launch-step-num" aria-hidden>{s.num}</span>
                <LaunchStepVisual variant={s.visual} />
                <div className="re-launch-card-body">
                  <h3 className="re-launch-card-title">{s.title}</h3>
                  <p className="re-launch-card-desc">{s.desc}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="re-launch-tags">
            {launchTags.map((tag) => (
              <span key={tag} className="re-launch-tag">{tag}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── SAVINGS CALCULATOR ─────────────────────────────────────── */
const SAAZ_BASE_MONTHLY = 29;
const SAAZ_PER_LEAD = 0.48;

function CalcSlider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="re-calc-row">
      <div className="re-calc-row-head">
        <label htmlFor={id} className="re-calc-label">{label}</label>
        <motion.div
          className="re-calc-value"
          key={display}
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {display}
        </motion.div>
      </div>
      <input
        id={id}
        className="re-calc-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function ReSavingsCalculator() {
  const { openBooking } = useBooking();
  const [monthlyLeads, setMonthlyLeads] = useState(120);
  const [peopleInvolved, setPeopleInvolved] = useState(2);
  const [hoursPerLead, setHoursPerLead] = useState(0.5);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [qaHours, setQaHours] = useState(12);

  const humanCostPerMonth = peopleInvolved * ((monthlyLeads * hoursPerLead + qaHours) * hourlyRate);
  const saazVoiceMonthly = SAAZ_BASE_MONTHLY + monthlyLeads * SAAZ_PER_LEAD;
  const savingsPerMonth = Math.max(0, humanCostPerMonth - saazVoiceMonthly);
  const savingsPerYear = savingsPerMonth * 12;
  const savingsPct = humanCostPerMonth > 0 ? (savingsPerMonth / humanCostPerMonth) * 100 : 0;

  const currency = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="re-savings-calc" className="re-section re-section-calc">
      <div className="container">
        <SectionHead
          eyebrow="💸 Cost Reality Check"
          title={<>The Hidden Cost of <span className="re-calc-accent">Manual Follow-Ups</span></>}
          subtitle="Calculate what human lead calling is really costing your business — then compare it to Saaz Voice."
        />

        <Reveal>
          <div className="re-calc-card">
            <div className="re-calc-card-badge">
              <span aria-hidden>💀</span> The Truth Hurts
            </div>

            <div className="re-calc-inputs">
              <CalcSlider
                id="re-leads"
                label="Monthly Leads"
                value={monthlyLeads}
                display={String(monthlyLeads)}
                min={20}
                max={1000}
                step={10}
                onChange={setMonthlyLeads}
              />
              <CalcSlider
                id="re-people"
                label="People Involved"
                value={peopleInvolved}
                display={String(peopleInvolved)}
                min={1}
                max={8}
                step={1}
                onChange={setPeopleInvolved}
              />
              <CalcSlider
                id="re-hours"
                label="Hours per Lead"
                value={hoursPerLead}
                display={hoursPerLead.toFixed(1)}
                min={0.2}
                max={2}
                step={0.1}
                onChange={setHoursPerLead}
              />
              <CalcSlider
                id="re-rate"
                label="Hourly Rate"
                value={hourlyRate}
                display={`$${hourlyRate}`}
                min={15}
                max={120}
                step={5}
                onChange={setHourlyRate}
              />
              <CalcSlider
                id="re-qa"
                label="QA & Review Hours / Month"
                value={qaHours}
                display={String(qaHours)}
                min={0}
                max={80}
                step={1}
                onChange={setQaHours}
              />
            </div>

            <div className="re-calc-compare">
              <div className="re-calc-compare-item re-calc-compare-item--human">
                <span className="re-calc-compare-label">Human Staff</span>
                <span className="re-calc-compare-amount">{currency(humanCostPerMonth)}</span>
                <span className="re-calc-compare-period">/ month</span>
              </div>
              <div className="re-calc-compare-vs" aria-hidden>vs</div>
              <div className="re-calc-compare-item re-calc-compare-item--saaz">
                <span className="re-calc-compare-label">Saaz Voice System</span>
                <span className="re-calc-compare-amount">{currency(saazVoiceMonthly)}</span>
                <span className="re-calc-compare-period">/ month</span>
              </div>
            </div>

            <div className="re-calc-result">
              <div className="re-calc-result-icon" aria-hidden>💸</div>
              <div className="re-calc-result-label">Your Estimated Monthly Savings</div>
              <motion.div
                className="re-calc-result-main"
                key={savingsPerMonth}
                initial={{ opacity: 0.6, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {currency(savingsPerMonth)}
              </motion.div>
              <p className="re-calc-result-sub">
                That&apos;s <strong>{currency(savingsPerYear)}</strong> saved per year —{" "}
                <strong>{savingsPct.toFixed(0)}% lower</strong> than manual staffing.
              </p>
              <motion.button
                type="button"
                className="re-calc-cta"
                onClick={openBooking}
                whileHover={{ y: -2, boxShadow: "0 12px 32px var(--red-glow)" }}
                whileTap={{ scale: 0.98 }}
              >
                See How Saaz Voice Saves You {Math.min(99, Math.round(savingsPct))}%
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── STOP LOSING DEALS (trust + testimonial + stats bento) ─── */
const reTrustLogos = [
  { name: "RE/MAX", short: "R" },
  { name: "Keller Williams", short: "KW" },
  { name: "Coldwell Banker", short: "CB" },
  { name: "Compass", short: "C" },
  { name: "eXp Realty", short: "eX" },
  { name: "Century 21", short: "21" },
  { name: "Sotheby's", short: "S" },
  { name: "Pinnacle Realty", short: "PR" },
];

function ReIconPhone() {
  return (
    <svg className="re-problem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6.5 3h3l1.5 5-2 1.2a11 11 0 0 0 5.3 5.3L17.5 13l5 1.5v3A2.5 2.5 0 0 1 20 20C10.6 20 4 13.4 4 4a2.5 2.5 0 0 1 2.5-1z" strokeLinejoin="round" />
    </svg>
  );
}

function ReIconCalendar() {
  return (
    <svg className="re-problem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function ReIconBuilding() {
  return (
    <svg className="re-problem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6" />
      <path d="M9 12h1M14 12h1M9 16h1M14 16h1" />
    </svg>
  );
}

function ReIconLeads() {
  return (
    <svg className="re-problem-svg re-problem-svg--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M8 6l-4 4 4 4M16 18l4-4-4-4" />
    </svg>
  );
}

function ReIconSparkle() {
  return (
    <svg className="re-problem-svg re-problem-svg--sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4L12 2zm0 10l1.2 3.8L17 17l-3.8 1.2L12 22l-1.2-3.8L7 17l3.8-1.2L12 12z" />
    </svg>
  );
}

const problemBentoSmallCards = [
  {
    variant: "light" as const,
    icon: <ReIconCalendar />,
    metric: "18K+",
    title: "Qualified Calls Booked",
    desc: "via AI voice systems",
    decor: true,
  },
  {
    variant: "accent" as const,
    icon: <ReIconBuilding />,
    metric: "2,400+",
    title: "Global Businesses",
    desc: "running on our systems",
  },
  {
    variant: "split-light" as const,
    label: "WORKFLOWS EXECUTED",
    metric: "890K+",
    desc: "per month",
    sideIcon: <ReIconLeads />,
  },
  {
    variant: "split-dark" as const,
    label: "REVENUE EVENTS AUTOMATED",
    metric: "6,500+",
    desc: "and growing",
    sideIcon: <ReIconSparkle />,
  },
];

function ReProblem() {
  return (
    <section id="re-problem" className="re-section re-section-problem" aria-labelledby="re-problem-heading">
      <div className="container">
        <h2 id="re-problem-heading" className="sr-only">
          Scale Faster — Social Proof &amp; Platform Stats
        </h2> 

        <Reveal delay={0.08}>
          <figure className="re-problem-testimonial">
            <span className="re-problem-quote-mark" aria-hidden>&ldquo;</span>
            <blockquote className="re-problem-quote">
              By handing repetitive operations to AI, we stopped dropping opportunities and finally scaled
              campaigns, support, and sales without hiring another operations team.
            </blockquote>
            <figcaption className="re-problem-attribution">
              <span className="re-problem-avatar" aria-hidden>
                M
              </span>
              <span className="re-problem-author">
                <strong>Marcus T.</strong>
                <span>Operations Lead, Pinnacle Growth Group</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="re-problem-bento">
          <Reveal className="re-problem-bento-hero">
            <motion.article
              className="re-problem-card re-problem-card--hero"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <span className="re-problem-card-icon" aria-hidden>
                <ReIconPhone />
              </span>
              <div className="re-problem-card-metric">340K+</div>
              <h3 className="re-problem-card-title">Automation Actions Completed</h3>
              <p className="re-problem-card-desc">by AI agents on the platform</p>
            </motion.article>
          </Reveal>

          <div className="re-problem-bento-right">
            {problemBentoSmallCards.map((card, i) => (
              <Reveal
                key={"label" in card && card.label ? card.label : card.title}
                delay={0.08 + i * 0.06}
                className="re-problem-bento-item"
              >
                <motion.article
                  className={`re-problem-card re-problem-card--${card.variant}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {"label" in card && card.label ? (
                    <div className="re-problem-card-split">
                      <div className="re-problem-card-split-body">
                        <p className="re-problem-card-label">{card.label}</p>
                        <div className="re-problem-card-metric">{card.metric}</div>
                        <p className="re-problem-card-desc">{card.desc}</p>
                      </div>
                      <span className="re-problem-card-side-icon" aria-hidden>
                        {card.sideIcon}
                      </span>
                    </div>
                  ) : (
                    <>
                      {card.decor && <span className="re-problem-card-decor" aria-hidden />}
                      <span className="re-problem-card-icon" aria-hidden>
                        {card.icon}
                      </span>
                      <div className="re-problem-card-metric">{card.metric}</div>
                      <h3 className="re-problem-card-title">{card.title}</h3>
                      <p className="re-problem-card-desc">{card.desc}</p>
                    </>
                  )}
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── SUCCESS STORY ──────────────────────────────────────────── */
function ReSuccessStory() {
  return (
    <section id="re-story" className="re-section re-section-alt">
      <div className="container">
        <SectionHead
          eyebrow="🏆 Success Story"
          title={<>From Manual Operations to Automated Scale in 60 Days</>}
        />
        <Reveal>
          <div className="re-story-card">
            <div className="re-story-profile">
              <span className="re-story-chip">Client Feedback</span>
              <div className="re-story-av">M</div>
              <div className="re-story-name">Marcus T.</div>
              <div className="re-story-loc">📍 Houston, TX</div>
              <div className="re-story-metrics">
                <div className="re-story-metric">
                  <strong>Revenue Added</strong>
                  <span>$68,000+</span>
                </div>
                <div className="re-story-metric">
                  <strong>Time to Results</strong>
                  <span>60 Days</span>
                </div>
                <div className="re-story-metric">
                  <strong>Opportunities Converted</strong>
                  <span>340+</span>
                </div>
              </div>
            </div>
            <div className="re-story-body">
              <p className="re-story-kicker">From manual follow-up to an AI-powered growth engine.</p>
              <p>
                Marcus was spending 4 hours a day on repetitive outreach and admin handoffs. Half of inbound
                opportunities stalled. After launching voice AI and workflow automations, every lead gets a
                response in under a minute day or night.
              </p>
              <div className="re-story-feedback">
                <div className="re-story-rating" aria-hidden>★★★★★</div>
                <blockquote className="re-story-quote">
                  &ldquo;We recovered opportunities we used to lose every week. The AI handled a late-night inbound
                  call, qualified the lead, and booked a strategy session before competitors replied.&rdquo;
                </blockquote>
                <div className="re-story-proof">
                  <span className="re-story-proof-pill">4 extra clients closed</span>
                  <span className="re-story-proof-pill">sub-60 sec follow-up</span>
                  <span className="re-story-proof-pill">24/7 opportunity conversion</span>
                </div>
              </div>
              <CtaButton>Start Your Success Story →</CtaButton>
            </div>
          </div>
        </Reveal>

        <ReWorldwideCoverage />
      </div>
    </section>
  );
}

/* ─── GLOBAL COVERAGE ──────────────────────────────────────────── */
const worldwideBadges = [
  { text: "29+ languages supported" },
  { text: "Instant AI responses worldwide" },
  { text: "Calendar sync in every timezone" },
];

const worldwidePills = [
  "340K+ AI actions completed",
  "18K+ strategy calls booked",
  "890K+ inquiries handled monthly",
];

function ReWorldwideCoverage() {
  return (
    <Reveal delay={0.15}>
      <div className="re-worldwide">
        <div className="re-worldwide-glow re-worldwide-glow--1" aria-hidden />
        <div className="re-worldwide-glow re-worldwide-glow--2" aria-hidden />

        <div className="re-worldwide-strip">
          <span className="re-worldwide-strip-badge">NEW</span>
          <span>Global Coverage for AI Automation Teams</span>
          <span className="re-worldwide-strip-dot">•</span>
          <span>29+ languages built into every plan</span>
        </div>

        <h2 className="re-worldwide-h">
          <span className="re-worldwide-h-line">Your AI agent works worldwide.</span>
          <span className="re-worldwide-h-accent">Start scaling more systems, faster.</span>
        </h2>

        <p className="re-worldwide-lead">
          AI-powered follow-up from first inquiry to booked call in{" "}
          <span className="re-worldwide-pill">minutes</span>. Serve clients across every market
          with localized scripts, instant callbacks, and timezone-aware scheduling.
        </p>

        <div className="re-worldwide-pills">
          {worldwidePills.map((pill) => (
            <span key={pill} className="re-worldwide-pill-chip">
              {pill}
            </span>
          ))}
        </div>

        <div className="re-worldwide-badges">
          {worldwideBadges.map((b) => (
            <span key={b.text} className="re-worldwide-badge">
              {b.text}
            </span>
          ))}
        </div>

        <div className="re-worldwide-cta">
          <CtaButton>Activate Global Coverage →</CtaButton>
          <a href="#re-video" className="re-worldwide-ghost-btn">
            See How It Works
          </a>
        </div>

        <div className="re-worldwide-preview">
          <div className="re-worldwide-preview-frame">
            <Image
              src={RE_IMAGES.worldMap}
              alt="AI workspace showing global lead response and follow-up automation"
              width={1024}
              height={870}
              className="re-worldwide-preview-img"
              sizes="(max-width: 900px) 92vw, 720px"
            />

            <motion.div
              className="re-worldwide-float re-worldwide-float--active"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="re-worldwide-float-dot" aria-hidden>●</span>
              AI System Active in 29+ Languages
            </motion.div>

            <motion.div
              className="re-worldwide-float re-worldwide-float--lang"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="re-worldwide-float-dot re-worldwide-float-dot--red" aria-hidden>◆</span>
              Strategy call booked: 12:30 PM
            </motion.div>

            <motion.div
              className="re-worldwide-float re-worldwide-float--notify"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="re-worldwide-notify-icon" aria-hidden>☎</span>
              <span className="re-worldwide-notify-count">3</span>
            </motion.div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── AGENT RESULTS ──────────────────────────────────────────── */
const agentResults = [
  { gci: "$18,400", initials: "JR", name: "Jennifer R.", loc: "Florida", quote: "Our ad leads used to go cold before anyone replied. Now AI responds instantly and books the right discovery call for my team.", days: "44 days" },
  { gci: "$24,700", initials: "DM", name: "David M.", loc: "California", quote: "I was spending 3 hours a day on follow-up and admin. Now I spend 20 minutes reviewing booked calls and exceptions. Game changer.", days: "52 days" },
  { gci: "$31,200", initials: "SP", name: "Samantha P.", loc: "Texas", quote: "The AI qualifies prospects before I even join the call. I only spend time with people who are actually ready to move.", days: "67 days" },
  { gci: "$14,900", initials: "RK", name: "Ryan K.", loc: "New York", quote: "Our client follow-up used to fall apart every quarter. Now AI keeps every account warm automatically and nudges the next action.", days: "38 days" },
  { gci: "$22,100", initials: "AL", name: "Amanda L.", loc: "Arizona", quote: "I run a lean team. Having an AI system is like adding full-time ops support without the extra payroll overhead.", days: "59 days" },
  { gci: "$41,500", initials: "BT", name: "Brian T.", loc: "Georgia", quote: "We fed old inbound lists into the workflow. The AI revived opportunities we had written off and turned them into active calls.", days: "81 days" },
  { gci: "$11,300", initials: "NK", name: "Natalie K.", loc: "Colorado", quote: "Post-event follow-up used to take all Monday morning. AI handled every attendee by Sunday night with personalized outreach.", days: "29 days" },
  { gci: "$16,700", initials: "CM", name: "Carlos M.", loc: "Nevada", quote: "The prebuilt AI scripts are incredible. We now book 2-3 qualified strategy calls a week on near autopilot.", days: "55 days" },
  { gci: "$9,800", initials: "TR", name: "Tanya R.", loc: "Ohio", quote: "As a founder, I cannot answer every call. AI handles everything until I am available. Zero missed opportunities.", days: "33 days" },
  { gci: "$12,600", initials: "JH", name: "James H.", loc: "North Carolina", quote: "Our old SDR process was expensive and inconsistent. The AI now handles 10x outreach volume for a fraction of the cost.", days: "47 days" },
];

function ReAgentResults() {
  return (
    <section id="re-results" className="re-section">
      <div className="container">
        <SectionHead
          eyebrow="⭐ Real Client Results"
          title={<>Teams Scaling Revenue with AI in Under 60 Days</>}
        />
        <div className="re-results-grid">
          {agentResults.map((a, i) => (
            <Reveal key={a.initials} delay={(i % 4) * 0.05}>
              <div className="re-result-card">
                <div className="re-result-gci">{a.gci} Revenue Added</div>
                <div className="re-result-agent">
                  <span className="re-result-av">{a.initials}</span>
                  <div>
                    <div className="re-result-name">{a.name}</div>
                    <div className="re-result-loc">📍 {a.loc}</div>
                  </div>
                </div>
                <p className="re-result-quote">&ldquo;{a.quote}&rdquo;</p>
                <div className="re-result-days">Achieved in {a.days}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOLLOW-UP ENGINE ─────────────────────────────────────────── */
function ReFollowUpEngine() {
  return (
    <section id="re-followup" className="re-section re-section-alt">
      <div className="container">
        <SectionHead
          eyebrow="💰 Automated Growth Follow-Up Engine"
          title={<>Set It Once. Book Qualified Calls Forever.</>}
          subtitle="Every lead that hits your pipeline gets an instant AI response and automatic follow-ups until they are ready to buy, onboard, or upgrade."
        />
        <div className="re-split re-split--followup">
          <div className="re-followup-visual-shell">
            <ReSectionVisual
              src={RE_IMAGES.supportCalls}
              alt="Live support call dashboard showing in-progress and completed business leads"
              className="re-visual--calls re-visual--calls-premium"
            />
            <div className="re-followup-visual-badge re-followup-visual-badge--speed">
              <strong>&lt;60s</strong>
              <span>First call response</span>
            </div>
            <div className="re-followup-visual-badge re-followup-visual-badge--booked">
              <strong>7-8</strong>
              <span>Booked calls / month</span>
            </div>
          </div>
          <div className="re-split-content">
            <Reveal>
              <div className="re-calc-box" style={{ margin: 0 }}>
                <div className="re-calc-label">Your Monthly Pipeline Calculator</div>
                <div className="re-calc-equation" aria-label="50 leads per month times 15 percent conversion equals 7 to 8 booked calls automatically">
                  <span>50 leads/month</span>
                  <span className="re-calc-op">×</span>
                  <span>15% conversion</span>
                  <span className="re-calc-op">=</span>
                  <span className="re-calc-result">7-8 booked calls</span>
                </div>
                <p className="re-calc-formula">automatically, without missing speed-to-lead windows</p>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.08}>
          <div className="re-followup-feedback">
            <span className="re-followup-feedback-label">Client Feedback</span>
            <blockquote>
              &ldquo;The AI handled a late-night inbound lead on Sunday and booked a strategy call before competitors could
              even reply the next morning.&rdquo;
            </blockquote>
            <p>Marcus T. — Operations Lead, Pinnacle Growth Group</p>
          </div>
        </Reveal>

        <div className="re-feature-grid re-followup-cards" style={{ marginTop: "2rem" }}>
          {[
            {
              icon: "📞",
              plan: "Core Flow 01",
              title: "Instant Lead Response",
              sub: "Speed-to-lead in under 60 seconds — every time",
              points: [
                "Call every new lead the moment they come in",
                "Works at 2am, weekends, and holidays",
                "Handles paid ads, web forms, referrals, and inbound leads",
                "Never let a hot lead cool down again",
              ],
            },
            {
              icon: "🔄",
              plan: "Best Value",
              featured: true,
              title: "Long-Term Lead Nurture",
              sub: "Resurface cold leads automatically for months",
              points: [
                "AI follows up every 3, 7, 14, 30 days",
                "Personalizes messages based on lead responses",
                "Flags hot leads and alerts you instantly",
                "Revive dormant pipelines and recover hidden revenue",
              ],
            },
            {
              icon: "📅",
              plan: "Core Flow 03",
              title: "Call & Appointment Booking",
              sub: "AI books directly into your calendar",
              points: [
                "Syncs with Google Calendar and Outlook",
                "Confirms and reminds prospects automatically",
                "Reschedule handling without lifting a finger",
                "94% show-up rate with AI confirmations",
              ],
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className={`re-feature-card re-followup-card${f.featured ? " is-featured" : ""}`}>
                <div className="re-followup-card-head">
                  <span className="re-followup-card-plan">{f.plan}</span>
                  {f.featured && <span className="re-followup-card-badge">Most Automated</span>}
                </div>
                <span className="re-followup-card-icon" aria-hidden>{f.icon}</span>
                <h3 className="re-followup-card-title">{f.title}</h3>
                <p className="re-feature-sub">{f.sub}</p>
                <ul>
                  {f.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WORKFORCE ────────────────────────────────────────────────── */
function ReWorkforce() {
  const { openBooking } = useBooking();
  return (
    <section id="re-workforce" className="re-section re-section-workforce">
      <div className="container">
        <SectionHead
          eyebrow="🤖 Your AI Automation Workforce"
          title={<>The System That Never Sleeps, Never Quits, Never Misses Demand</>}
          subtitle="A professional AI stack that handles outbound follow-up, inbound requests, and booking at scale."
        />
        <div className="re-workforce-stats">
          {[
            { n: "15%", l: "Booking Rate on Cold Inbound Calls" },
            { n: "24/7", l: "Always Available" },
            { n: "$0.10", l: "Per Minute Cost" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="re-wf-stat">
                <div className="re-wf-stat-n">{s.n}</div>
                <div className="re-wf-stat-l">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="re-split re-split--workforce">
          <ReSectionVisual
            src={RE_IMAGES.worldMap}
            alt="World map showing AI voice systems active in 29+ languages across global markets"
            className="re-visual--map"
          />
          <div className="re-split-content re-globe-caption">
            <p className="re-eyebrow">Always On, Everywhere</p>
            <h3 className="re-wf-coverage-title">Never miss demand in any time zone</h3>
            <p className="re-wf-coverage-copy">
              Your AI answers, qualifies, and books across North America and beyond. Multilingual support
              and 24/7 coverage ensure prospects always reach a live conversation.
            </p>
          </div>
        </div>
        <div className="re-wf-split">
          <Reveal>
            <div className="re-wf-card">
              <div className="re-wf-card-head">
                <h3>Outbound Lead Conversion Engine</h3>
                <p className="re-wf-tagline">Activate every lead in your CRM with consistent follow-up.</p>
              </div>
              <ul>
                <li><strong>10,000 calls in 60 minutes</strong> — engage your entire lead database fast</li>
                <li><strong>Prospect qualification</strong> — identify who is ready now and who needs nurturing</li>
                <li><strong>Objection handling</strong> — responds naturally to common client concerns</li>
                <li><strong>Direct calendar booking</strong> — route qualified prospects to open slots instantly</li>
                <li><strong>Drip follow-up sequences</strong> — maintain 12+ months of touchpoints automatically</li>
              </ul>
              <div className="re-wf-highlights">
                <span>$1.20 cost per qualified strategy call</span>
                <span>3X more appointments than manual follow-up</span>
                <span>Consistent performance without staffing constraints</span>
              </div>
              <button type="button" className="re-cta-link" onClick={openBooking}>See Outbound Demo →</button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="re-wf-card">
              <div className="re-wf-card-head">
                <h3>24/7 Inbound Voice Hotline</h3>
                <p className="re-wf-tagline">Handle inbound inquiries with instant, professional responses.</p>
              </div>
              <ul>
                <li>Answers every call about your services instantly</li>
                <li>Provides offer details, pricing, and availability</li>
                <li>Qualifies prospects and books private strategy calls</li>
                <li>Handles after-hours inquiries from motivated prospects</li>
                <li>Routes urgent calls directly to your cell</li>
              </ul>
              <div className="re-wf-highlights">
                <span>Save $3,000+/month vs. hiring extra call coverage</span>
                <span>Answer in 2 rings, every single time</span>
                <span>Handle unlimited simultaneous service inquiries</span>
                <span>Perfect recall of every offer detail</span>
              </div>
              <button type="button" className="re-cta-link" onClick={openBooking}>See Inbound Demo →</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── SCRIPTS ────────────────────────────────────────────────── */
const scriptList = [
  "New inbound inquiry script (ads, forms, website)",
  "Demo request qualification and routing script",
  "Dormant pipeline re-engagement script",
  "Outbound cold prospect conversion script",
  "Webinar and event follow-up script (same-day)",
  "Past client check-in and upsell script",
  "Dead lead database reactivation script",
  "Free trial to paid plan conversion script",
];

function ReScripts() {
  return (
    <section id="re-scripts" className="re-section re-section-scripts-light">
      <div className="container">
        <SectionHead
          eyebrow="🎯 Done-For-You AI Sales Scripts"
          title={<>From Activation to Booked Strategy Calls in 72 Hours</>}
          subtitle="Stop guessing what your AI should say. Every script, follow-up sequence, and objection handler is pre-built and proven."
        />
        <div className="re-scripts-intro">
          <p className="re-highlight-q">
            The difference between teams with empty calendars and teams with 10+ calls a week?
            A proven system that follows up every lead without fail.
          </p>
          <div className="re-scripts-stats">
            <div className="re-scripts-stat"><div className="re-scripts-stat-n">$47M+</div><div className="re-scripts-stat-l">in pipeline revenue generated</div></div>
            <div className="re-scripts-stat"><div className="re-scripts-stat-n">1,200+</div><div className="re-scripts-stat-l">teams using these sequences</div></div>
            <div className="re-scripts-stat"><div className="re-scripts-stat-n">72 hrs</div><div className="re-scripts-stat-l">to your first booked strategy call</div></div>
          </div>
        </div>
        <div className="re-scripts-layout">
          <Reveal>
            <div className="re-script-list">
              <h3>📱 Pre-Built AI Voice + Workflow Scripts</h3>
              <p className="re-sub">Ready to deploy in one click</p>
              <ul>
                {scriptList.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="re-script-mini-stats">
                <div className="re-script-mini"><div className="re-script-mini-n">28%</div><div className="re-script-mini-l">Lead-to-Appointment Rate</div></div>
                <div className="re-script-mini"><div className="re-script-mini-n">15min</div><div className="re-script-mini-l">Average Qualifying Call</div></div>
                <div className="re-script-mini"><div className="re-script-mini-n">$8,400</div><div className="re-script-mini-l">Avg Revenue From Revived Leads</div></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="re-timeline">
              <h3>⚡ Your 72-Hour Launch Timeline</h3>
              {[
                { time: "Hour 1", desc: "Activate platform & import your lead database" },
                { time: "Hour 3", desc: "AI scripts live and calling" },
                { time: "Day 2", desc: "First booked strategy calls appearing in your calendar" },
                { time: "Day 3", desc: "First qualified prospect conversation completed" },
              ].map((t) => (
                <div key={t.time} className="re-timeline-item">
                  <span className="re-timeline-time">{t.time}</span>
                  <span className="re-timeline-desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRATIONS ───────────────────────────────────────────── */
function ReIntegrations() {
  return (
    <section id="re-integrations" className="re-section re-section-integ-light">
      <div className="container">
        <SectionHead
          title={<>Integrates With Every Tool Your Team Already Uses</>}
          subtitle="Plug into your CRM, lead sources, and operations stack without changing your workflow."
        />
        <div className="re-integ-visual-wrap">
          <ReSectionVisual
            src={RE_IMAGES.integrationsHub}
            alt="400+ integrations including HubSpot, Salesforce, Zapier, and APIs"
            className="re-visual--wide re-visual--integ-hero"
          />
        </div>
        <div className="re-integ-grid">
          <Reveal>
            <div className="re-integ-col">
              <h3>Native Integrations</h3>
              <ul>
                <li>HubSpot — Full bi-directional sync</li>
                <li>GoHighLevel — Complete CRM automation</li>
                <li>Salesforce — Native lead routing</li>
                <li>Pipedrive, Zoho CRM, Close CRM</li>
                <li>Airtable, Notion, Slack</li>
                <li>Any CRM via Zapier / Make</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="re-integ-col">
              <h3>Lead Source Integrations</h3>
              <ul>
                <li>Meta Ads — Instant lead sync</li>
                <li>Google Ads — Auto-import and instant callback</li>
                <li>Facebook & Instagram Lead Ads</li>
                <li>Your website forms and landing pages</li>
                <li>Referral network drip follow-up</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="re-integ-col">
              <h3>Calendar & Booking</h3>
              <ul>
                <li>Google Calendar sync</li>
                <li>Outlook / Office 365</li>
                <li>Calendly and Acuity Scheduling</li>
                <li>Any booking tool via API</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARISON ─────────────────────────────────────────────── */
const compareRows = [
  { feature: "Built specifically for AI automation workflows", us: true, them: false },
  { feature: "Speed-to-lead under 60 seconds", us: true, them: false },
  { feature: "Pre-built AI scripts included", us: true, them: false },
  { feature: "Fraction of the cost of extra headcount", us: true, them: false },
  { feature: "Native CRM and API integrations", us: true, them: false },
  { feature: "Multi-language for diverse markets", us: true, them: false },
  { feature: "Inbound + outbound AI handling", us: true, them: false },
  { feature: "Long-term 12-month nurture sequences", us: true, them: false },
];

function ReComparison() {
  return (
    <section id="re-compare" className="re-section re-section-alt">
      <div className="container">
        <SectionHead
          eyebrow="🏆 Why Growth Teams Choose This"
          title={<>Why Smart Teams Choose This Over Every Other Tool</>}
          subtitle="What You Need to Scale Revenue Faster"
        />
        <Reveal>
          <div className="re-compare-wrap">
            <table className="re-compare-table">
              <thead>
                <tr>
                  <th>What You Need to Succeed</th>
                  <th>This Platform</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="re-compare-feature">{row.feature}</td>
                    <td className={row.us ? "re-yes" : "re-no"}>
                      <span className="re-compare-mark" aria-hidden>{row.us ? "✓" : "✕"}</span>
                    </td>
                    <td className={row.them ? "re-yes" : "re-no"}>
                      <span className="re-compare-mark" aria-hidden>{row.them ? "✓" : "✕"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <div className="re-bottom-line">
          <h3>The Bottom Line</h3>
          <ul>
            <li>Replaces a $4,000/month manual workflow burden for $29/month</li>
            <li>Calls every lead in under 60 seconds</li>
            <li>Actually built for how modern AI-first teams operate</li>
          </ul>
          <CtaButton>Get Instant Access Now →</CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING OFFER ──────────────────────────────────────────── */
const valueStack = [
  { item: "AI Voice System With 30+ Automation Features", value: "$997/mo value" },
  { item: "Pre-Built AI Script Library (15 scripts)", value: "$497/mo value" },
  { item: "Native CRM + Workflow Integrations", value: "$297/mo value" },
  { item: "Bonus #1: Performance Ads and Funnel Templates", value: "$1,997 value" },
  { item: "Bonus #2: Email + Text Follow-Up Sequence Templates", value: "$997 value" },
  { item: "Bonus #3: AI Automation Launch Playbook", value: "$1,497 value" },
  { item: "Bonus #4: Done-For-You Outbound and Calling Scripts", value: "$497 value" },
  { item: "Bonus #5: Weekly Live Q&A Implementation Calls", value: "$997 value" },
  { item: "Bonus #6: Priority Onboarding & Setup Support", value: "$497 value" },
  { item: "Bonus #7: Private AI Operators Community", value: "$497 value" },
];

function ReOffer() {
  return (
    <section id="re-offer" className="re-section re-offer">
      <div className="container">
        <SectionHead
          eyebrow="🚨 Limited Time Offer — Launch Pricing Ending Soon"
          title={<>Get the Complete AI Automation System for Your Team</>}
          subtitle="Here's Everything You Get Today:"
        />
        <div className="re-offer-card">
          <div className="re-value-list">
            {valueStack.map((v) => (
              <div key={v.item} className="re-value-item">
                <span>🤖 {v.item}</span>
                <span>{v.value}</span>
              </div>
            ))}
          </div>

          <div className="re-offer-pricing">
            <p className="re-total-value">Total Value: $8,777</p>
            <p className="re-offer-intro">Get Started Today For Only</p>
            <div className="re-offer-price">
              $29<span>/month</span>
            </div>
            <div className="re-save-badge">Save $8,748 Today!</div>

            <div className="re-offer-actions">
              <CtaButton>Activate My AI System →</CtaButton>
              <button type="button" className="re-offer-ghost-btn">Book a Demo First</button>
            </div>

            <p className="re-secure-note">🔒 Secure checkout • Cancel anytime • Instant access</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GUARANTEES ─────────────────────────────────────────────── */
function ReGuarantees() {
  return (
    <section id="re-guarantee" className="re-section re-section-alt">
      <div className="container">
        <SectionHead
          eyebrow="🛡️ 30-Day Money Back Guarantee"
          title={<>Try the Platform Risk-Free for 30 Days</>}
        />
        <Reveal>
          <div className="re-guarantee-banner">
            <p>
              If you don&apos;t book at least one additional qualified call or aren&apos;t completely satisfied,
              we&apos;ll refund every penny. No questions asked. That&apos;s how confident we are these systems
              work for growth-focused teams.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ──────────────────────────────────────────────── */
function ReFinalCta() {
  return (
    <section id="re-cta" className="re-final va-cta">
      <motion.div
        className="va-cta-rays"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container re-final-content">
        <Reveal>
          <h2>Ready to Stop Losing Revenue to Slow Manual Follow-Up?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="re-final-sub">
            Join 1,200+ teams who activated AI voice systems and transformed how much
            revenue they close every single month.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="re-final-actions">
            <CtaButton>Start Booking More Qualified Calls Today →</CtaButton>
          </div>
        </Reveal>
        <div className="re-final-meta">
          <p className="re-final-trust">100% Risk-Free • Cancel Anytime • Instant Access</p>
          <p className="re-urgency">23 teams activated in the last 24 hours</p>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
function RealEstateInner() {
  useScrollReveal();
  useSmoothAnchorLinks();

  return (
    <div className="re-page">
      <CustomCursor />
      <RealEstateNav />
      <ScrollToTop />
      <main>
        <ReHero />
        <ReVideoSection />
        <ReFiveSteps />
        <ReSavingsCalculator />
        <ReProblem />
        <ReSuccessStory />
        <ReFollowUpEngine />
        <ReWorkforce />
        <ReScripts />
        <ReIntegrations />
        <ReComparison />
        <ReOffer />
        <ReGuarantees />
        <ReFinalCta />
      </main>
      <Footer />
      <BookingModal />
    </div>
  );
}

export default function RealEstateClient() {
  return (
    <BookingProvider>
      <RealEstateInner />
    </BookingProvider>
  );
}
