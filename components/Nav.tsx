"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navItems } from "@/lib/data";
import type { NavDropdownItem } from "@/lib/types";
import { useBooking } from "@/context/BookingContext";

export default function Nav() {
  const { openBooking } = useBooking();
  const [stuck, setStuck] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavDropdownItem | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = navItems.find((n) => n.label === openMenu && n.dropdown);
  const preview = activeItem ?? openDropdown?.dropdown?.[0] ?? null;

  return (
    <header className={`nav-shell${stuck ? " stuck" : ""}`}>
      <div className="nav-bar">
        <a href="#" className="nav-logo">
          SAAZ
        </a>
        <nav className="nav-center" aria-label="Main">
          <ul className="nav-links-v2">
            {navItems.map((item) =>
              item.dropdown ? (
                <li
                  key={item.label}
                  onMouseEnter={() => {
                    setOpenMenu(item.label);
                    setActiveItem(item.dropdown![0]);
                  }}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <a
                    href={item.href}
                    className={`nav-link-v2${openMenu === item.label ? " active" : ""}`}
                    onClick={(e) => {
                      if (window.innerWidth < 1024) {
                        e.preventDefault();
                        setOpenMenu(openMenu === item.label ? null : item.label);
                      }
                    }}
                  >
                    {item.label}
                    <span className={`nav-caret-v2${openMenu === item.label ? " open" : ""}`} />
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <a href={item.href} className="nav-link-v2">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
        <button type="button" className="nav-btn openBooking" onClick={openBooking}>
          <span>
            BOOK CALL
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
        <button
          type="button"
          className={`hamburger-v2${mobileOpen ? " open" : ""}`}
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {openDropdown && (
        <div
          className="mega-panel mega-panel-split"
          onMouseEnter={() => setOpenMenu(openDropdown.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="mega-split-inner">
            <div className="mega-links-side">
              <div className="mega-section-label">
                <span className="mega-hex" />
                {openDropdown.sectionLabel}
              </div>
              <ul className="mega-link-list">
                {openDropdown.dropdown!.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`mega-link-large${activeItem?.id === link.id ? " is-active" : ""}`}
                      onMouseEnter={() => setActiveItem(link)}
                    >
                      <span className="mega-link-title">{link.title}</span>
                      <span className="mega-link-sub">{link.subtitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {preview && (
              <div className="mega-preview-panel">
                <Image
                  src={preview.preview.image}
                  alt=""
                  width={720}
                  height={480}
                  className="mega-preview-img"
                />
                <div className="mega-preview-overlay">
                  <p className="mega-preview-quote">{preview.preview.quote}</p>
                  <div className="mega-preview-actions">
                    <a href={preview.preview.ctaHref} className="mega-preview-btn">
                      {preview.preview.cta}
                      <span className="mega-preview-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.label}>
                <a href={item.href} className="mobile-link-main">
                  {item.label}
                </a>
                <div className="mobile-sub">
                  {item.dropdown.map((link) => (
                    <a key={link.id} href={link.href} className="mobile-sublink">
                      <span>{link.title}</span>
                      <small>{link.subtitle}</small>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="mobile-link-main">
                {item.label}
              </a>
            ),
          )}
          <button type="button" className="mobile-cta openBooking" onClick={openBooking}>
            Book Strategy Call
          </button>
        </div>
      )}
    </header>
  );
}
