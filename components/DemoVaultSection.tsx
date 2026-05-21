"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DemoVaultSection() {
  return (
    <section id="demo-vault" className="vault-section">
      <motion.div
        className="vault-shell"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.65 }}
      >
        <motion.div
          className="vault-theme-toggles"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button type="button" className="vault-theme-btn is-active" aria-label="Dark mode">
            <span aria-hidden>☾</span>
          </button>
          <button type="button" className="vault-theme-btn" aria-label="Light mode">
            <span aria-hidden>☼</span>
          </button>
        </motion.div>

        <motion.div
          className="vault-layout"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <motion.div
            className="vault-layout-left"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="vault-dashes" aria-hidden />

            <div className="vault-copy">
              <span className="vault-kicker">TRY FOR FREE</span>
              <p className="vault-bridge">Want a taste before you buy?</p>
              <h2 className="vault-title">
                Try the SAAZ
                <br />
                Demo Vault
              </h2>

              <motion.div
                className="vault-cta-wrap"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <a href="#cta" className="vault-btn">
                  Unlock the demo
                </a>
                <p className="vault-note">
                  <svg
                    className="vault-note-arrow"
                    viewBox="0 0 48 56"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 48 C18 30 28 18 40 8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M40 8 L32 10 M40 8 L38 16"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Try 20 Resources for Free
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="vault-layout-right"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.div
              className="vault-preview"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src="/media/demo-vault-dark.png"
                alt="SAAZ demo vault preview"
                fill
                sizes="(max-width: 1100px) 92vw, 58vw"
                priority={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
