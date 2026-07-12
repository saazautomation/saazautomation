"use client";

import { industries } from "@/lib/industries";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function IndustrySections() {
  return (
    <div id="industry-sections" className="industry-sections">
      <motion.header
        className="industry-sections-intro"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="industry-sections-kicker">Dedicated builds</p>
        <h2 className="industry-sections-title">
          One stack.
          <br />
          Five verticals.
        </h2>
        <p className="industry-sections-lead">
          Jump into any live demo domain — or scroll each section for the story, imagery, and
          outcomes behind the build.
        </p>
      </motion.header>

      {industries.map((industry, index) => {
        const reverse = index % 2 === 1;

        return (
          <section
            key={industry.id}
            id={`industry-${industry.id}`}
            className={`industry-section ${reverse ? "industry-section--reverse" : ""}`}
            style={{ ["--industry-accent" as string]: industry.accent }}
          >
            <div
              className="industry-section-bg"
              style={{ backgroundImage: `url(${industry.backgroundImage})` }}
              aria-hidden
            />
            <div className="industry-section-veil" aria-hidden />

            <div className="industry-section-inner">
              <motion.div
                className="industry-section-copy"
                initial={{ opacity: 0, x: reverse ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="industry-section-index">0{index + 1}</span>
                <p className="industry-section-kicker">{industry.shortLabel}</p>
                <h3 className="industry-section-name">{industry.name}</h3>
                <p className="industry-section-tagline">{industry.tagline}</p>
                <p className="industry-section-desc">{industry.description}</p>

                <ul className="industry-section-highlights">
                  {industry.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="industry-section-actions">
                  <a
                    href={industry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="industry-section-btn industry-section-btn--primary"
                  >
                    {industry.name}
                  </a>
                  <a href="#portfolio" className="industry-section-btn industry-section-btn--ghost">
                    Back to gallery
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="industry-section-media"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, ease, delay: 0.08 }}
              >
                <figure className="industry-section-hero-fig">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="(max-width: 900px) 92vw, 48vw"
                    className="industry-section-hero-img"
                  />
                </figure>
                <figure className="industry-section-side-fig">
                  <Image
                    src={industry.galleryImage}
                    alt={`${industry.name} detail`}
                    fill
                    sizes="(max-width: 900px) 60vw, 28vw"
                    className="industry-section-side-img"
                  />
                </figure>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
