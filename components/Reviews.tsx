"use client";

import { reviews } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";

const PORTFOLIO_URL = "https://portfolio.saazautomation.com";

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-light">
      <div className="reviews-light-shell">
        <h2 className="reviews-light-title">
          Words of praise from others about our presence.
        </h2>

        <div className="reviews-light-grid reviews-light-grid--shots">
          {reviews.map((review, i) => (
            <motion.a
              key={review.name}
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-light-card reviews-light-card--shot reviews-light-card--link"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              {review.image && (
                <div className="reviews-light-shot">
                  <Image
                    src={review.image}
                    alt={`${review.name} — client session`}
                    width={1024}
                    height={780}
                    className="reviews-light-shot-img"
                    sizes="(max-width: 900px) 92vw, 440px"
                  />
                </div>
              )}
              <div className="reviews-light-shot-body">
                <p className="reviews-light-text">{review.text}</p>
                <footer className="reviews-light-author">
                  <div className="reviews-light-meta">
                    <p className="reviews-light-name">{review.name}</p>
                    <p className="reviews-light-role">{review.role}</p>
                  </div>
                </footer>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
