import { tools } from "@/lib/data";

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="s">
      <div className="container">
        <div className="int-intro reveal">
          <p className="s-label">Integrations</p>
          <h2 className="s-h">YOUR STACK, CONNECTED</h2>
          <p className="int-sub">
            We wire the tools you already use — MT5, OpenAI, n8n, GHL, HubSpot, and custom APIs — into one automated system.
          </p>
        </div>
        <div className="tools-g">
          {tools.map((tool) => (
            <div key={tool.name} className="tool reveal">
              <span className="tool-ic">{tool.emoji}</span>
              <span className="tool-n">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
