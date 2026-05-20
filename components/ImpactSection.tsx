"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    let cancelled = false;
    const duration = 1400;
    const t0 = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, active]);

  return value;
}

function StatCard({
  target,
  suffix,
  label,
  description,
  float,
  accent,
  active,
}: (typeof stats)[0] & { active: boolean }) {
  const n = useCountUp(target, active);
  const floatClass =
    float === "tr"
      ? "impact-float-a"
      : float === "ml"
        ? "impact-float-b"
        : float === "bc"
          ? "impact-float-c"
          : "impact-float-d";
  const posClass =
    float === "tr"
      ? "impact-card-tr"
      : float === "ml"
        ? "impact-card-ml"
        : float === "bc"
          ? "impact-card-bc"
          : "impact-card-br";

  return (
    <div className={`impact-stat-card ${posClass}`}>
      <div className={`impact-stat-card-float ${floatClass}`}>
        <div className="impact-stat-card-inner">
          <div className="impact-card-top">
            <span className={`impact-card-value${accent ? " impact-card-value-accent" : ""}`}>
              {n}
              {suffix}
            </span>
          </div>
          <p className="impact-card-desc">
            <strong>{label}</strong>
            <br />
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      className="impact-section impact-quantified"
    >
      <div className="impact-quantified-head">
        <span className="impact-pill">The Impact, Quantified</span>
      </div>
      <div className="impact-quantified-stage">
        <h2 className="impact-display-title">
          <span className="impact-display-prefix">We deliver</span>
          <span className="impact-display-mega">results</span>
        </h2>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} active={active} />
        ))}
      </div>
    </section>
  );
}
