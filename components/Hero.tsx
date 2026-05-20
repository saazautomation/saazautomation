"use client";

import { useEffect, useRef } from "react";
import { useBooking } from "@/context/BookingContext";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 54, 64, 0.35)";
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(251, 54, 64, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero">
      <canvas id="hero-cvs" ref={canvasRef} />
      <div className="hero-grid" />
      <div className="orb" style={{ width: 500, height: 500, top: "10%", left: "-10%", background: "rgba(251,54,64,0.12)" }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: "5%", right: "-5%", background: "rgba(251,54,64,0.08)" }} />
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          AI-FIRST AUTOMATION STUDIO
        </div>
        <h1 className="hero-h">
          <span className="line-1">INTELLIGENT</span>
          <span className="line-2">AI SYSTEMS</span>
          <span className="line-3">BUILT TO SCALE</span>
        </h1>
        <p className="hero-sub">
          Trading bots, AI agents, machine learning models, and agentic workflows for founders who want leverage — not more manual work.
        </p>
        <div className="hero-btns">
          <button type="button" className="btn-r openBooking" onClick={openBooking}>
            <span>BOOK A STRATEGY CALL</span>
          </button>
          <a href="#about" className="btn-o">
            EXPLORE SOLUTIONS
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="scroll-ln" />
      </div>
    </section>
  );
}
