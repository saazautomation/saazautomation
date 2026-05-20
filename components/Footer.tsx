import {
  footerContact,
  footerLegalLinks,
  footerNavLinks,
} from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer s">
      <div className="container">
        <div className="foot-g">
          <div>
            <span className="foot-logo">SAAZ</span>
            <p className="foot-d">
              Intelligent AI systems for trading desks, agencies, and high-growth operators.
            </p>
            <span className="foot-aut">AUTOMATION · AI · TRADING</span>
          </div>
          <div>
            <p className="foot-ch">Navigate</p>
            <ul className="foot-lks">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="foot-ch">Legal</p>
            <ul className="foot-lks">
              {footerLegalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="foot-ch">Contact</p>
            <ul className="foot-lks">
              <li>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
              </li>
              <li>
                <span>{footerContact.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-b">
          <p>© {new Date().getFullYear()} SAAZ AUTOMATION. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
