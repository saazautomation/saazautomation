import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="mq-wrap">
      <div className="mq-track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="mq-i">
            {item}
            <span className="mq-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
