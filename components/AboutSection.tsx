import { aboutTags } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="s">
      <div className="container about-g">
        <div className="about-visual reveal-l">
          <div className="about-ring" />
          <div className="about-ring" />
          <div className="about-ring" />
          <span className="about-sa">AI</span>
        </div>
        <div className="reveal-r">
          <p className="s-label">About SAAZ</p>
          <h2 className="s-h">
            WE ENGINEER
            <br />
            LEVERAGE
          </h2>
          <p className="about-p">
            SAAZ Automation builds intelligent systems for founders, prop firms, and growth teams — trading bots, AI agents, ML models, and agentic workflows that ship to production and compound ROI.
          </p>
          <p className="about-p">
            We are AI-first and trading-native: every build is custom, battle-tested, and designed to eliminate manual work — not add another tool to babysit.
          </p>
          <div className="about-tags">
            {aboutTags.map((tag) => (
              <span key={tag} className="about-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
