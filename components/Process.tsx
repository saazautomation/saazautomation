"use client";

import { processSteps } from "@/lib/data";
import Reveal, { staggerContainer } from "@/components/motion/Reveal";
import { motion } from "framer-motion";

const revealClass = ["reveal-l", "reveal-r", "reveal-l", "reveal-r"];

export default function Process() {
  return (
    <section id="process" className="s">
      <div className="proc-line" />
      <div className="container">
        <Reveal>
          <div className="s-label">How We Work</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="s-h">
            THE SAAZ
            <br />
            PROCESS
          </h2>
        </Reveal>
        <motion.div
          className="proc-g"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`proc-step ${revealClass[index]}`}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.08 } },
              }}
              whileHover={{ borderColor: "rgba(251,54,64,0.35)", y: -4 }}
            >
              <div className="proc-num">{step.num}</div>
              {step.icon}
              <h3 className="proc-t">{step.title}</h3>
              <p className="proc-d">{step.description}</p>
              <span className="proc-tag">{step.tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
