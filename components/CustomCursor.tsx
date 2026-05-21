"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(max-width: 1100px)").matches) return;

    const cur = document.getElementById("cur");
    const curR = document.getElementById("cur-r");
    if (!cur || !curR) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = `${mx}px`;
      cur.style.top = `${my}px`;
    };

    const animR = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      curR.style.left = `${rx}px`;
      curR.style.top = `${ry}px`;
      frameId = requestAnimationFrame(animR);
    };

    document.addEventListener("mousemove", onMove);
    frameId = requestAnimationFrame(animR);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />
    </>
  );
}
