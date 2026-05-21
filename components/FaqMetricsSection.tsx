"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const floatClasses = [
  "faqm-metric-float-a",
  "faqm-metric-float-b",
  "faqm-metric-float-c",
  "faqm-metric-float-d",
];

const metrics = [
  { label: "Agentic AI workflows live", value: "180+" },
  { label: "Trading bots in production", value: "320+" },
  { label: "Automation uptime", value: "99.2%" },
  { label: "Avg. execution latency cut", value: "6x" },
];

const faqs = [
  {
    q: "What is agentic AI and how is it different from a basic chatbot?",
    a: "Agentic AI plans multi-step tasks, calls tools, and adapts in real time. Unlike static chatbots, agents can research, decide, execute trades or ops actions, and report outcomes without constant human hand-holding.",
  },
  {
    q: "How do you build trading bots with proper risk controls?",
    a: "We define entry/exit rules, position sizing, exposure caps, kill-switches, and paper-trading phases before go-live. Every bot ships with live P&L dashboards and alert thresholds your team controls.",
  },
  {
    q: "Can agentic workflows automate business operations beyond trading?",
    a: "Yes. The same agent stack handles CRM updates, lead routing, invoicing, onboarding, and internal approvals—so sales, ops, and finance run on one reliable automation layer.",
  },
  {
    q: "How fast can we launch a trading or automation pilot?",
    a: "Most pilots start with one high-impact workflow in under two weeks: scoped agents, API connections, and a monitored sandbox before production rollout.",
  },
  {
    q: "Do agents and trading bots integrate with our existing stack?",
    a: "We connect brokers, CRMs, spreadsheets, payment rails, and comms channels via secure APIs. Agents read and write only what your policies allow, with full audit trails.",
  },
  {
    q: "How do you keep agentic AI and trading automation secure?",
    a: "Role-based access, encrypted transfers, environment isolation, and deployment-specific secrets. Trading keys and customer data never share the same runtime without explicit controls.",
  },
];

export default function FaqMetricsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="automation-faq" className="faqm-section">
      <div className="faqm-shell">
        <div className="faqm-head">
          <h2>Agentic AI &amp; Automation</h2>
          <p>
            Answers on agentic AI, business automation, and production-grade trading bots.
            <br />
            Built for teams that need autonomous workflows with control, speed, and clarity.
          </p>
          <a href="#portfolio" className="faqm-cta">
            Visit Trading Bot Portfolio
          </a>
        </div>

        <div className="faqm-grid">
          <div className="faqm-metrics">
            {metrics.map((item, idx) => (
              <motion.div
                key={item.label}
                className={`faqm-metric-wrap ${floatClasses[idx]}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <motion.article
                  className="faqm-metric-card"
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <span className="faqm-metric-index" aria-hidden>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="faqm-metric-label">{item.label}</p>
                  <p className="faqm-metric-value">{item.value}</p>
                  <span className="faqm-metric-shine" aria-hidden />
                </motion.article>
              </motion.div>
            ))}
          </div>

          <div className="faqm-faq-list">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.article
                  key={item.q}
                  className={`faqm-item${isOpen ? " is-open" : ""}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                >
                  <button
                    type="button"
                    className="faqm-trigger"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="faqm-plus" aria-hidden>
                      +
                    </span>
                  </button>
                  <div
                    className="faqm-answer-panel"
                    aria-hidden={!isOpen}
                  >
                    <div className="faqm-answer-inner">
                      <p className="faqm-answer">{item.a}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
