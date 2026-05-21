import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="mq-wrap">
      <div className="mq-track">
        {items.map((text, i) => (
          <span key={`${text}-${i}`} className="mq-i">
            {text} <span className="mq-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
