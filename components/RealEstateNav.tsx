"use client";

import { useBooking } from "@/context/BookingContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const reNavLinks = [
  { label: "How It Works", href: "#re-process" },
  { label: "Why Us", href: "#re-problem" },
  { label: "Results", href: "#re-results" },
  { label: "Platform", href: "#re-workforce" },
  { label: "Integrations", href: "#re-integrations" },
  { label: "Pricing", href: "#re-offer" },
];

const phoneIcon = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function RealEstateNav() {
  const { openBooking } = useBooking();
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={`nav-shell re-nav ${stuck ? "stuck" : ""}`}>
      <motion.div
        className="nav-bar"
        initial={false}
        animate={stuck ? { scale: 0.98 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="#re-hero" className="nav-logo" onClick={closeMobile}>
          SAAZ
        </Link>

        <nav className="nav-center" aria-label="Real estate page sections">
          <ul className="nav-links-v2 re-nav-links">
            {reNavLinks.map((item) => (
              <li key={item.href} className="nav-item-v2">
                <Link
                  href={item.href}
                  className={`nav-link-v2 re-nav-link ${activeHash === item.href ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <motion.button
          type="button"
          className="nav-btn"
          onClick={openBooking}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>
            {phoneIcon}
            Book a Call
          </span>
        </motion.button>

        <button
          type="button"
          className={`hamburger-v2 ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer re-nav-drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="mobile-drawer-inner">
              {reNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-link-main"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="#re-cta" className="mobile-link-main" onClick={closeMobile}>
                Get Started
              </Link>
              <button type="button" className="btn-r mobile-cta" onClick={(e) => { closeMobile(); openBooking(e); }}>
                <span>Book a Call</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
