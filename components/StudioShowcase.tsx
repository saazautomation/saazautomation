"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const bgCards = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    alt: "Trading dashboard",
    cls: "studio-bg-card studio-bg-far-left",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    alt: "Business automation",
    cls: "studio-bg-card studio-bg-near-left",
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80",
    alt: "AI workspace",
    cls: "studio-bg-card studio-bg-near-right",
  },
  {
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=80",
    alt: "Automation ops",
    cls: "studio-bg-card studio-bg-far-right",
  },
];

export default function StudioShowcase() {
  return (
    <section id="studio-showcase" className="studio-section">
      <motion.div
        className="studio-heading-row"
        aria-label="Made with SAAZ"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
      >
        <h2 className="studio-word">Made</h2>
        <h2 className="studio-word studio-word-center">with</h2>
        <h2 className="studio-word">SAAZ</h2>
      </motion.div>

      <motion.div
        className="studio-stage-outer"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease, delay: 0.08 }}
      >
        <div className="studio-orbit" aria-hidden />

        <div className="studio-carousel">
          {bgCards.map((card, i) => (
            <div key={card.alt} className={card.cls}>
              <motion.div
                className="studio-bg-card-media"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease, delay: 0.14 + i * 0.06 }}
              >
                <Image src={card.src} alt={card.alt} fill sizes="(max-width: 768px) 28vw, 18vw" />
              </motion.div>
            </div>
          ))}

          <motion.div
            className="studio-front-wrap"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <article className="studio-front-card">
              <motion.div
                className="studio-card-inner-head"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.28 }}
              > 
              </motion.div>

              <div className="studio-card-video">
                <video
                  src="/media/saaz-showreel.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>

              <motion.div
                className="studio-card-foot"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.32 }}
              >
                <span className="studio-card-brand">SAAZ AUTOMATION</span>
                <div className="studio-card-foot-right">
                  <span className="studio-card-resources">5 RESOURCES USED</span>
                  <span className="studio-card-plus" aria-hidden>
                    +
                  </span>
                </div>
              </motion.div>
            </article>
          </motion.div>

          <motion.span
            className="studio-annotation"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            These systems
            <br />
            are elite
            <span className="studio-annotation-arrow" aria-hidden>
              ↙
            </span>
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
