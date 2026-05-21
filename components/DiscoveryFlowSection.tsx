"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

/* ============================================================
   Hero Section — "Automate everything"
   Single-file Next.js component. Requires framer-motion.
   ============================================================ */

type ToolCard = {
  name: string;
  category: string;
  metric: string;
  delta: string;
  logoBg: string;
  logoChar: string;
};

const TOOLS: ToolCard[] = [
  { name: "Zapier",       category: "Workflows",   metric: "2.1M users", delta: "+12.4%", logoBg: "#FF4A00", logoChar: "Z" },
  { name: "Make",         category: "Automation",  metric: "850K users", delta: "+18.2%", logoBg: "#6D00CC", logoChar: "M" },
  { name: "n8n",          category: "Open source", metric: "420K users", delta: "+24.1%", logoBg: "#EA4B71", logoChar: "n" },
  { name: "Pipedream",    category: "Dev tools",   metric: "180K users", delta: "+9.8%",  logoBg: "#23D366", logoChar: "P" },
  { name: "Workato",      category: "Enterprise",  metric: "$420M ARR",  delta: "+15.6%", logoBg: "#F23A30", logoChar: "W" },
  { name: "IFTTT",        category: "Consumer",    metric: "27M users",  delta: "+4.2%",  logoBg: "#1A1A1A", logoChar: "I" },
  { name: "Bardeen",      category: "AI agent",    metric: "120K users", delta: "+31.5%", logoBg: "#7C3AED", logoChar: "B" },
  { name: "ActivePieces", category: "Open source", metric: "60K users",  delta: "+42.0%", logoBg: "#6366F1", logoChar: "A" },
  { name: "Tray.io",      category: "Enterprise",  metric: "$180M ARR",  delta: "+11.3%", logoBg: "#00B8D9", logoChar: "T" },
];

const AUTOMATION_LOGOS = [
  { name: "Make", short: "M", bg: "linear-gradient(135deg, #7F56D9, #5B21B6)" },
  { name: "Zapier", short: "Z", bg: "linear-gradient(135deg, #FF5A1F, #EA4B00)" },
  { name: "n8n", short: "n", bg: "linear-gradient(135deg, #EF476F, #C81E4F)" },
  { name: "HubSpot", short: "H", bg: "linear-gradient(135deg, #FF8A3D, #E46415)" },
  { name: "Airtable", short: "A", bg: "linear-gradient(135deg, #38BDF8, #2563EB)" },
] as const;

/* Build 3 rows of tools — each row has its own sequence */
const buildRows = (): ToolCard[][] => {
  const rows: ToolCard[][] = [[], [], []];
  TOOLS.forEach((t, i) => rows[i % 3].push(t));
  return rows;
};

export default function AutomationHero() {
  const rows = useMemo(buildRows, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="hero">
        {/* Top content */}
        <div className="hero__top">
          <h1 className="hero__title">
            Automate <span className="hero__title--accent">everything</span>
            <br />you used to do manually
          </h1>
          <p className="hero__sub">
            One platform to connect your apps, run AI workflows, and watch your
            back-office work itself — while you sleep.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary">Start Free Trial</button>
            <button className="btn btn--ghost">
              <span className="btn__dot" />
              Watch demo
            </button>
          </div>
        </div>

        {/* SAAZ badge — sits above the row band */}
        <div className="saaz-badge-wrap">
          <motion.div
            className="saaz-badge"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <NodeIcon />
            <div className="saaz-badge__glow" />
          </motion.div>
        </div>

        {/* Flow canvas */}
        <div className="flow">
          {/* Center spine sits behind cards */}
          <div className="spine">
            <div className="spine__line" />
          </div>

          {/* Three full-width rows; cards pass over the spine */}
          <div className="rows">
            {rows.map((row, idx) => (
              <FlowRow key={idx} row={row} rowIdx={idx} />
            ))}
          </div>

          {/* Bottom funnel — sits ABOVE rows so cards pass behind it */}
          <Funnel />

          <div className="automation-logos" aria-label="Automation platform logos">
            <div className="automation-logos-heading">AI Automation</div>
            {AUTOMATION_LOGOS.map((logo) => (
              <span key={logo.name} className="automation-logo-pill" title={logo.name}>
                <span className="automation-logo-icon" style={{ background: logo.bg }}>
                  {logo.short}
                </span>
                <span className="automation-logo-name">{logo.name}</span>
              </span>
            ))}
          </div>

          {/* Edge fades — outermost layer */}
          <div className="edge edge--left" />
          <div className="edge edge--right" />
        </div>
      </section>
    </>
  );
}

/* ============================================================
   FlowRow
   One continuous horizontal track spanning the full width.
   Items move left → right at constant speed.
   Each item swaps from skeleton to tool card the moment it
   crosses the center line.
   ============================================================ */
function FlowRow({ row, rowIdx }: { row: ToolCard[]; rowIdx: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Per-row config: cards stay straight, only speed varies per row
  const speeds = [14, 18, 16]; // seconds for one full loop — faster
  const tilt = 0;
  const speed = speeds[rowIdx];

  // Measure container width
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => setContainerWidth(containerRef.current?.offsetWidth || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Build enough copies of the row to fill the track twice (for seamless loop)
  // Stagger start positions so items are spread evenly
  const items = useMemo(() => {
    const out: ToolCard[] = [];
    // 3 sets of the row, shuffled phase per row index
    const shift = rowIdx % row.length;
    const shifted = [...row.slice(shift), ...row.slice(0, shift)];
    for (let i = 0; i < 3; i++) out.push(...shifted);
    return out;
  }, [row, rowIdx]);

  const isTablet = containerWidth > 0 && containerWidth <= 900;
  const isMobile = containerWidth > 0 && containerWidth <= 600;

  // Spacing and card width are responsive for smaller screens.
  const GAP = isMobile ? 14 : isTablet ? 22 : 40;
  const CARD_W = isMobile
    ? Math.max(182, Math.min(230, containerWidth * 0.64))
    : isTablet
      ? Math.max(220, Math.min(252, containerWidth * 0.46))
      : 270;
  const STEP = CARD_W + GAP;

  // Track total width = items × step
  const trackWidth = items.length * STEP;

  // Animation: translate the track from -trackWidth/3 (one set offscreen left)
  // to 0 (loops back). Distance covered = trackWidth/3 per cycle.
  const x = useMotionValue(0);
  const loopDistance = trackWidth / 3;

  useAnimationFrame((time) => {
    if (loopDistance === 0) return;
    const pxPerSec = loopDistance / speed;
    const offset = ((time / 1000) * pxPerSec) % loopDistance;
    // Start with one set off-screen to the left so items enter from the left edge
    x.set(-loopDistance + offset);
  });

  return (
    <div className="row" ref={containerRef}>
      <motion.div
        ref={trackRef}
        className="row__track"
        style={{ x, width: trackWidth, gap: `${GAP}px` }}
      >
        {items.map((tool, i) => (
          <FlowItem
            key={`${rowIdx}-${i}`}
            tool={tool}
            cardWidth={CARD_W}
            tilt={tilt}
            itemIndex={i}
            step={STEP}
            trackX={x}
            containerWidth={containerWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   FlowItem
   Renders BOTH the skeleton and the tool card stacked.
   Cross-fades between them based on the item's current X
   position relative to the container center.
   ============================================================ */
function FlowItem({
  tool,
  cardWidth,
  tilt,
  itemIndex,
  step,
  trackX,
  containerWidth,
}: {
  tool: ToolCard;
  cardWidth: number;
  tilt: number;
  itemIndex: number;
  step: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
  containerWidth: number;
}) {
  // Item's left edge in viewport = trackX + itemIndex*step
  // Item's center in viewport = trackX + itemIndex*step + cardWidth/2
  // Container center = containerWidth / 2
  // We want skeleton when center < containerCenter, tool when center >= containerCenter.

  // Transition zone: ±30px around the center, so the swap looks instant but
  // crossfade is smooth enough to not flicker.
  const skeletonOpacity = useTransform(trackX, (tx) => {
    if (containerWidth === 0) return 1;
    const itemCenter = tx + itemIndex * step + cardWidth / 2;
    const containerCenter = containerWidth / 2;
    const diff = itemCenter - containerCenter; // negative = left of center
    if (diff < -30) return 1;
    if (diff > 30) return 0;
    return 1 - (diff + 30) / 60;
  });

  const toolOpacity = useTransform(trackX, (tx) => {
    if (containerWidth === 0) return 0;
    const itemCenter = tx + itemIndex * step + cardWidth / 2;
    const containerCenter = containerWidth / 2;
    const diff = itemCenter - containerCenter;
    if (diff < -30) return 0;
    if (diff > 30) return 1;
    return (diff + 30) / 60;
  });

  return (
    <div className="item" style={{ width: cardWidth, transform: `rotate(${tilt}deg)` }}>
      <motion.div className="item__layer" style={{ opacity: skeletonOpacity }}>
        <Skeleton />
      </motion.div>
      <motion.div className="item__layer" style={{ opacity: toolOpacity }}>
        <ToolCardView tool={tool} />
      </motion.div>
    </div>
  );
}

/* ============================================================
   Skeleton card
   ============================================================ */
function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__avatar" />
      <div className="skeleton__lines">
        <div className="skeleton__line skeleton__line--long" />
        <div className="skeleton__line skeleton__line--short" />
      </div>
    </div>
  );
}

/* ============================================================
   Real tool card
   ============================================================ */
function ToolCardView({ tool }: { tool: ToolCard }) {
  return (
    <div className="card">
      <div className="card__logo" style={{ background: tool.logoBg }}>
        {tool.logoChar}
      </div>
      <div className="card__body">
        <div className="card__name">{tool.name}</div>
        <div className="card__cat">{tool.category}</div>
      </div>
      <div className="card__metric">
        <div className="card__metric-val">{tool.metric}</div>
        <div className="card__metric-delta">↑ {tool.delta}</div>
      </div>
    </div>
  );
}

/* ============================================================
   Center node content — SAAZ wordmark
   ============================================================ */
function NodeIcon() {
  return <div className="spine__node-text">SAAZ</div>;
}

/* ============================================================
   Bottom funnel/bell
   ============================================================ */
function Funnel() {
  return (
    <svg
      className="funnel"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMin meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="funnelFill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FB3640" stopOpacity="1" />
          <stop offset="60%" stopColor="#FB3640" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FB3640" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="funnelEdge" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FF6B73" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FB3640" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M598 0 L602 0 L602 120
           C 602 280, 900 360, 1200 460
           L 1200 500 L 0 500 L 0 460
           C 300 360, 598 280, 598 120 Z"
        fill="url(#funnelFill)"
      />
      <path
        d="M598 0 L602 0 L602 120
           C 602 280, 900 360, 1200 460"
        fill="none"
        stroke="url(#funnelEdge)"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M598 120 C 598 280, 300 360, 0 460"
        fill="none"
        stroke="url(#funnelEdge)"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

/* ============================================================
   Styles
   ============================================================ */
const styles = `
:root {
  --bg-0: #0A0A0F;
  --bg-1: #0E0E16;
  --primary: #FB3640;
  --primary-2: #B8202A;
  --primary-3: #FF6B73;
  --brand: #FB3640;
  --brand-soft: rgba(251, 54, 64, 0.95);
  --text-0: #FFFFFF;
  --text-1: rgba(255,255,255,0.72);
  --text-2: rgba(255,255,255,0.48);
  --border: rgba(255,255,255,0.08);
  --card-bg-strong: rgba(20,20,30,0.85);
  --skeleton: rgba(255,255,255,0.06);
  --skeleton-hi: rgba(255,255,255,0.10);
}

.hero {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(251,54,64,0.18), transparent 70%),
    radial-gradient(900px 500px at 50% 110%, rgba(184,32,42,0.12), transparent 70%),
    var(--bg-0);
  color: var(--text-0);
  overflow: hidden;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  padding: 80px 0 0;
}

/* ---------- Top content ---------- */
.hero__top {
  position: relative;
  z-index: 5;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  padding: 0 24px;
}
.hero__title {
  font-size: clamp(36px, 5.2vw, 64px);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
}
.hero__title--accent {
  color: var(--brand);
}
.hero__sub {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-1);
  margin: 0 auto 28px;
  max-width: 520px;
}
.hero__cta {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}
.btn {
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 11px 20px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn--primary {
  background: var(--brand);
  color: white;
  box-shadow: 0 8px 24px rgba(251,54,64,0.35);
}
.btn--primary:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(251,54,64,0.45); }
.btn--ghost {
  background: rgba(255,255,255,0.04);
  border-color: var(--border);
  color: var(--text-0);
}
.btn--ghost:hover { background: rgba(255,255,255,0.08); }
.btn__dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #E91E8C;
  box-shadow: 0 0 8px #E91E8C;
}

/* ---------- Flow canvas ---------- */
.flow {
  position: relative;
  margin-top: 10px;
  margin-bottom: 40px;
  height: 520px;
  width: 100%;
}

.rows {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
  padding: 20px 0;
  z-index: 2;
}

.row {
  position: relative;
  width: 100%;
  height: 76px;
  overflow: visible;
}
.row__track {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  will-change: transform;
}

/* ---------- Item wrapper (holds skeleton + card stacked) ---------- */
.item {
  position: relative;
  flex: 0 0 auto;
  height: 64px;
  transform-origin: center;
}
.item__layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- Skeleton ---------- */
.skeleton {
  width: 100%;
  height: 64px;
  background: var(--skeleton);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  backdrop-filter: blur(8px);
  box-sizing: border-box;
}
.skeleton__avatar {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: var(--skeleton-hi);
  flex-shrink: 0;
}
.skeleton__lines { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.skeleton__line { height: 8px; background: var(--skeleton-hi); border-radius: 4px; }
.skeleton__line--long  { width: 80%; }
.skeleton__line--short { width: 55%; }

/* ---------- Tool card ---------- */
.card {
  width: 100%;
  height: 64px;
  background: var(--card-bg-strong);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,54,64,0.05) inset;
  box-sizing: border-box;
}
.card__logo {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}
.card__body { flex: 1; min-width: 0; overflow: hidden; }
.card__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-0);
  line-height: 1.2;
  white-space: nowrap;
}
.card__cat {
  font-size: 11px;
  color: var(--text-2);
  margin-top: 2px;
  white-space: nowrap;
}
.card__metric { text-align: right; flex-shrink: 0; }
.card__metric-val {
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
  white-space: nowrap;
}
.card__metric-delta {
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  color: #22D3A6;
  background: rgba(34,211,166,0.12);
  border-radius: 4px;
  padding: 1px 5px;
  margin-top: 2px;
  white-space: nowrap;
}

/* ---------- Center spine ---------- */
.spine {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 100%;
  width: 4px;
  z-index: 3;
  pointer-events: none;
}
.spine__line {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(180deg,
    rgba(251,54,64,0) 0%,
    rgba(251,54,64,0.4) 8%,
    var(--primary) 30%,
    var(--primary) 65%,
    rgba(251,54,64,0) 100%);
  box-shadow:
    0 0 12px rgba(251,54,64,0.6),
    0 0 24px rgba(251,54,64,0.3);
}

/* SAAZ badge — positioned above the row band, centered horizontally */
.saaz-badge-wrap {
  position: relative;
  z-index: 6;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: -20px; /* overlap into the flow so the spine appears to emerge from below it */
}
.saaz-badge {
  position: relative;
  width:  90px;
  height: 50px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
  display: flex;
  align-items: center;
  justify-content: center; 
}
.spine__node-text {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.10em;
  color: #FFFFFF;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
  opacity: 1;
  filter: none;
}
.saaz-badge__glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(251,54,64,0.45) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(1.2px);
  animation: saaz-glow-fade 2.8s ease-in-out infinite alternate;
}

@keyframes saaz-glow-fade {
  0% {
    opacity: 0.56;
    filter: blur(1px);
  }
  100% {
    opacity: 0.14;
    filter: blur(3.8px);
  }
}

/* ---------- Funnel ---------- */
.funnel {
  position: absolute;
  left: 0;
  bottom: -160px;
  width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 4;
}

.automation-logos {
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(251, 54, 64, 0.18), rgba(251, 54, 64, 0.06));
  backdrop-filter: blur(8px);
}

.automation-logos-heading {
  width: 100%;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
}

.automation-logo-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 9px 5px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.automation-logo-icon {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.01em;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
}

.automation-logo-name {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
}

/* ---------- Edge fades — extend dark to outer edges ---------- */
.edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 32%;
  pointer-events: none;
  z-index: 5;
}
.edge--left {
  left: 0;
  background: linear-gradient(90deg,
    var(--bg-0) 0%,
    var(--bg-0) 35%,
    rgba(10,10,15,0.7) 65%,
    transparent 100%);
  backdrop-filter: blur(6px);
  -webkit-mask-image: linear-gradient(90deg, black 0%, black 60%, transparent 100%);
          mask-image: linear-gradient(90deg, black 0%, black 60%, transparent 100%);
}
.edge--right {
  right: 0;
  background: linear-gradient(270deg,
    var(--bg-0) 0%,
    var(--bg-0) 35%,
    rgba(10,10,15,0.7) 65%,
    transparent 100%);
  backdrop-filter: blur(6px);
  -webkit-mask-image: linear-gradient(270deg, black 0%, black 60%, transparent 100%);
          mask-image: linear-gradient(270deg, black 0%, black 60%, transparent 100%);
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero {
    min-height: 92vh;
    padding-top: 64px;
  }
  .hero__top {
    max-width: 640px;
    padding: 0 18px;
  }
  .hero__title {
    font-size: clamp(34px, 8vw, 48px);
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .hero__sub {
    font-size: 15px;
    line-height: 1.55;
    margin-bottom: 20px;
    max-width: 500px;
  }
  .hero__cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
  .btn {
    padding: 10px 16px;
    font-size: 13px;
  }
  .flow { height: 430px; margin-top: 8px; }
  .rows { gap: 20px; }
  .row { height: 68px; }
  .skeleton, .card { height: 58px; border-radius: 11px; }
  .skeleton__avatar, .card__logo { width: 34px; height: 34px; border-radius: 9px; }
  .card__name { font-size: 12px; }
  .card__cat { font-size: 10px; }
  .card__metric-val { font-size: 11px; }
  .card__metric-delta { font-size: 9px; }
  .edge { width: 40%; }
  .funnel { bottom: -120px; }
  .automation-logos {
    gap: 8px;
    padding: 6px 10px;
    bottom: 4px;
  }
  .automation-logos-heading {
    font-size: 10px;
    margin-bottom: -1px;
  }
  .automation-logo-pill {
    padding: 4px 8px 4px 4px;
    gap: 6px;
  }
  .automation-logo-icon {
    width: 20px;
    height: 20px;
    font-size: 11px;
  }
  .automation-logo-name {
    font-size: 10px;
  }
  .saaz-badge-wrap { margin-top: 34px; margin-bottom: -16px; }
  .saaz-badge { width: 112px; height: 64px; border-radius: 18px; }
  .spine__node-text { font-size: 22px; }
}
@media (max-width: 600px) {
  .hero {
    min-height: 88vh;
    padding-top: 48px;
  }
  .hero__top {
    padding: 0 14px;
  }
  .hero__title {
    font-size: clamp(28px, 9.2vw, 38px);
    line-height: 1.14;
    margin-bottom: 14px;
  }
  .hero__sub {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 16px;
    max-width: 95%;
  }
  .hero__cta {
    width: 100%;
    gap: 8px;
  }
  .btn {
    min-height: 40px;
    font-size: 12px;
    border-radius: 9px;
    padding: 10px 14px;
  }
  .flow { height: 390px; margin-bottom: 24px; }
  .rows { gap: 14px; padding: 12px 0; }
  .row { height: 60px; }
  .skeleton, .card {
    height: 52px;
    padding: 8px 10px;
    gap: 9px;
    border-radius: 10px;
  }
  .skeleton__avatar, .card__logo { width: 30px; height: 30px; border-radius: 8px; }
  .card__logo { font-size: 14px; }
  .card__name { font-size: 11px; }
  .card__cat { font-size: 9px; margin-top: 1px; }
  .card__metric-val { font-size: 10px; }
  .card__metric-delta { font-size: 8px; padding: 1px 4px; }
  .edge { width: 46%; }
  .funnel { bottom: -70px; }
  .automation-logos {
    max-width: calc(100vw - 24px);
    overflow-x: auto;
    justify-content: flex-start;
    -ms-overflow-style: none;
    scrollbar-width: none;
    gap: 7px;
    padding: 6px 8px;
    bottom: 2px;
  }
  .automation-logos-heading {
    text-align: left;
    font-size: 9px;
    margin-bottom: -1px;
  }
  .automation-logos::-webkit-scrollbar { display: none; }
  .automation-logo-pill {
    flex: 0 0 auto;
    padding: 4px 7px 4px 4px;
  }
  .automation-logo-icon {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    font-size: 10px;
  }
  .automation-logo-name {
    font-size: 9px;
  }
  .saaz-badge-wrap { margin-top: 18px; margin-bottom: -10px; }
  .saaz-badge { width: 92px; height: 54px; border-radius: 16px; }
  .spine__node-text { font-size: 20px; letter-spacing: 0.08em; }
}
`;