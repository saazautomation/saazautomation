"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cur = document.getElementById("cur");
    const ring = document.getElementById("cur-r");
    if (!cur || !ring) return;

    const move = (e: MouseEvent) => {
      cur.style.left = `${e.clientX}px`;
      cur.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />
    </>
  );
}
