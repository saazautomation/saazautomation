"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookingProvider, useBooking } from "@/context/BookingContext";
import Nav from "./Nav";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";
import BookingModal from "./BookingModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSmoothAnchorLinks } from "@/hooks/useSmoothAnchorLinks";
import Reveal from "@/components/motion/Reveal";

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const floatTags = [
  { label: "n8n", style: { top: "22%", left: "7%" }, delay: 0 },
  { label: "Make", style: { top: "18%", right: "9%" }, delay: 0.5 },
  { label: "OpenAI", style: { bottom: "30%", left: "10%" }, delay: 1 },
  { label: "LangChain", style: { bottom: "26%", right: "7%" }, delay: 1.5 },
];

const waveBars = Array.from({ length: 90 }, (_, i) => {
  const heights = [0.2, 0.4, 0.7, 1, 0.85, 0.6, 0.35, 0.55, 0.9, 0.75];
  const h = heights[i % heights.length];
  return { height: `${Math.round(h * 180 + 20)}px`, delay: `${((i * 0.04) % 1.8).toFixed(2)}s` };
});

function AutomationHero() {
  const { openBooking } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="aa-hero" className="va-hero" ref={sectionRef}>
      <div className="va-hero-grid" />

      {/* orbs */}
      <motion.div
        className="orb"
        style={{ width: 700, height: 700, top: -200, right: -200, background: "rgba(251,54,64,.08)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{ width: 500, height: 500, bottom: -200, left: -150, background: "rgba(199,203,211,.04)" }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* animated waveform */}
      <div className="va-waveform" aria-hidden>
        {waveBars.map((bar, i) => (
          <div
            key={i}
            className="va-wave-bar"
            style={{ height: bar.height, animationDelay: bar.delay, animationDuration: `${1.4 + (i % 5) * 0.18}s` }}
          />
        ))}
      </div>

      {/* float tags */}
      <div className="va-float-tags" aria-hidden>
        {floatTags.map((tag) => (
          <div
            key={tag.label}
            className="va-tag"
            style={{ ...tag.style, animationDelay: `${tag.delay}s` } as React.CSSProperties}
          >
            {tag.label}
          </div>
        ))}
      </div>

      <motion.div className="hero-inner va-hero-inner" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          className="va-hero-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="va-badge-dot" />
          AI Workflow &amp; Automation
        </motion.div>

        <motion.h1
          className="va-hero-h"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="line-1">WORKFLOWS</span>
          <span className="line-2">THAT SCALE</span>
          <span className="line-3">24/7</span>
        </motion.h1>

        <Reveal delay={0.9}>
          <p className="va-hero-sub">
            Intelligent AI workflows, business automation, trading bots, and custom AI systems that connect your
            tools, eliminate repetitive ops, and run agentic pipelines across sales, support, and operations.
          </p>
        </Reveal>

        <Reveal delay={1.1} className="va-hero-btns">
          <motion.button
            type="button"
            className="btn-r openBooking"
            onClick={openBooking}
            whileHover={{ y: -4, boxShadow: "0 20px 50px var(--red-glow)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book a Strategy Call</span>
          </motion.button>
          <motion.a
            href="#aa-portfolio"
            className="btn-o"
            whileHover={{ y: -4, borderColor: "var(--red)", color: "var(--red)" }}
          >
            See Case Studies
          </motion.a>
        </Reveal>
      </motion.div>

      <Reveal className="va-scroll" delay={1.4}>
        <span>SCROLL</span>
        <div className="scroll-ln" />
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VIDEO / PRODUCT SECTION  (below hero)
───────────────────────────────────────────── */
const trustPills = [
  { label: "80% Less Manual Work" },
  { label: "Full Stack Sync" },
  { label: "Agentic Workflows" },
];

const recentWorkflows = [
  { name: "Lead → CRM → Slack", company: "GrowthStack Inc.", dur: "1.2s", status: "Running", tag: "gr" },
  { name: "Invoice → QuickBooks", company: "CloudBase Ltd.", dur: "0.8s", status: "Complete", tag: "bg" },
  { name: "Onboard → GHL Pipeline", company: "RealtyPro Group", dur: "2.1s", status: "Running", tag: "gr" },
  { name: "Support → Ticket + AI", company: "Nexus Health", dur: "1.5s", status: "Queued", tag: "or" },
];

/* Replace with your YouTube video ID — e.g. "dQ1x..." */
const DEMO_VIDEO_ID = "kAcFR_T8Pzs";

function AutomationVideoSection() {
  const waveHeights = [35, 60, 85, 55, 100, 70, 45, 90, 65, 40, 75, 50, 95, 60, 35, 80, 55, 100, 70, 45];
  const [videoOpen, setVideoOpen] = useState(false);

  /* lock body scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = videoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen]);

  const closeVideo = () => setVideoOpen(false);

  return (
    <>
    <section className="va-vid-section">

      {/* decorative gradient bars — right side */}
      <div className="va-vid-bars-wrap" aria-hidden>
        <div className="va-vid-bar va-vid-bar-1" />
        <div className="va-vid-bar va-vid-bar-2" />
        <div className="va-vid-bar va-vid-bar-3" />
        <div className="va-vid-bar va-vid-bar-4" />
      </div>
      {/* decorative gradient — left soft glow */}
      <div className="va-vid-glow-left" aria-hidden />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* trust pills */}
        <Reveal>
          <div className="va-vid-pills">
            {trustPills.map((p) => (
              <div key={p.label} className="va-vid-pill">
                <svg className="va-vid-pill-check" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points="4.5,8.5 7,11 11.5,5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p.label}
              </div>
            ))}
          </div>
        </Reveal>

        {/* browser mockup */}
        <Reveal delay={0.15}>
          <div className="va-vid-frame">

            {/* browser chrome bar */}
            <div className="va-vid-chrome">
              <div className="va-vid-dots">
                <span /><span /><span />
              </div>
              <div className="va-vid-url">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="1" y="6" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                app.saazautomation.com/automation-dashboard
              </div>
              <div className="va-vid-chrome-actions">
                <span /><span />
              </div>
            </div>

            {/* dashboard UI */}
            <div className="va-vid-dashboard">

              {/* dashboard header */}
              <div className="va-vid-db-header">
                <div className="va-vid-db-brand">
                  <span className="va-vid-db-logo">SAAZ</span>
                  <span className="va-vid-db-title">Automation Hub · Live Dashboard</span>
                </div>
                <div className="va-vid-db-header-right">
                  <span className="va-vid-db-live">
                    <span className="va-vid-db-live-dot" />
                    Live
                  </span>
                  <span className="va-vid-db-date">Thu, May 21 · 11:41 AM</span>
                </div>
              </div>

              {/* metrics row */}
              <div className="va-vid-metrics">
                {[
                  { val: "12", lbl: "Active Workflows" },
                  { val: "847", lbl: "Runs Today" },
                  { val: "1.4s", lbl: "Avg Run Time" },
                  { val: "99%", lbl: "Success Rate" },
                ].map((m) => (
                  <div key={m.lbl} className="va-vid-metric">
                    <span className="va-vid-metric-val">{m.val}</span>
                    <span className="va-vid-metric-lbl">{m.lbl}</span>
                  </div>
                ))}
              </div>

              {/* active call + recent calls */}
              <div className="va-vid-body">

                {/* active call panel */}
                <div className="va-vid-active">
                  <div className="va-vid-active-label">
                    <span className="va-vid-db-live-dot" style={{ width: 6, height: 6 }} />
                    Active Workflow
                  </div>
                  <div className="va-vid-active-contact">
                    <div className="va-vid-active-av">AI</div>
                    <div>
                      <div className="va-vid-active-name">Lead Qualification Pipeline</div>
                      <div className="va-vid-active-co">GrowthStack Inc. · Agentic</div>
                    </div>
                    <div className="va-vid-active-timer">00:42</div>
                  </div>
                  {/* waveform */}
                  <div className="va-vid-wave" aria-hidden>
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="va-vid-wave-bar"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${(i * 0.09) % 1.6}s`,
                          animationDuration: `${0.9 + (i % 4) * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* crm sync badge */}
                  <div className="va-vid-crm-sync">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <ellipse cx="8" cy="4" rx="6" ry="2.25" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M14 8c0 1.24-2.69 2.25-6 2.25S2 9.24 2 8" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M2 4v8c0 1.24 2.69 2.25 6 2.25S14 13.24 14 12V4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    HubSpot + n8n syncing…
                  </div>
                </div>

                {/* recent workflows table */}
                <div className="va-vid-recents">
                  <div className="va-vid-recents-label">Recent Workflows</div>
                  <div className="va-vid-recents-list">
                    {recentWorkflows.map((c) => (
                      <div key={c.name} className="va-vid-recents-row">
                        <div className={`va-vid-recents-av va-vid-av-${c.tag}`}>
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="va-vid-recents-info">
                          <span className="va-vid-recents-name">{c.name}</span>
                          <span className="va-vid-recents-co">{c.company}</span>
                        </div>
                        <span className="va-vid-recents-dur">{c.dur}</span>
                        <span className={`va-vid-recents-status va-vid-status-${c.tag}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* play button overlay */}
            <div className="va-vid-overlay">
              <motion.button
                type="button"
                className="va-vid-play"
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Watch demo"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </motion.button>
              <p className="va-vid-play-label">Watch Workflow Demo · 2 min</p>
            </div>

          </div>
        </Reveal>

      </div>
    </section>

    {/* ── Video modal ── */}
    <AnimatePresence>
      {videoOpen && (
        <motion.div
          className="va-vid-modal-backdrop"
          onClick={closeVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="va-vid-modal-box"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* close button */}
            <button
              type="button"
              className="va-vid-modal-close"
              onClick={closeVideo}
              aria-label="Close video"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>

            {/* 16/9 iframe wrapper */}
            <div className="va-vid-modal-embed">
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
                title="SAAZ AI Automation Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   MISSING-OUT / COMPARISON SECTION
───────────────────────────────────────────── */
const compRows = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "Process Efficiency",
    without: 35,
    with: 92,
    withoutLabel: "35%",
    withLabel: "92%",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Time Saved Weekly",
    without: 22,
    with: 78,
    withoutLabel: "22%",
    withLabel: "78%",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Leads Processed",
    without: 31,
    with: 88,
    withoutLabel: "31%",
    withLabel: "88%",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "Ops Cost Reduction",
    without: 18,
    with: 64,
    withoutLabel: "18%",
    withLabel: "64%",
  },
];

function CompBar({ row, index }: { row: typeof compRows[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="va-comp-row"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="va-comp-row-label">
        <span className="va-comp-row-icon">{row.icon}</span>
        {row.label}
      </div>

      <div className="va-comp-track">
        {/* without SAAZ bar */}
        <div
          className="va-comp-bar va-comp-bar--without"
          style={{ width: animate ? `${row.without}%` : "0%" }}
        />
        {/* with SAAZ bar */}
        <div
          className="va-comp-bar va-comp-bar--with"
          style={{ width: animate ? `${row.with}%` : "0%" }}
        />
      </div>

      <div className="va-comp-row-vals">
        <span className="va-comp-val va-comp-val--without">{row.withoutLabel}</span>
        <span className="va-comp-val va-comp-val--with">{row.withLabel}</span>
      </div>
    </motion.div>
  );
}

function AutomationMissingSection() {
  return (
    <section className="va-comp-section">
      <div className="va-comp-inner">

        {/* text block */}
        <Reveal>
          <div className="va-comp-text">
            <p className="va-comp-eyebrow">The Hidden Cost of Manual Ops</p>
            <h2 className="va-comp-h">
              You&apos;re losing
              <br />
              <span className="va-comp-h-accent">40+ hours per week.</span>
            </h2>
            <p className="va-comp-sub">
              Every manual handoff, duplicate data entry and broken integration drains your team&apos;s
              capacity. AI workflows automate the repetitive work — so your business runs faster,
              leaner and without bottlenecks.
            </p>
          </div>
        </Reveal>

        {/* comparison chart */}
        <Reveal delay={0.1}>
          <div className="va-comp-chart">

            {/* chart header */}
            <div className="va-comp-chart-header">
              <div className="va-comp-chart-scope">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Business Automation Performance
              </div>
              <div className="va-comp-legend">
                <span className="va-comp-legend-item va-comp-legend--without">
                  <span />
                  Manual Processes
                </span>
                <span className="va-comp-legend-item va-comp-legend--with">
                  <span />
                  With SAAZ Automation
                </span>
              </div>
            </div>

            {/* bars */}
            <div className="va-comp-bars">
              {compRows.map((row, i) => (
                <CompBar key={row.label} row={row} index={i} />
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const stats = [
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    value: "150+",
    label: "Workflows Deployed",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: "80%",
    label: "Manual Work Eliminated",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    value: "50+",
    label: "Enterprise Clients",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    value: "10M+",
    label: "Dollars Saved",
  },
];

function AutomationStats() {
  return (
    <section id="aa-stats" className="va-stats">
      <div className="container">
        <div className="va-stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="va-stat">
                {s.icon}
                <div className="va-stat-n">{s.value}</div>
                <div className="va-stat-l">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES / CORE CAPABILITIES
───────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "Workflow Design",
    desc: "Map your ops, identify automation opportunities and architect end-to-end pipelines that eliminate manual handoffs across departments.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Agentic AI Systems",
    desc: "Multi-agent workflows that reason, plan and execute complex tasks — research, decide and act across your entire stack autonomously.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "CRM Automation",
    desc: "Auto-sync leads, update pipelines, trigger follow-ups and enrich contacts — HubSpot, Salesforce, GHL and Pipedrive connected out of the box.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Lead Pipeline Automation",
    desc: "Scrape, qualify, enrich and route leads through your sales funnel — with AI scoring, personalised outreach and CRM updates on autopilot.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Ops & Back-Office",
    desc: "Invoicing, onboarding, document processing and internal approvals — automated end to end with audit trails and error handling built in.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Stack Integrations",
    desc: "Connect n8n, Make, Zapier, Airtable, Slack and 200+ tools — unified data flows without rebuilding your existing infrastructure.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Analytics & Monitoring",
    desc: "Real-time dashboards for workflow health, run logs, failure alerts and ROI tracking — know exactly what your automations deliver.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="1 20 23 20" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Custom AI Agents",
    desc: "Purpose-built AI agents for support, sales, research and ops — trained on your data, wired into your workflows, deployed in weeks.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

function AutomationServices() {
  return (
    <section id="aa-services" className="s va-services">
      <div className="container">
        <div className="va-srv-head">
          <div>
            <Reveal>
              <span className="s-label">Core Capabilities</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h">
                Everything your
                <br />
                automation stack needs.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="right">
            <p className="va-srv-desc">
              From lead capture to invoice processing, every repetitive task is handled by intelligent
              workflows — freeing your team to focus on strategy, growth and high-value work.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="va-srv-grid">
            {services.map((svc) => (
              <div key={svc.num} className="va-srv-card">
                <div className="va-srv-card-top" />
                <div className="va-srv-num">{svc.num}</div>
                {svc.icon}
                <div className="va-srv-t">{svc.title}</div>
                <div className="va-srv-d">{svc.desc}</div>
                <div className="va-srv-arr">
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const mqItems = [
  "n8n", "Make", "Zapier", "OpenAI", "Claude", "LangChain",
  "HubSpot", "Salesforce", "GHL", "Airtable", "Slack", "Notion",
  "Google Sheets", "Twilio", "Pipedrive", "Webhooks", "Python", "API",
];

function AutomationMarquee() {
  const doubled = [...mqItems, ...mqItems];
  return (
    <div className="va-mq-wrap">
      <div className="va-mq-track">
        {doubled.map((item, i) => (
          <span key={i} className="va-mq-i">
            {item}
            <span className="va-mq-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VOICE DEMO STRIP
───────────────────────────────────────────── */
function AutomationDemoStrip() {
  const { openBooking } = useBooking();
  const miniBarHeights = [30, 55, 80, 55, 100, 70, 45, 90, 60, 35, 75, 50, 95, 65, 40];

  return (
    <section className="va-demo-strip">
      <div className="container">
        <div className="va-demo-inner">
          <div>
            <Reveal>
              <span className="s-label">Live Demo</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="va-demo-title">
                See your
                <br />
                stack automated.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="va-demo-sub">
                Book a walkthrough of a live automation pipeline. We&apos;ll map your current ops,
                show agentic workflows in action and outline ROI on the same call.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <motion.button
                type="button"
                className="btn-r"
                onClick={openBooking}
                whileHover={{ y: -3, boxShadow: "0 16px 40px var(--red-glow)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Schedule Live Demo</span>
              </motion.button>
            </Reveal>
          </div>

          <Reveal delay={0.25} direction="right">
            <div className="va-demo-visual">
              <div className="va-demo-ring" />
              <div className="va-demo-ring" />
              <div className="va-demo-ring" />
              <div className="va-demo-center">
                <svg className="va-demo-mic" viewBox="0 0 24 24" aria-hidden>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="va-demo-mini-bars" aria-hidden>
                {miniBarHeights.map((h, i) => (
                  <div
                    key={i}
                    className="va-demo-mini-bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s`, animationDuration: `${0.8 + (i % 4) * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CRM INTEGRATIONS
───────────────────────────────────────────── */
const crmTools = [
  { ic: "🔴", name: "n8n", tag: "Automation" },
  { ic: "🔧", name: "Make", tag: "Automation" },
  { ic: "⚙️", name: "Zapier", tag: "Automation" },
  { ic: "⚡", name: "GHL", tag: "CRM" },
  { ic: "🟠", name: "HubSpot", tag: "CRM" },
  { ic: "☁️", name: "Salesforce", tag: "CRM" },
  { ic: "🔵", name: "Pipedrive", tag: "CRM" },
  { ic: "🤖", name: "OpenAI", tag: "AI" },
  { ic: "🧠", name: "Claude", tag: "AI" },
  { ic: "🌊", name: "LangChain", tag: "AI" },
  { ic: "📊", name: "Airtable", tag: "Data" },
  { ic: "📋", name: "Notion", tag: "Data" },
  { ic: "💬", name: "Slack", tag: "Notify" },
  { ic: "📡", name: "Webhooks", tag: "API" },
  { ic: "📧", name: "ActiveCampaign", tag: "Email" },
  { ic: "📱", name: "Twilio", tag: "Comms" },
  { ic: "🐍", name: "Python", tag: "Custom" },
  { ic: "🔗", name: "REST APIs", tag: "Custom" },
];

function AutomationIntegrations() {
  return (
    <section id="aa-integrations" className="s va-integrations">
      <div className="container">
        <Reveal>
          <div className="va-int-intro">
            <span className="s-label" style={{ justifyContent: "center" }}>Integrations</span>
            <h2 className="s-h" style={{ textAlign: "center" }}>
              Connects to your
              <br />
              entire stack.
            </h2>
            <p className="va-int-sub">
              Native integrations with leading automation platforms, CRMs and AI providers —
              so your workflows fit seamlessly into existing systems without rebuilding anything.
            </p>
            <motion.div className="va-int-cats">
              {["All", "Automation", "CRM", "AI", "Data", "Notify", "API"].map((c) => (
                <span key={c} className={`va-int-cat ${c === "All" ? "active" : ""}`}>{c}</span>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="va-tools-grid">
            {crmTools.map((tool, i) => (
              <div key={tool.name} className="va-tool" style={{ animationDelay: `${i * 0.04}s` }}>
                <span className="va-tool-ic">{tool.ic}</span>
                <span className="va-tool-n">{tool.name}</span>
                <span className="va-tool-tag">{tool.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WORKFLOW BUILDER
───────────────────────────────────────────── */
const wfNodes = [
  {
    step: "01 — Trigger",
    title: "Event Fires",
    desc: "A form submit, new lead, invoice or webhook hits your pipeline — the workflow starts instantly.",
    badge: "LIVE",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    step: "02 — Process",
    title: "AI Enrichment",
    desc: "AI agents qualify, enrich and route data — scoring leads, parsing documents and deciding next steps.",
    badge: "AI",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    step: "03 — Action",
    title: "Execute Tasks",
    desc: "Update CRM, send emails, create tasks, notify Slack or trigger downstream workflows — all without human input.",
    badge: "AUTO",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    step: "04 — Sync",
    title: "Data Sync",
    desc: "Every action logged, every record updated across Airtable, HubSpot, GHL and your data warehouse in real time.",
    badge: "SYNC",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    step: "05 — Monitor",
    title: "Alert & Optimise",
    desc: "Failure alerts, retry logic and performance dashboards — continuous improvement without babysitting.",
    badge: "n8n",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const wfPlatforms = [
  { ic: "🔴", name: "n8n" },
  { ic: "⚙️", name: "Zapier" },
  { ic: "🔧", name: "Make" },
  { ic: "☁️", name: "Salesforce Flow" },
  { ic: "⚡", name: "GHL Workflows" },
  { ic: "📡", name: "Custom Webhooks" },
];

function AutomationWorkflow() {
  return (
    <section id="aa-workflow" className="s va-workflow">
      <div className="container">
        <div className="va-wf-head">
          <div>
            <Reveal>
              <span className="s-label">Automation Workflows</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h">
                Built for your
                <br />
                business stack.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="va-wf-desc">
                Connect any workflow platform. Design complex multi-step automations with branching logic,
                AI agents, conditional triggers and real-time data sync — no code required.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="va-wf-feats">
                {[
                  { strong: "Visual workflow builder", rest: " — drag-and-drop pipeline design in n8n or Make" },
                  { strong: "Agentic AI steps", rest: " — embed reasoning agents that decide and act within workflows" },
                  { strong: "Real-time webhooks", rest: " — push data to any endpoint the moment an event fires" },
                  { strong: "Retry logic", rest: " — automatic fallbacks if an integration step fails" },
                  { strong: "Full audit trail", rest: " — every action logged with timestamps for compliance" },
                ].map((f, i) => (
                  <div key={i} className="va-wf-feat">
                    <span className="va-wf-feat-dot" />
                    <p className="va-wf-feat-text">
                      <strong>{f.strong}</strong>{f.rest}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="right">
            <div className="va-wf-right">
              <span className="s-label">Compatible Platforms</span>
              <div className="va-wf-platform-row">
                {wfPlatforms.map((p) => (
                  <div key={p.name} className="va-wf-platform">
                    <span className="va-wf-platform-ic">{p.ic}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* pipeline diagram */}
        <Reveal delay={0.3}>
          <div className="va-wf-diagram">
            <div className="va-wf-pipeline">
              {wfNodes.map((node) => (
                <div key={node.step} className="va-wf-node">
                  <div className="va-wf-node-step">{node.step}</div>
                  {node.icon}
                  <div className="va-wf-node-title">{node.title}</div>
                  <div className="va-wf-node-desc">{node.desc}</div>
                  <div className="va-wf-node-badge">
                    <span className="va-wf-node-badge-dot" />
                    {node.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO / CASE STUDIES
───────────────────────────────────────────── */
const caseStudies = [
  {
    tag: "Agency / Ops",
    title: "FlowCore for GrowthStack",
    desc: "End-to-end ops automation across sales, onboarding and billing — 80% manual work eliminated across 5 departments with n8n + HubSpot.",
    metrics: [
      { n: "80%", l: "Less manual work" },
      { n: "5", l: "Depts automated" },
    ],
    bgClass: "va-proj-bg-1",
    bgText: "OPS",
  },
  {
    tag: "SaaS / Tech",
    title: "AgentStack for CloudBase",
    desc: "Agentic workflows handle support triage, lead routing and internal alerts — response time from hours to under 60 seconds.",
    metrics: [
      { n: "92%", l: "Auto-resolved" },
      { n: "60s", l: "Response time" },
    ],
    bgClass: "va-proj-bg-2",
    bgText: "SaaS",
  },
  {
    tag: "E-Commerce",
    title: "AutoOps for RetailCo",
    desc: "Order processing, inventory sync, customer follow-ups and refund workflows — fully automated across Shopify, GHL and Airtable.",
    metrics: [
      { n: "1,200+", l: "Orders/day" },
      { n: "64%", l: "Cost reduction" },
    ],
    bgClass: "va-proj-bg-3",
    bgText: "EC",
  },
];

function AutomationPortfolio() {
  return (
    <section id="aa-portfolio" className="s va-portfolio">
      <div className="container">
        <div className="va-proj-head">
          <div>
            <Reveal>
              <span className="s-label">Case Studies</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h">
                Proven results
                <br />
                across industries.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="right">
            <a href="#aa-cta" className="va-proj-see-all">
              Start your project →
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="va-proj-grid">
            {caseStudies.map((cs) => (
              <div key={cs.title} className="va-proj-card">
                <div className={`va-proj-bg ${cs.bgClass}`} />
                <span className="va-proj-bg-text">{cs.bgText}</span>
                <div className="va-proj-overlay">
                  <div className="va-proj-tag">{cs.tag}</div>
                  <div className="va-proj-t">{cs.title}</div>
                  <div className="va-proj-d">{cs.desc}</div>
                  <div className="va-proj-metrics">
                    {cs.metrics.map((m) => (
                      <div key={m.l} className="va-proj-metric">
                        <span className="va-proj-metric-n">{m.n}</span>
                        <span className="va-proj-metric-l">{m.l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="va-proj-arr">View case study →</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS
───────────────────────────────────────────── */
const processSteps = [
  {
    num: "1",
    title: "Discovery & Audit",
    desc: "We map your current ops, identify high-ROI automation opportunities and define clear success metrics — no fluff, just leverage points.",
    tag: "Week 1",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Workflow Architecture",
    desc: "Design agentic pipelines, integration maps and data flows — choosing the right platforms, AI models and automation patterns for your stack.",
    tag: "Week 2",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Build & Integrate",
    desc: "Develop workflows, wire CRMs and AI agents, test with real data — zero downtime, full compatibility, battle-tested before go-live.",
    tag: "Week 3",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Deploy & Scale",
    desc: "Go live with monitoring, failure alerts and continuous optimisation — expand workflows as your business grows without adding headcount.",
    tag: "Week 4+",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

function AutomationProcess() {
  return (
    <section id="aa-process" className="s va-process">
      <div className="container">
        <Reveal>
          <span className="s-label">Our Process</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="s-h">
            From audit to live
            <br />
            workflows in 4 weeks.
          </h2>
        </Reveal>

        <div className="va-proc-grid">
          {processSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="va-proc-step">
                <div className="va-proc-num">{step.num}</div>
                {step.icon}
                <div className="va-proc-t">{step.title}</div>
                <div className="va-proc-d">{step.desc}</div>
                <div className="va-proc-tag">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
                  {step.tag}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS  — same layout as home page Reviews
───────────────────────────────────────────── */
function QuoteIcon() {
  return (
    <svg
      className="reviews-light-quote"
      width="44"
      height="36"
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden
    >
      <path
        d="M9.2 0C4.12 0 0 4.12 0 9.2v9.2c0 8.08 6.56 14.64 14.64 14.64h3.68V18.4h-2.76c-3.04 0-5.52-2.48-5.52-5.52V9.2h9.2V0H9.2zm25.76 0c-5.08 0-9.2 4.12-9.2 9.2v9.2c0 8.08 6.56 14.64 14.64 14.64h3.68V18.4h-2.76c-3.04 0-5.52-2.48-5.52-5.52V9.2h9.2V0H34.96z"
        fill="currentColor"
      />
    </svg>
  );
}

const automationReviews = [
  {
    text: "SAAZ mapped our entire ops stack and deployed n8n workflows that cut 35 hours of weekly manual work. Lead routing, onboarding and invoicing now run without us touching a spreadsheet.",
    initials: "AK",
    name: "Alex Khan",
    role: "Founder, GrowthLab Digital",
  },
  {
    text: "Their agentic system routes leads, updates CRM and books calls without babysitting. Response time went from hours to under a minute — our closers only talk to qualified prospects now.",
    initials: "JM",
    name: "James Miller",
    role: "CEO, TechVentures Inc",
  },
  {
    text: "We needed business automation beyond chatbots. SAAZ built agentic workflows for invoicing, onboarding and ops alerts — one stack, fully auditable, live in three weeks.",
    initials: "RC",
    name: "Ryan Cooper",
    role: "Director of Operations, ScaleFlow",
  },
  {
    text: "HubSpot and Make integration took two days. Every workflow is logged, monitored and self-healing. Revenue per rep is up 40% because the pipeline actually moves on its own.",
    initials: "AT",
    name: "Amir Tehrani",
    role: "Head of Revenue, Nexus Health",
  },
  {
    text: "The FLOWCORE system eliminated 80% of manual ops across five departments. n8n + Airtable + OpenAI agents — SAAZ wired it all together and we haven't looked back.",
    initials: "DV",
    name: "Daniel Vasquez",
    role: "Founder, GrowthStack",
  },
  {
    text: "What stands out is how they think in systems — not one-off zaps. Full agentic pipelines with retry logic, Slack alerts and CRM sync. Our team finally focuses on growth, not data entry.",
    initials: "NP",
    name: "Nina Patel",
    role: "CTO, FinEdge Systems",
  },
];

function AutomationReviews() {
  return (
    <section id="reviews" className="reviews-light">
      <div className="reviews-light-shell">
        <h2 className="reviews-light-title">
          Words from clients who automated with SAAZ.
        </h2>

        <div className="reviews-light-grid">
          {automationReviews.map((review, i) => (
            <motion.article
              key={review.name}
              className="reviews-light-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <QuoteIcon />
              <p className="reviews-light-text">{review.text}</p>
              <footer className="reviews-light-author">
                <span className="reviews-light-avatar" aria-hidden>
                  {review.initials}
                </span>
                <div className="reviews-light-meta">
                  <p className="reviews-light-name">{review.name}</p>
                  <p className="reviews-light-role">{review.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const faqs = [
  {
    q: "What types of business processes can you automate?",
    a: "Almost any repeatable workflow — lead capture and routing, CRM updates, onboarding, invoicing, support triage, document processing, internal approvals, reporting and multi-agent AI pipelines. If it involves data moving between systems or repetitive decisions, we can likely automate it.",
  },
  {
    q: "Which platforms do you build on?",
    a: "We primarily use n8n, Make and Zapier for orchestration, plus custom Python/API integrations where needed. We integrate with HubSpot, Salesforce, GHL, Airtable, Slack, OpenAI, Claude and 200+ other tools — whatever matches your stack and compliance requirements.",
  },
  {
    q: "How long does deployment take?",
    a: "Most automation projects go live in 3–4 weeks. Week 1 is discovery and audit, week 2 is architecture and workflow design, week 3 is build and integration, and week 4 is supervised go-live with monitoring and optimisation dashboards.",
  },
  {
    q: "Do you build agentic AI workflows or just basic automations?",
    a: "Both. Simple zaps for quick wins, and full agentic systems where AI agents reason, decide and execute within pipelines — research, qualify leads, parse documents, route tickets and trigger downstream actions without human intervention.",
  },
  {
    q: "Is our data secure?",
    a: "Yes. Workflows run on your infrastructure or ours with encrypted credentials, role-based access and full audit logs. We support GDPR-compliant deployments, private n8n instances and SOC-friendly patterns for enterprise clients.",
  },
  {
    q: "What if a workflow fails?",
    a: "Every pipeline includes retry logic, failure alerts to Slack/email and dead-letter queues so nothing silently breaks. You get notified instantly when a step fails, with automatic retries and a clear error dashboard — but most clients never babysit daily once monitoring is live.",
  },
];

function AutomationFaq() {
  const { openBooking } = useBooking();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="aa-faq" className="s va-faq">
      <div className="container">
        <div className="va-faq-grid">
          <div className="va-faq-left">
            <Reveal>
              <span className="s-label">FAQ</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h">
                Common
                <br />
                questions.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="va-faq-left-sub">
                Can&apos;t find your answer? Book a free call and we&apos;ll walk through your
                specific automation use case in detail.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <motion.button
                type="button"
                className="va-faq-cta"
                onClick={openBooking}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Ask Us Directly →
              </motion.button>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="va-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="va-faq-item">
                  <button
                    type="button"
                    className="va-faq-btn"
                    aria-expanded={openIdx === i}
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  >
                    <span className="va-faq-q">{faq.q}</span>
                    <span className="va-faq-icon">{openIdx === i ? "×" : "+"}</span>
                  </button>
                  {openIdx === i && (
                    <motion.div
                      className="va-faq-a"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
───────────────────────────────────────────── */
function AutomationCta() {
  const { openBooking } = useBooking();
  return (
    <section id="aa-cta" className="va-cta">
      <motion.div
        className="va-cta-rays"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="va-cta-bar" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="va-cta-h">
            AUTOMATE
            <br />
            YOUR OPS.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="va-cta-bar" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="va-cta-sub">
            Book a free strategy call. We&apos;ll audit your ops, show live workflow demos and
            give you a deployment timeline on the same call.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="va-cta-btns">
          <motion.button
            type="button"
            className="btn-r openBooking"
            onClick={openBooking}
            whileHover={{ y: -4, boxShadow: "0 20px 50px var(--red-glow)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book Free Strategy Call</span>
          </motion.button>
          <motion.a
            href="#aa-integrations"
            className="btn-o"
            whileHover={{ y: -4, borderColor: "var(--red)", color: "var(--red)" }}
          >
            See Integrations
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
function AiAutomationInner() {
  useScrollReveal();
  useSmoothAnchorLinks();

  return (
    <>
      <CustomCursor />
      <Nav />
      <ScrollToTop />
      <main>
        <AutomationHero />
        <AutomationVideoSection />
        <AutomationMissingSection />
        <AutomationStats />
        <AutomationServices />
        <AutomationMarquee />
        <AutomationDemoStrip />
        <AutomationIntegrations />
        <AutomationWorkflow />
        <AutomationPortfolio />
        <AutomationProcess />
        <AutomationReviews />
        <AutomationFaq />
        <AutomationCta />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}

export default function AiAutomationClient() {
  return (
    <BookingProvider>
      <AiAutomationInner />
    </BookingProvider>
  );
}
