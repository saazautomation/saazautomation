"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setGone(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div id="preloader" className={gone ? "gone" : ""} aria-hidden={gone}>
      <div className="pl-logo">SAAZ</div>
      <div className="pl-bar">
        <div className="pl-fill" />
      </div>
      <p className="pl-txt">INITIALIZING SYSTEMS</p>
    </div>
  );
}
