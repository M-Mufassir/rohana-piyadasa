import { motion } from "framer-motion";
import { P, TAGLINE } from "../data";
import { PhoneI, WhatsI, MailI, UserPlusI } from "./Icons";

const waUrl = () => `https://wa.me/${P.mobile.replace("+", "")}`;

export default function HeroPortix({ onSave }) {
  return (
    <section className="hero-canvas" aria-label="Executive Banner">
      {/* Right-sided layered portrait + warm architectural glow */}
      <motion.div
        className="hero-bg-portrait"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.06 }}
      >
        <div className="hero-arch-panel" aria-hidden />
        <div className="studio-orb" aria-hidden />
        <img
          className="hero-portrait-img"
          src={P.photo}
          alt={`${P.name} — ${P.title}, ${P.unit} at ${P.company}`}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-portrait-scrim" aria-hidden />
      </motion.div>

      {/* Compact Foreground Identity: Name, Title, Brief Tagline & Quick Actions */}
      <motion.div
        className="hero-identity"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="hero-title-zone">
          <div className="org-kicker">
            <span className="org-main">
              <span className="org-dot" aria-hidden />
              {P.company}
            </span>
            <span className="org-sub">A Member of {P.group}</span>
          </div>

          <h1 className="exec-name">
            <span>{P.first}</span>
            <span>{P.last}</span>
          </h1>

          <p className="exec-role">
            <strong>{P.title}</strong>
            <span className="role-dash"> — </span>
            <span>{P.unit}</span>
          </p>

          <p className="exec-tagline">{TAGLINE}</p>
        </div>

        <div className="hero-actions">
          <button type="button" className="cta-solid" onClick={onSave}>
            <UserPlusI width="17" height="17" /> Save Contact
          </button>
          <a className="cta-line" href={`tel:${P.mobile}`}>
            <PhoneI width="16" height="16" /> Call
          </a>
          <a className="cta-line" href={waUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsI width="16" height="16" /> WhatsApp
          </a>
          <a className="cta-line" href={`mailto:${P.email}`}>
            <MailI width="16" height="16" /> Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}
