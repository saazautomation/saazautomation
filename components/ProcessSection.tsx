import { processSteps } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section id="process" className="s">
      <div className="proc-line" />
      <div className="container">
        <p className="s-label reveal">How We Work</p>
        <h2 className="s-h reveal">FROM AUDIT TO SCALE</h2>
        <div className="proc-g">
          {processSteps.map((step) => (
            <article key={step.num} className="proc-step reveal">
              <span className="proc-num">{step.num}</span>
              {step.icon}
              <h3 className="proc-t">{step.title}</h3>
              <p className="proc-d">{step.description}</p>
              <span className="proc-tag">{step.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
