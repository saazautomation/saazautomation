import Image from "next/image";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="s" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="proj-head reveal">
          <div>
            <p className="s-label">Case Studies</p>
            <h2 className="s-h">SELECTED WORK</h2>
          </div>
          <a href="#showreel" className="btn-o">
            VIEW SHOWREEL
          </a>
        </div>
        <div className="proj-g">
          {projects.map((proj, i) => (
            <article
              key={proj.title}
              className={`proj-card reveal${proj.large ? " large" : " sm"}`}
              style={proj.delay ? { transitionDelay: proj.delay } : undefined}
            >
              {proj.image && (
                <div className="proj-visual">
                  <Image src={proj.image} alt="" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
              )}
              <span className="proj-bg-text">{proj.bgText}</span>
              <div className="proj-overlay">
                <span className="proj-tag">{proj.tag}</span>
                <h3 className="proj-t">{proj.title}</h3>
                <p className="proj-d">{proj.description}</p>
                <span className="proj-arr">VIEW CASE →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
