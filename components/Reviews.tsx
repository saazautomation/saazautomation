"use client";

import { reviews } from "@/lib/data";
import { motion } from "framer-motion";

function QuoteIcon() {
  return (
    <svg
      className="reviews-light-quote"
      width="44"
      height="36"
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden
    >
      <path
        d="M9.2 0C4.12 0 0 4.12 0 9.2v9.2c0 8.08 6.56 14.64 14.64 14.64h3.68V18.4h-2.76c-3.04 0-5.52-2.48-5.52-5.52V9.2h9.2V0H9.2zm25.76 0c-5.08 0-9.2 4.12-9.2 9.2v9.2c0 8.08 6.56 14.64 14.64 14.64h3.68V18.4h-2.76c-3.04 0-5.52-2.48-5.52-5.52V9.2h9.2V0H34.96z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-light">
      <div className="reviews-light-shell">
        <h2 className="reviews-light-title">
          Words of praise from others about our presence.
        </h2>

        <div className="reviews-light-grid">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              className="reviews-light-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <QuoteIcon />
              <p className="reviews-light-text">{review.text}</p>
              <footer className="reviews-light-author">
                <span className="reviews-light-avatar" aria-hidden>
                  {review.initials}
                </span>
                <div className="reviews-light-meta">
                  <p className="reviews-light-name">{review.name}</p>
                  <p className="reviews-light-role">{review.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
