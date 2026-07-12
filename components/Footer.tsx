"use client";

import { footerContact, footerIndustryLinks, footerNavLinks } from "@/lib/data";
import { useBooking } from "@/context/BookingContext";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="site-footer">
      <motion.div
        className="footer-glow"
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <motion.div className="footer-shell">
        <Reveal>
          <div className="footer-card">
            <motion.div
              className="footer-card-grid"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <motion.div
                className="footer-col footer-col-brand"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
              >
                <Link href="#hero" className="footer-brand-lockup">
                  <span className="footer-brand-mark" aria-hidden />
                  <span className="footer-brand-text">
                    <span className="footer-brand-name">SAAZ AI</span>
                  </span>
                </Link>
                <p className="footer-brand-blurb">
                  AI automation for construction, real estate, medical, automotive, and ecommerce.
                </p>
              </motion.div>

              <motion.div
                className="footer-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="footer-col-label">Live Demos</span>
                <ul className="footer-col-list">
                  {footerIndustryLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-col-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="footer-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <span className="footer-col-label">Navigation</span>
                <ul className="footer-col-list">
                  {footerNavLinks.map((link) => (
                    <li key={link.label}>
                      {link.isBooking ? (
                        <button
                          type="button"
                          className="footer-col-link footer-col-link-btn"
                          onClick={openBooking}
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href} className="footer-col-link">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="footer-col footer-col-contact"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="footer-col-label">Contact Information</span>
                <p className="footer-contact-line footer-contact-line-address">
                  {footerContact.address}
                </p>
                <a
                  href={`mailto:${footerContact.email}`}
                  className="footer-contact-line footer-contact-email"
                >
                  {footerContact.email}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="footer-card-bar"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <p>© 2026 SAAZ Automation. All rights reserved.</p>
              <p className="footer-card-credit">Created in SAAZ Core</p>
            </motion.div>
          </div>
        </Reveal>
      </motion.div>

      <div className="footer-mega" aria-hidden>
        <div className="footer-mega-inner">
          <motion.span
            className="footer-mega-word"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            SAAZ
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
