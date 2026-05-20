"use client";

import { useEffect } from "react";
import { services } from "@/lib/data";

export default function ServicesSection() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".srv-card");
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      };
      const onLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="services" className="s">
      <div className="container">
        <div className="srv-head reveal">
          <div>
            <p className="s-label">What We Build</p>
            <h2 className="s-h">
              END-TO-END
              <br />
              AUTOMATION
            </h2>
          </div>
          <p className="srv-desc">
            From MT5 trading desks to AI voice agents — production systems engineered for operators who need leverage, not experiments.
          </p>
        </div>
        <div className="srv-g">
          {services.map((srv) => (
            <article key={srv.title} className={`srv-card reveal${srv.featured ? " featured" : ""}`}>
              <div className="srv-card-top" />
              <p className="srv-num">{srv.num}</p>
              {srv.icon}
              <h3 className="srv-t">{srv.title}</h3>
              <p className="srv-d">{srv.description}</p>
              <span className="srv-arr">EXPLORE →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
