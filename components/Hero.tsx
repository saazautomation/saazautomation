"use client";

import HeroCanvas from "./HeroCanvas";
import { useBooking } from "@/context/BookingContext";
import Reveal from "@/components/motion/Reveal";
import FloatLayer from "@/components/motion/FloatLayer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatTags = [
  { label: "MT5 Bots", style: { top: "18%", left: "8%" } },
  { label: "Voice AI", style: { top: "22%", right: "10%" } },
  { label: "Agentic WF", style: { bottom: "32%", left: "12%" } },
  { label: "n8n · GHL", style: { bottom: "28%", right: "8%" } },
];

export default function Hero() {
  const { openBooking } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section id="hero" ref={sectionRef}>
      <HeroCanvas />
      <div className="hero-grid" />
      <motion.div
        className="orb"
        style={{
          width: 700,
          height: 700,
          top: -200,
          right: -200,
          background: "rgba(251,54,64,.08)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 500,
          height: 500,
          bottom: -200,
          left: -150,
          background: "rgba(199,203,211,.04)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="hero-float-tags">
        {floatTags.map((tag, i) => (
          <FloatLayer
            key={tag.label}
            className="hero-tag"
            style={tag.style as React.CSSProperties}
            floatAmount={8 + i * 2}
            duration={3.5 + i * 0.5}
          >
            <span>{tag.label}</span>
          </FloatLayer>
        ))}
      </div>

      <motion.div className="hero-inner" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.h1
          className="hero-h"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="line-1">YOUR BUSINESS.</span>
          <span className="line-2">RUNNING ITSELF.</span>
        </motion.h1>
        <Reveal delay={0.6}>
          <p className="hero-sub">
            Saaz turns your business&apos;s repetitive tasks into AI-powered systems that work 24/7 —
            without the overhead of hiring, training, or managing more staff.
          </p>
        </Reveal>
        <Reveal delay={0.75}>
          <p className="hero-tagline">THE LAST TIME YOU&apos;LL HIRE FOR REPETITIVE WORK</p>
        </Reveal>
        <Reveal delay={0.8} className="hero-btns">
          <motion.a
            href="#showreel"
            className="btn-r"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Watch Showreel</span>
          </motion.a>
          <motion.button
            type="button"
            className="btn-o openBooking"
            onClick={openBooking}
            whileHover={{ y: -4, borderColor: "var(--red)" }}
            whileTap={{ scale: 0.98 }}
          >
            Book a Strategy Call
          </motion.button>
        </Reveal>
      </motion.div>
      <Reveal className="hero-scroll" delay={1.2}>
        <span>SCROLL</span>
        <div className="scroll-ln" />
      </Reveal>
    </section>
  );
}
