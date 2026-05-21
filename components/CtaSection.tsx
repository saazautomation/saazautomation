"use client";

import { useBooking } from "@/context/BookingContext";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";

export default function CtaSection() {
  const { openBooking } = useBooking();

  return (
    <section id="cta">
      <motion.div
        className="cta-rays"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="cta-bar" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="cta-h">
            READY TO
            <br />
            AUTOMATE?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="cta-bar" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="cta-sub">
            Book a free strategy call. We&apos;ll diagnose your biggest leverage points and show you
            exactly what&apos;s possible.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="cta-btns">
          <motion.button
            type="button"
            className="btn-r openBooking"
            onClick={openBooking}
            whileHover={{ y: -4, boxShadow: "0 20px 50px var(--red-glow)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book Free Strategy Call</span>
          </motion.button>
          <motion.a
            href="#about"
            className="btn-o"
            whileHover={{ y: -4, borderColor: "var(--red)", color: "var(--red)" }}
          >
            About Us
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
