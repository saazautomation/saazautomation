"use client";

import { tools } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import FloatLayer from "@/components/motion/FloatLayer";
import { motion } from "framer-motion";

const orbitPositions: React.CSSProperties[] = [
  { top: "0%", left: "50%", transform: "translate(-50%, 0)" },
  { top: "12%", right: "8%" },
  { top: "38%", right: "0" },
  { bottom: "12%", right: "10%" },
  { bottom: "0%", left: "50%", transform: "translate(-50%, 0)" },
  { bottom: "12%", left: "10%" },
  { top: "38%", left: "0" },
  { top: "12%", left: "8%" },
  { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  { top: "22%", left: "28%" },
  { top: "22%", right: "28%" },
  { bottom: "22%", left: "32%" },
];

export default function Integrations() {
  return (
    <section id="integrations" className="s integrations-v2">
      <motion.div
        className="int-orbit-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="int-intro">
            <Reveal className="s-label" style={{ justifyContent: "center" }}>
              Tech Arsenal
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="s-h" style={{ textAlign: "center" }}>
                TOOLS WE
                <br />
                MASTER
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="int-sub">
                We build across the most powerful automation platforms — and on the trading side,
                native MQL5 for MT5.
              </p>
            </Reveal>
          </div>

          <motion.div
            className="int-orbit-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="int-orbit-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="int-orbit-ring"
              style={{ inset: "18%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <div className="int-center">HUB</div>

            {tools.map((tool, i) => {
              const pos = orbitPositions[i % orbitPositions.length];
              return (
                <FloatLayer
                  key={tool.name}
                  className="tool-orbit"
                  style={pos}
                  floatAmount={6 + (i % 3) * 2}
                  duration={3 + (i % 4) * 0.3}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.12, borderColor: "rgba(251,54,64,0.5)" }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.4rem",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div className="tool-ic">{tool.emoji}</div>
                    <span className="tool-n">{tool.name}</span>
                  </motion.div>
                </FloatLayer>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
