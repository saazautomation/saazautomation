"use client";

import { industries, type Industry } from "@/lib/industries";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type ShowcaseItem = {
  industry: Industry;
  size: "wide" | "tall" | "mid" | "hero";
  image: string;
};

const row1: ShowcaseItem[] = [
  { industry: industries[0], size: "wide", image: industries[0].galleryImage },
  { industry: industries[1], size: "tall", image: industries[1].image },
  { industry: industries[2], size: "tall", image: industries[2].galleryImage },
  { industry: industries[3], size: "wide", image: industries[3].image },
  { industry: industries[4], size: "mid", image: industries[4].galleryImage },
];

const row2: ShowcaseItem[] = [
  { industry: industries[4], size: "tall", image: industries[4].image },
  { industry: industries[0], size: "hero", image: industries[0].image },
  { industry: industries[1], size: "wide", image: industries[1].galleryImage },
  { industry: industries[2], size: "mid", image: industries[2].image },
];

const row3: ShowcaseItem[] = [
  { industry: industries[3], size: "wide", image: industries[3].galleryImage },
  { industry: industries[4], size: "tall", image: industries[4].backgroundImage },
  { industry: industries[1], size: "hero", image: industries[1].backgroundImage },
  { industry: industries[0], size: "mid", image: industries[0].backgroundImage },
  { industry: industries[2], size: "wide", image: industries[2].backgroundImage },
];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const { industry } = item;

  return (
    <a
      href={`#industry-${industry.id}`}
      className={`portfolio-showcase-card portfolio-showcase-card--${item.size} portfolio-showcase-card--link`}
      style={{ ["--card-accent" as string]: industry.accent }}
    >
      <Image
        src={item.image}
        alt={`${industry.name} — ${industry.tagline}`}
        fill
        sizes="(max-width: 768px) 42vw, 280px"
        className="portfolio-showcase-card-img"
      />
      <span className="portfolio-showcase-card-overlay">
        <span className="portfolio-showcase-card-kicker">{industry.shortLabel}</span>
        <span className="portfolio-showcase-card-title">{industry.name}</span>
      </span>
    </a>
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
          <ShowcaseCard key={`${item.industry.id}-${item.size}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

type GalleryStory = {
  src: string;
  alt: string;
  label: string;
  stat: string;
  statLabel: string;
  accent: string;
  href: string;
  layout: "portrait" | "wide";
};

const galleryStories: GalleryStory[] = [
  {
    src: "/media/gallery/n8n-cold-email.png",
    alt: "n8n cold email automation workflow for AI agency campaigns",
    label: "Cold Email Ops",
    stat: "n8n",
    statLabel: "Live flow",
    accent: industries[0].accent,
    href: "#industry-construction",
    layout: "wide",
  },
  {
    src: "/media/gallery/n8n-case-chaser.png",
    alt: "Case processing and chaser automation workflows in n8n",
    label: "Case + Chaser",
    stat: "Full",
    statLabel: "Pipeline",
    accent: industries[2].accent,
    href: "#industry-medical",
    layout: "wide",
  },
  {
    src: "/media/gallery/crm-followup-flow.png",
    alt: "CRM no-inbound follow-up automation flowchart",
    label: "Lead Nurture",
    stat: "CRM",
    statLabel: "Sequence",
    accent: industries[1].accent,
    href: "#industry-real-estate",
    layout: "wide",
  },
  {
    src: "/media/gallery/reviews-campaign.png",
    alt: "Google Reviews outreach campaign analytics dashboard",
    label: "Reviews AI",
    stat: "865",
    statLabel: "Sent",
    accent: industries[0].accent,
    href: "#industry-construction",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
    alt: "Analytics dashboard with live automation KPIs and charts",
    label: "Ops Dashboard",
    stat: "KPI",
    statLabel: "Live",
    accent: industries[4].accent,
    href: "#industry-ecommerce",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    alt: "Dark IDE with production automation code",
    label: "Dev Systems",
    stat: "IDE",
    statLabel: "Build",
    accent: industries[3].accent,
    href: "#industry-automotive",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    alt: "Circuit board and development systems hardware",
    label: "Infra Layer",
    stat: "Sys",
    statLabel: "Core",
    accent: industries[3].accent,
    href: "#industry-automotive",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80",
    alt: "Workflow automation analytics on laptop screen",
    label: "Flow Metrics",
    stat: "ROI",
    statLabel: "Track",
    accent: industries[1].accent,
    href: "#industry-real-estate",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80",
    alt: "Server rack and production deployment systems",
    label: "Deploy Grid",
    stat: "99%",
    statLabel: "Uptime",
    accent: industries[2].accent,
    href: "#industry-medical",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80",
    alt: "Terminal and code editor running automation scripts",
    label: "Script Lab",
    stat: "CLI",
    statLabel: "Run",
    accent: industries[4].accent,
    href: "#industry-ecommerce",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&q=80",
    alt: "AI agent stack and generative automation systems UI",
    label: "Agent Stack",
    stat: "GPT",
    statLabel: "Agents",
    accent: industries[4].accent,
    href: "#industry-ecommerce",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80",
    alt: "Software development system with code on multiple panels",
    label: "API Build",
    stat: "REST",
    statLabel: "Wired",
    accent: industries[0].accent,
    href: "#industry-construction",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a2?w=1000&q=80",
    alt: "Network infrastructure and connected development systems",
    label: "Net Fabric",
    stat: "Mesh",
    statLabel: "Nodes",
    accent: industries[2].accent,
    href: "#industry-medical",
    layout: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80",
    alt: "Global systems map representing distributed automation",
    label: "Global Sync",
    stat: "24/7",
    statLabel: "Sync",
    accent: industries[1].accent,
    href: "#industry-real-estate",
    layout: "wide",
  },
];

function GalleryStoryCard({ story }: { story: GalleryStory }) {
  return (
    <a
      href={story.href}
      className={`portfolio-journey-card portfolio-journey-card--${story.layout}`}
    >
      <Image
        src={story.src}
        alt={story.alt}
        fill
        sizes={story.layout === "wide" ? "(max-width: 768px) 70vw, 340px" : "220px"}
        className="portfolio-journey-card-img"
      />
      <div className="portfolio-journey-card-overlay" aria-hidden>
        <div className="portfolio-journey-card-top">
          <span
            className="portfolio-journey-card-avatar"
            style={{ background: story.accent }}
          />
          <span className="portfolio-journey-card-user">{story.label}</span>
        </div>
        <div className="portfolio-journey-card-widget">
          <span className="portfolio-journey-card-ring" style={{ borderColor: story.accent }} />
          <div className="portfolio-journey-card-stat">
            <strong>{story.stat}</strong>
            <span>{story.statLabel}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function WorkingGalleryCarousel() {
  const track = [...galleryStories, ...galleryStories];

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
          Live industry systems
          <br />
          in the working gallery
        </motion.h2>

        <div className="portfolio-journey-carousel" aria-label="Industry working gallery">
          <div className="portfolio-journey-track">
            {track.map((story, idx) => (
              <GalleryStoryCard key={`${story.label}-${idx}`} story={story} />
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
          <a href="#industry-sections" className="portfolio-journey-cta">
            Explore industry builds
          </a>
        </motion.div>
      </div>
    </section>
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
            <p className="portfolio-showcase-kicker">Working Gallery</p>
            <h2 className="portfolio-showcase-title">
              Industry systems.
              <br />
              Live demos.
            </h2>
            <p className="portfolio-showcase-lead">
              Five production verticals — construction, real estate, medical, automotive, and
              ecommerce — each with a dedicated build and live subdomain.
            </p>
            <div className="portfolio-showcase-actions">
              <a
                href="#industry-sections"
                className="portfolio-showcase-btn portfolio-showcase-btn--primary"
              >
                View industries
              </a>
              <a href="#cta" className="portfolio-showcase-btn portfolio-showcase-btn--ghost">
                Book a build
              </a>
            </div>
          </motion.header>

          <div className="portfolio-showcase-gallery" aria-label="Working gallery by industry">
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
      <WorkingGalleryCarousel />
    </>
  );
}
