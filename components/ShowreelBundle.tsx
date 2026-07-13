"use client";

import { useBooking } from "@/context/BookingContext";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const megaReveal = {
  hidden: { opacity: 0, y: 56 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.07 },
  }),
};

export default function ShowreelBundle() {
  const { openBooking } = useBooking();

  return (
    <section id="showreel" className="bundle-section">
      <motion.div
        className="bundle-stage"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="bundle-eyebrow"
          custom={0}
          variants={megaReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="bundle-eyebrow-icon" aria-hidden />
          Live AI automation systems for operators who want leverage.
        </motion.p>

        <div className="bundle-mega-top">
          <motion.h2
            className="bundle-mega bundle-mega-line bundle-mega-line-full"
            custom={1}
            variants={megaReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            AI AUTOMATION IN ACTION
          </motion.h2>
        </div>

        <div className="bundle-row">
          <div className="bundle-col-left">
            <motion.h3
              className="bundle-mega bundle-mega-stack"
              custom={3}
              variants={megaReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              24/7
            </motion.h3>
            <motion.div
              className="bundle-mega bundle-mega-stat bundle-mega-stat-word"
              custom={4}
              variants={megaReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="bundle-stat-num bundle-stat-word-text">AI </span>
              <span className="bundle-stat-num bundle-stat-word-text">Ops</span>
            </motion.div>
          </div>

          <motion.div
            className="bundle-col-video"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease, delay: 0.15 }}
            whileHover={{ scale: 1.015 }}
          >
            <video
              className="bundle-video"
              src="/media/what-we-do.mov"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="SAAZ AI automation demo"
            />
          </motion.div>

          <motion.button
            type="button"
            className="bundle-col-cta"
            onClick={openBooking}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="bundle-cta-title">automate my ops</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
