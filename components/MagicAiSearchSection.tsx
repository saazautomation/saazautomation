"use client";

import { motion } from "framer-motion";

const SEARCH_QUERIES = [
  "Why do leads go cold before my team calls back?",
  "How do I stop losing deals to slow follow-up?",
  "Can AI handle after-hours inbound without hiring?",
  "Where is manual CRM work burning the most hours?",
  "How do I cut no-shows without more front-desk staff?",
  "What workflows still break every time someone is out?",
  "How do I sync voice agents, CRM, and billing automatically?",
] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const loopQueries = [...SEARCH_QUERIES, ...SEARCH_QUERIES];

function SearchTrack({ variant }: { variant: "muted" | "active" }) {
  return (
    <ul
      className={`magic-search-track magic-search-track--${variant}`}
      aria-hidden={variant === "active"}
    >
      {loopQueries.map((query, index) => (
        <li key={`${variant}-${index}`} className="magic-search-line">
          <span className="magic-search-line-text">{query}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MagicAiSearchSection() {
  return (
    <section
      id="magic-search"
      className="magic-search-section"
      aria-labelledby="magic-search-heading"
    >
      <motion.div className="magic-search-glow magic-search-glow--left" aria-hidden />
      <motion.div className="magic-search-glow magic-search-glow--right" aria-hidden />

      <div className="magic-search-inner">
        <motion.header
          className="magic-search-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 id="magic-search-heading" className="magic-search-title">
            NEW: Magic AI Search
          </h2>
          <p className="magic-search-subtitle">
            Ask about the automation bottlenecks slowing your business — missed
            follow-ups, manual CRM work, after-hours gaps — and get AI-ready answers.
          </p>
          <a href="#cta" className="magic-search-cta">
            Learn More
          </a>
        </motion.header>

        <motion.div
          className="magic-search-stage"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
        >
          <motion.div className="magic-search-fade magic-search-fade--top" aria-hidden />
          <motion.div className="magic-search-fade magic-search-fade--bottom" aria-hidden />

          <motion.div className="magic-search-viewport">
            <SearchTrack variant="muted" />
          </motion.div>

          <motion.div className="magic-search-bar" role="presentation">
            <span className="magic-search-icon magic-search-icon--add" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2.5v9M2.5 7h9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <motion.div className="magic-search-bar-window" aria-hidden>
              <SearchTrack variant="active" />
            </motion.div>

            <span
              className="magic-search-icon magic-search-icon--submit"
              aria-hidden
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 11V3M7 3L4.25 5.75M7 3l2.75 2.75"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
