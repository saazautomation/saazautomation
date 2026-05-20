import { reviews } from "@/lib/data";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="s">
      <div className="container">
        <p className="s-label reveal">Testimonials</p>
        <h2 className="s-h reveal">WHAT CLIENTS SAY</h2>
        <div className="rev-g">
          {reviews.map((rev) => (
            <article
              key={rev.name}
              className="rev-card rev-card-v2 reveal"
              style={rev.delay ? { transitionDelay: rev.delay } : undefined}
            >
              <div className="rev-stars">★★★★★</div>
              <p className="rev-q">&ldquo;</p>
              <p className="rev-t">{rev.text}</p>
              <div className="rev-author">
                <div className="rev-av">{rev.initials}</div>
                <div>
                  <p className="rev-name">{rev.name}</p>
                  <p className="rev-role">{rev.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
