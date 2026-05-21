"use client";

import { footerContact, footerLegalLinks, footerNavLinks } from "@/lib/data";
import { useBooking } from "@/context/BookingContext";
import Reveal from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import Link from "next/link";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

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
                <div className="footer-social-row">
                  {socials.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="footer-social-btn"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="footer-col"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="footer-col-label">Legal</span>
                <ul className="footer-col-list">
                  {footerLegalLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-col-link">
                        {link.label}
                      </Link>
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
                      <Link
                        href={link.href}
                        className="footer-col-link"
                        onClick={
                          link.label === "Pricing"
                            ? (e) => {
                                e.preventDefault();
                                openBooking();
                              }
                            : undefined
                        }
                      >
                        {link.label}
                      </Link>
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
