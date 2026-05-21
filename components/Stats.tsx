"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const statCards = [
  {
    id: "coverage",
    value: "24/7",
    accent: false,
    desc: "Coverage. Nights, weekends, holidays. Your AI never sleeps.",
    position: "impact-card-tr",
    delay: 0.15,
    floatClass: "impact-float-a",
  },
  {
    id: "zero",
    value: "0",
    accent: true,
    countUp: 0,
    desc: "Leads lost to slow follow-up or forgotten tasks",
    position: "impact-card-ml",
    delay: 0.28,
    floatClass: "impact-float-b",
  },
  {
    id: "improvement",
    value: "30%+",
    accent: true,
    countUp: 30,
    suffix: "%+",
    desc: "Improvement in qualified conversations reaching your closers",
    position: "impact-card-bc",
    delay: 0.4,
    floatClass: "impact-float-c",
  },
  {
    id: "response",
    value: "<60 sec",
    accent: false,
    desc: "Response time to new leads before interest goes cold",
    position: "impact-card-br",
    delay: 0.52,
    floatClass: "impact-float-d",
  },
] as const;

function CountUp({
  end,
  suffix = "",
  duration = 1.6,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame = 0;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function StatValue({ card }: { card: (typeof statCards)[number] }) {
  if ("countUp" in card && card.countUp === 30) {
    return (
      <span className="impact-card-value impact-card-value-accent">
        <CountUp end={30} suffix="%+" />
      </span>
    );
  }
  if ("countUp" in card && card.countUp === 0) {
    return (
      <span className="impact-card-value impact-card-value-accent">
        <CountUp end={0} />
      </span>
    );
  }
  return (
    <span
      className={`impact-card-value ${card.accent ? "impact-card-value-accent" : ""}`}
    >
      {card.value}
    </span>
  );
}

function StatCard({
  card,
  children,
}: {
  card: (typeof statCards)[number];
  children: ReactNode;
}) {
  return (
    <article className={`impact-stat-card ${card.position}`}>
      <motion.div
        className={`impact-stat-card-float ${card.floatClass}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease, delay: card.delay }}
      >
        <motion.div
          className="impact-stat-card-inner"
          whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
        >
          <motion.div className="impact-card-top">{children}</motion.div>
          <p className="impact-card-desc">{card.desc}</p>
        </motion.div>
      </motion.div>
    </article>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="impact-section impact-quantified" aria-labelledby="impact-heading">
      <motion.div
        className="impact-quantified-head"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="impact-pill">Key Stats</span>
      </motion.div>

      <motion.div
        className="impact-quantified-stage"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.h2
          id="impact-heading"
          className="impact-display-title"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease, delay: 0.05 }}
        >
          <span className="impact-display-prefix">The Impact,</span>
          <span className="impact-display-mega">Quantified</span>
        </motion.h2>

        {statCards.map((card) => (
          <StatCard key={card.id} card={card}>
            <StatValue card={card} />
          </StatCard>
        ))}
      </motion.div>
    </section>
  );
}
