"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  { label: "VAPI.AI", style: { top: "22%", left: "7%" }, delay: 0 },
  { label: "ElevenLabs", style: { top: "18%", right: "9%" }, delay: 0.5 },
  { label: "Twilio", style: { bottom: "30%", left: "10%" }, delay: 1 },
  { label: "Retell AI", style: { bottom: "26%", right: "7%" }, delay: 1.5 },
];

const waveBars = Array.from({ length: 90 }, (_, i) => {
  const heights = [0.2, 0.4, 0.7, 1, 0.85, 0.6, 0.35, 0.55, 0.9, 0.75];
  const h = heights[i % heights.length];
  return { height: `${Math.round(h * 180 + 20)}px`, delay: `${((i * 0.04) % 1.8).toFixed(2)}s` };
});

function VoiceHero() {
  const { openBooking } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="va-hero" className="va-hero" ref={sectionRef}>
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
          Voice AI Agents
        </motion.div>

        <motion.h1
          className="va-hero-h"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="line-1">VOICE THAT</span>
          <span className="line-2">CONVERTS</span>
          <span className="line-3">24/7</span>
        </motion.h1>

        <Reveal delay={0.9}>
          <p className="va-hero-sub">
            Hyper-realistic AI voice agents that handle inbound calls, qualify leads, book appointments
            and sync every conversation to your CRM — in real time, in 47+ languages.
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
            <span>Book a Demo Call</span>
          </motion.button>
          <motion.a
            href="#va-portfolio"
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
   STATS
───────────────────────────────────────────── */
const stats = [
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    value: "1M+",
    label: "Calls Handled",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: "<1 sec",
    label: "First Response Time",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    value: "47+",
    label: "Languages Supported",
  },
  {
    icon: (
      <svg className="va-stat-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    value: "94%",
    label: "Customer Satisfaction",
  },
];

function VoiceStats() {
  return (
    <section id="va-stats" className="va-stats">
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
    title: "Inbound Call Handling",
    desc: "Answer every call instantly — no hold music, no missed leads. Your AI agent greets callers, answers FAQs and routes complex issues.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Outbound Campaigns",
    desc: "Launch AI-powered outbound campaigns at scale. Re-engage cold lists, follow up on quotes and confirm appointments — automatically.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 8 22 2 16 2" />
        <line x1="22" y1="2" x2="15" y2="9" />
        <path d="M16 8H2v14h14V8z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Lead Qualification",
    desc: "Ask the right questions, score prospects in real time and pass only sales-ready leads to your closers — with full call transcripts attached.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="23 21 23 19 20 16 17 19 14 16 14 21" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Appointment Booking",
    desc: "Let your AI agent check live calendar availability and book appointments on the spot, syncing directly into your scheduling system.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "CRM Auto-Sync",
    desc: "Every call is logged, tagged and synced to your CRM the instant it ends — with AI-generated summaries, disposition codes and next-step tasks.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Multi-Language",
    desc: "Deploy voice agents fluent in 47+ languages. Serve global audiences, detect caller language automatically and respond with native-level fluency.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Voice Analytics",
    desc: "Track call sentiment, topic trends, conversion rates and agent performance from a real-time dashboard — with actionable AI insights.",
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
    title: "Custom Personas",
    desc: "Build a branded voice identity — choose name, tone, personality and voice clone. Your agent feels like a natural extension of your team.",
    icon: (
      <svg className="va-srv-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

function VoiceServices() {
  return (
    <section id="va-services" className="s va-services">
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
                voice agent needs.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} direction="right">
            <p className="va-srv-desc">
              From the moment a call connects to the second it ends, every interaction is handled,
              recorded and actioned by intelligent AI — freeing your team to close, not chase.
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
  "VAPI.AI", "ElevenLabs", "Twilio", "Retell AI", "OpenAI", "Deepgram",
  "Bland AI", "PlayHT", "Whisper", "Hume AI", "Livekit", "Speechify",
  "GHL", "HubSpot", "Salesforce", "n8n", "Make", "Zapier",
];

function VoiceMarquee() {
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
function VoiceDemoStrip() {
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
                Hear it
                <br />
                in action.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="va-demo-sub">
                Schedule a live call with one of our demo agents. Experience real-time conversation,
                CRM sync and call summary — end to end.
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
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
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
  { ic: "🟠", name: "HubSpot", tag: "CRM" },
  { ic: "☁️", name: "Salesforce", tag: "CRM" },
  { ic: "⚡", name: "GHL", tag: "CRM" },
  { ic: "🔵", name: "Pipedrive", tag: "CRM" },
  { ic: "🟣", name: "Zoho CRM", tag: "CRM" },
  { ic: "⬛", name: "Close.io", tag: "CRM" },
  { ic: "🔴", name: "n8n", tag: "Automation" },
  { ic: "⚙️", name: "Zapier", tag: "Automation" },
  { ic: "🔧", name: "Make", tag: "Automation" },
  { ic: "📡", name: "Webhooks", tag: "Automation" },
  { ic: "🟦", name: "Twilio", tag: "Voice" },
  { ic: "🎙️", name: "ElevenLabs", tag: "Voice" },
  { ic: "📞", name: "VAPI.AI", tag: "Voice" },
  { ic: "🤖", name: "Retell AI", tag: "Voice" },
  { ic: "💬", name: "Slack", tag: "Notify" },
  { ic: "📊", name: "Airtable", tag: "Data" },
  { ic: "📋", name: "Notion", tag: "Data" },
  { ic: "📧", name: "ActiveCampaign", tag: "Email" },
];

function VoiceCrmIntegrations() {
  return (
    <section id="va-integrations" className="s va-integrations">
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
              Native integrations with leading CRMs, automation platforms and voice infrastructure —
              so your agent fits seamlessly into existing workflows without rebuilding anything.
            </p>
            <div className="va-int-cats">
              {["All", "CRM", "Automation", "Voice", "Notify", "Data", "Email"].map((c) => (
                <span key={c} className={`va-int-cat ${c === "All" ? "active" : ""}`}>{c}</span>
              ))}
            </div>
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
    title: "Inbound Call",
    desc: "A lead calls your number. The agent picks up instantly — no ringing, no IVR menu.",
    badge: "LIVE",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    step: "02 — Qualify",
    title: "AI Conversation",
    desc: "The agent asks dynamic qualification questions, detects intent and scores the lead in real time.",
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
    title: "Book / Route",
    desc: "Book a calendar slot, transfer to a human rep or trigger an automation — all without leaving the call.",
    badge: "AUTO",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    step: "04 — Sync",
    title: "CRM Update",
    desc: "Call transcript, summary, sentiment score and next-step task are pushed to your CRM the instant the call ends.",
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
    step: "05 — Follow-up",
    title: "n8n Workflow",
    desc: "Trigger multi-step automations in n8n, Zapier or Make — send emails, create tasks, notify Slack.",
    badge: "n8n",
    icon: (
      <svg className="va-wf-node-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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

function VoiceWorkflow() {
  return (
    <section id="va-workflow" className="s va-workflow">
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
                automation stack.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="va-wf-desc">
                Connect your voice agent to any workflow platform. Design complex multi-step
                automations with branching logic, conditional triggers and real-time data sync —
                no code required.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="va-wf-feats">
                {[
                  { strong: "Visual workflow builder", rest: " — drag-and-drop pipeline design in n8n or Make" },
                  { strong: "Conditional branching", rest: " — route calls differently based on lead score or intent" },
                  { strong: "Real-time webhooks", rest: " — push call data to any endpoint the moment a call ends" },
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
    tag: "Real Estate",
    title: "AutoVoice for RealtyPro",
    desc: "AI agent handles all inbound showings inquiries, qualifies buyers, books tours and logs every interaction into GHL.",
    metrics: [
      { n: "340%", l: "More showings" },
      { n: "0", l: "Missed calls" },
    ],
    bgClass: "va-proj-bg-1",
    bgText: "RE",
  },
  {
    tag: "SaaS / Tech",
    title: "VoiceSupport for CloudBase",
    desc: "Tier-1 support handled entirely by AI — resolving billing, onboarding and API questions with 92% first-call resolution.",
    metrics: [
      { n: "85%", l: "Ticket reduction" },
      { n: "3.2×", l: "CSAT lift" },
    ],
    bgClass: "va-proj-bg-2",
    bgText: "SaaS",
  },
  {
    tag: "Healthcare",
    title: "SmartVoice for MedGroup",
    desc: "Patient intake, appointment reminders and prescription refill requests handled 24/7 — HIPAA-compliant, fully automated.",
    metrics: [
      { n: "2,400+", l: "Calls/day" },
      { n: "91%", l: "No-show reduction" },
    ],
    bgClass: "va-proj-bg-3",
    bgText: "MED",
  },
];

function VoicePortfolio() {
  return (
    <section id="va-portfolio" className="s va-portfolio">
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
            <a href="#va-cta" className="va-proj-see-all">
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
    title: "Discovery & Strategy",
    desc: "We map your current call flow, identify bottlenecks and design an AI voice strategy aligned to your business goals — conversion, retention or support.",
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
    title: "Voice Design & Training",
    desc: "Clone your brand voice or choose from 40+ lifelike personas. Train the agent on your scripts, FAQs, objections and product knowledge.",
    tag: "Week 2",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "CRM & Workflow Integration",
    desc: "Connect your agent to HubSpot, Salesforce, GHL or any CRM. Build automation workflows in n8n or Zapier — full sync from day one.",
    tag: "Week 3",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Deploy & Optimise",
    desc: "Go live with a soft launch, monitor key metrics and continuously optimise — A/B testing scripts, tuning sentiment thresholds and expanding use cases.",
    tag: "Week 4+",
    icon: (
      <svg className="va-proc-icon" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

function VoiceProcess() {
  return (
    <section id="va-process" className="s va-process">
      <div className="container">
        <Reveal>
          <span className="s-label">Our Process</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="s-h">
            From idea to live
            <br />
            agent in 4 weeks.
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

const voiceReviews = [
  {
    text: "SAAZ deployed our voice agent across every inbound line. It answers within one ring, qualifies callers and pushes a fully-tagged contact into HubSpot before the call even ends. We haven't missed a lead since go-live.",
    initials: "JK",
    name: "James Kowalski",
    role: "CEO, RealtyPro Group",
  },
  {
    text: "Our tier-1 support queue is now handled entirely by the SAAZ voice agent. Billing questions, onboarding walkthroughs, cancellation recovery — it does it all. CSAT went up 28 points in the first month.",
    initials: "SM",
    name: "Sarah Mitchell",
    role: "VP Customer Success, CloudBase",
  },
  {
    text: "HubSpot and n8n integration took two days. Every call is transcribed, summarised and actioned automatically. Our closers only speak to leads that are genuinely ready — revenue per rep is up 40%.",
    initials: "AT",
    name: "Amir Tehrani",
    role: "Head of Revenue, Nexus Health",
  },
  {
    text: "SAAZ built us a multi-language agent handling English, Spanish and Portuguese for our LATAM expansion. The voice quality is indistinguishable from a native speaker. Callers have no idea they're talking to AI.",
    initials: "LC",
    name: "Laura Campos",
    role: "COO, ExpansionCo",
  },
  {
    text: "The outbound campaign agent re-engaged 3,200 cold leads in 48 hours and booked 140 demo calls. Our BDR team would have taken three months to hit those numbers manually. ROI was positive on day one.",
    initials: "DV",
    name: "Daniel Vasquez",
    role: "Founder, GrowthStack",
  },
  {
    text: "What stands out is how the agent handles objections — it pivots, empathises and guides the conversation exactly like a trained closer would. The Zapier and Salesforce sync means nothing falls through the cracks.",
    initials: "NP",
    name: "Nadia Petrov",
    role: "Marketing Director, FlowSuite",
  },
];

function VoiceReviews() {
  return (
    <section id="reviews" className="reviews-light">
      <div className="reviews-light-shell">
        <h2 className="reviews-light-title">
          Words from clients who deployed our voice agents.
        </h2>

        <div className="reviews-light-grid">
          {voiceReviews.map((review, i) => (
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
    q: "How human-sounding are your voice agents?",
    a: "Our agents use the latest ElevenLabs and Deepgram voice models, achieving naturalness scores above 4.7/5 in blind tests. They handle interruptions, pauses, filler words and tone shifts exactly as a human rep would — most callers don't realise they're speaking with AI.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "We have native integrations with HubSpot, Salesforce, GoHighLevel, Pipedrive, Zoho, and Close.io. We also support any CRM via custom webhook, Zapier, Make or n8n workflows — so if it has an API, we can connect to it.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most deployments go live in 3–4 weeks. Week 1 is discovery and strategy, week 2 is voice design and script training, week 3 is CRM/workflow integration and testing, and week 4 is a supervised soft launch with optimisation.",
  },
  {
    q: "Can the agent handle complex objections or edge cases?",
    a: "Yes. We train the agent on your specific objections, FAQs and edge cases during onboarding. For truly complex scenarios, the agent can seamlessly transfer to a human rep with a full briefing — the caller never notices the handoff.",
  },
  {
    q: "Is call data secure and GDPR/HIPAA compliant?",
    a: "All calls are encrypted in transit and at rest. We support GDPR-compliant data residency options (EU servers) and can configure HIPAA-compliant deployments for healthcare clients with BAA agreements. Call recordings and transcripts are retained per your policy.",
  },
  {
    q: "What happens if the AI doesn't know the answer?",
    a: "You define escalation rules. The agent can say 'let me get a specialist for you' and transfer the call, or it can collect a callback request and trigger an automation in your CRM — ensuring no lead is ever lost due to an unanswered question.",
  },
];

function VoiceFaq() {
  const { openBooking } = useBooking();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="va-faq" className="s va-faq">
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
                specific use case in detail.
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
function VoiceCta() {
  const { openBooking } = useBooking();
  return (
    <section id="va-cta" className="va-cta">
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
            DEPLOY
            <br />
            YOUR AGENT.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="va-cta-bar" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="va-cta-sub">
            Book a free strategy call. We&apos;ll map your call flow, show you a live demo and
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
            href="#va-integrations"
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
function VoiceAgentsInner() {
  useScrollReveal();
  useSmoothAnchorLinks();

  return (
    <>
      <CustomCursor />
      <Nav />
      <ScrollToTop />
      <main>
        <VoiceHero />
        <VoiceStats />
        <VoiceServices />
        <VoiceMarquee />
        <VoiceDemoStrip />
        <VoiceCrmIntegrations />
        <VoiceWorkflow />
        <VoicePortfolio />
        <VoiceProcess />
        <VoiceReviews />
        <VoiceFaq />
        <VoiceCta />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}

export default function VoiceAgentsClient() {
  return (
    <BookingProvider>
      <VoiceAgentsInner />
    </BookingProvider>
  );
}
