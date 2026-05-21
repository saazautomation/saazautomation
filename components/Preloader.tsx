"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGone(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={gone ? "gone" : ""}>
      <div className="pl-logo">SA</div>
      <div className="pl-sub">SAAZ AUTOMATION</div>
      <div className="pl-bar-wrap">
        <div className="pl-bar" />
      </div>
    </div>
  );
}
