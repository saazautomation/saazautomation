"use client";

import { navItems } from "@/lib/data";
import type { NavDropdownItem } from "@/lib/types";
import { useBooking } from "@/context/BookingContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const phoneIcon = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function MegaPreview({ item }: { item: NavDropdownItem }) {
  return (
    <motion.div
      key={item.id}
      className="mega-preview-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="mega-preview-img"
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={item.preview.image}
          alt=""
          fill
          sizes="(max-width: 1100px) 100vw, 420px"
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="mega-preview-overlay">
          <p className="mega-preview-quote">&ldquo;{item.preview.quote}&rdquo;</p>
          <div className="mega-preview-actions">
            <Link href={item.preview.ctaHref} className="mega-preview-btn">
              {item.preview.cta}
            </Link>
            <span className="mega-preview-arrow" aria-hidden>
              →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Nav() {
  const { openBooking } = useBooking();
  const [stuck, setStuck] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = navItems.find((item) => item.label === activeMenu);

  const previewItem = useMemo(() => {
    if (!activeItem?.dropdown?.length) return null;
    const found = activeItem.dropdown.find((l) => l.id === hoveredLinkId);
    return found ?? activeItem.dropdown[0];
  }, [activeItem, hoveredLinkId]);

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
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setHoveredLinkId(null);
  };

  const scheduleCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeMenu();
      closeTimerRef.current = null;
    }, 180);
  };

  const openMenu = (label: string, hasDropdown: boolean) => {
    clearCloseTimer();
    if (!hasDropdown) {
      closeMenu();
      return;
    }
    setActiveMenu(label);
    const item = navItems.find((n) => n.label === label);
    setHoveredLinkId(item?.dropdown?.[0]?.id ?? null);
  };

  return (
    <header
      className={`nav-shell ${stuck ? "stuck" : ""}`}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleCloseMenu}
    >
      <motion.div
        className="nav-bar"
        initial={false}
        animate={stuck ? { scale: 0.98 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="#hero" className="nav-logo">
          SAAZ
        </Link>

        <nav className="nav-center" aria-label="Main">
          <ul className="nav-links-v2">
            {navItems.map((item) => {
              const hasDropdown = Boolean(item.dropdown?.length);
              return (
                <li
                  key={item.label}
                  className="nav-item-v2"
                  onMouseEnter={() => openMenu(item.label, hasDropdown)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link-v2 ${activeMenu === item.label ? "active" : ""}`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <span className={`nav-caret-v2 ${activeMenu === item.label ? "open" : ""}`} />
                    )}
                  </Link>
                </li>
              );
            })}
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
        {activeItem?.dropdown && previewItem && (
          <motion.div
            className="mega-panel mega-panel-split"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleCloseMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mega-split-inner container">
              <motion.div
                className="mega-links-side"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mega-section-label">
                  <span className="mega-hex" aria-hidden />
                  {activeItem.sectionLabel ?? activeItem.label}
                </div>

                <ul className="mega-link-list">
                  {activeItem.dropdown.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className={`mega-link-large ${hoveredLinkId === link.id ? "is-active" : ""}`}
                        onMouseEnter={() => setHoveredLinkId(link.id)}
                        onFocus={() => setHoveredLinkId(link.id)}
                      >
                        <span className="mega-link-title">{link.title}</span>
                        <span className="mega-link-sub">{link.subtitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <AnimatePresence mode="wait">
                <MegaPreview key={previewItem.id} item={previewItem} />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mobile-drawer-inner">
              {navItems.map((item) => (
                <div key={item.label} className="mobile-group">
                  <Link
                    href={item.href}
                    className="mobile-link-main"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown?.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="mobile-sublink"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.title}</span>
                      <small>{link.subtitle}</small>
                    </Link>
                  ))}
                </div>
              ))}
              <button type="button" className="btn-r mobile-cta" onClick={openBooking}>
                <span>Book a Call</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
