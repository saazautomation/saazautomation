"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type ShowcaseItem = {
  src: string;
  alt: string;
  size: "wide" | "tall" | "mid" | "hero";
};

const row1: ShowcaseItem[] = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    alt: "Automation dashboard on laptop",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    alt: "Bold brand typography layout",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    alt: "Mobile product interface",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    alt: "Analytics control panel",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    alt: "Workflow automation UI",
    size: "mid",
  },
];

const row2: ShowcaseItem[] = [
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80",
    alt: "Mobile app dark theme",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&q=80",
    alt: "Marketing landing page",
    size: "hero",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    alt: "Team collaboration workspace",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    alt: "Code and product build",
    size: "mid",
  },
];

type JourneyStoryCard = {
  src: string;
  alt: string;
  user: string;
  stat: string;
  label: string;
};

const journeyStories: JourneyStoryCard[] = [
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50e?w=640&q=80",
    alt: "Trader reviewing live P&L dashboard",
    user: "@alex_trades",
    stat: "+18.4%",
    label: "30-day ROI",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=640&q=80",
    alt: "Healthy meal prep for focused trading routine",
    user: "@maya_fx",
    stat: "94%",
    label: "Win rate",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=640&q=80",
    alt: "Morning workout before market open",
    user: "@sam_quant",
    stat: "2.1ms",
    label: "Avg latency",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
    alt: "Trading analytics on multiple screens",
    user: "@desk_ops",
    stat: "320+",
    label: "Bots live",
  },
  {
    src: "https://images.unsplash.com/photo-1546487190-681a385c0a28?w=640&q=80",
    alt: "Recovery and performance tracking",
    user: "@lina_auto",
    stat: "24/7",
    label: "Uptime",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&q=80",
    alt: "Automation workflow metrics",
    user: "@growth_ai",
    stat: "+42%",
    label: "Efficiency",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&q=80",
    alt: "Mobile trading bot controls",
    user: "@mobile_fx",
    stat: "$1.2M",
    label: "Volume",
  },
  {
    src: "https://images.unsplash.com/photo-1559757142-5c350d0d3c56?w=640&q=80",
    alt: "Health metrics alongside trading goals",
    user: "@well_trader",
    stat: "12k",
    label: "Steps",
  },
];

const row3: ShowcaseItem[] = [
  {
    src: "https://images.unsplash.com/photo-1525547719571-a2d4ac903d0e?w=900&q=80",
    alt: "Hardware and software bundle",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1551650972-87deedd944c3?w=500&q=80",
    alt: "Mobile metrics chart UI",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80",
    alt: "Portrait-led brand story",
    size: "hero",
  },
  {
    src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
    alt: "Spreadsheet automation view",
    size: "mid",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
    alt: "Robotics operations dashboard",
    size: "wide",
  },
];

function JourneyStoryCardItem({ card }: { card: JourneyStoryCard }) {
  return (
    <article className="portfolio-journey-card">
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="220px"
        className="portfolio-journey-card-img"
      />
      <div className="portfolio-journey-card-overlay" aria-hidden>
        <div className="portfolio-journey-card-top">
          <span className="portfolio-journey-card-avatar" />
          <span className="portfolio-journey-card-user">{card.user}</span>
        </div>
        <div className="portfolio-journey-card-widget">
          <span className="portfolio-journey-card-ring" />
          <div className="portfolio-journey-card-stat">
            <strong>{card.stat}</strong>
            <span>{card.label}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PortfolioJourneyCarousel() {
  const track = [...journeyStories, ...journeyStories];

  return (
    <section className="portfolio-journey" aria-labelledby="portfolio-journey-title">
      <div className="portfolio-journey-shell">
        <motion.h2
          id="portfolio-journey-title"
          className="portfolio-journey-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Join over 1 million members
          <br />
          on their health journey
        </motion.h2>

        <div className="portfolio-journey-carousel" aria-label="Trading bot portfolio stories">
          <div className="portfolio-journey-track">
            {track.map((card, idx) => (
              <JourneyStoryCardItem key={`${card.user}-${idx}`} card={card} />
            ))}
          </div>
        </div>

        <motion.div
          className="portfolio-journey-cta-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <a href="#demo-vault" className="portfolio-journey-cta">
            View Trading Bot Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <figure className={`portfolio-showcase-card portfolio-showcase-card--${item.size}`}>
      <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 42vw, 280px" className="portfolio-showcase-card-img" />
    </figure>
  );
}

function PortfolioScrollRow({
  items,
  direction,
  scrollYProgress,
  offset,
  rowClassName,
}: {
  items: ShowcaseItem[];
  direction: "right" | "left";
  scrollYProgress: MotionValue<number>;
  offset: [string, string];
  rowClassName?: string;
}) {
  const track = [...items, ...items];
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right" ? offset : [offset[1], offset[0]]
  );

  return (
    <div className={`portfolio-showcase-row ${rowClassName ?? ""}`.trim()}>
      <motion.div className="portfolio-showcase-track" style={{ x }}>
        {track.map((item, idx) => (
          <ShowcaseCard key={`${item.alt}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
    <section id="portfolio" ref={sectionRef} className="portfolio-showcase">
      <div className="portfolio-showcase-stage">
        <motion.header
          className="portfolio-showcase-intro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="portfolio-showcase-title">
            Design that speaks.
            <br />
            Delivery that converts.
          </h2>
          <p className="portfolio-showcase-lead">
            SAAZ Automation crafts focused digital experiences that captivate audiences and drive
            growth. Combining bold design with smart strategy, we elevate your brand to win and
            convert—seamlessly.
          </p>
          <div className="portfolio-showcase-actions">
            <a href="#about" className="portfolio-showcase-btn portfolio-showcase-btn--primary">
              About Us
            </a>
            <a href="#demo-vault" className="portfolio-showcase-btn portfolio-showcase-btn--ghost">
              See our work
            </a>
          </div>
        </motion.header>

        <div className="portfolio-showcase-gallery" aria-label="Portfolio work samples">
          <PortfolioScrollRow
            items={row1}
            direction="left"
            scrollYProgress={scrollYProgress}
            offset={["-8%", "9%"]}
            rowClassName="portfolio-showcase-row--1"
          />
          <PortfolioScrollRow
            items={row2}
            direction="right"
            scrollYProgress={scrollYProgress}
            offset={["11%", "-12%"]}
            rowClassName="portfolio-showcase-row--2"
          />
          <PortfolioScrollRow
            items={row3}
            direction="left"
            scrollYProgress={scrollYProgress}
            offset={["13%", "-10%"]}
            rowClassName="portfolio-showcase-row--3"
          />
        </div>
      </div>
    </section>
    <PortfolioJourneyCarousel />
    </>
  );
}
