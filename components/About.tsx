"use client";

import { aboutTags } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="s">
      <div className="container">
        <div className="about-g">
          <Reveal direction="left" className="about-visual">
            <div className="about-ring" />
            <div className="about-ring" />
            <div className="about-ring" />
            <motion.div
              className="about-sa"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              SA
            </motion.div>
          </Reveal>
          <div>
            <Reveal>
              <div className="s-label">Who We Are</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h">
                PRECISION
                <br />
                INTELLIGENCE
                <br />
                DELIVERED
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="about-p">
                SAAZ Automation engineers competitive advantages. From custom trading bots to
                enterprise AI agents, we build systems that compound — not consume — your time.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="about-p">
                We work with founders, prop firms, and high-growth operators who understand that the
                next decade belongs to whoever automates fastest. We help them get there first.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="about-tags">
                {aboutTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="about-tag"
                    whileHover={{ scale: 1.05, borderColor: "rgba(251,54,64,0.55)" }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
