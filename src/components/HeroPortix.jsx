import { motion } from "framer-motion";
import { P, ABOUT, STATS } from "../data";
import { PhoneI, WhatsI, MailI, UserPlusI } from "./Icons";
import { Counter } from "./Parts";

const waUrl = () => `https://wa.me/${P.mobile.replace("+", "")}`;

export default function HeroPortix({ onSave }) {
  return (
    <section className="hero-canvas" aria-label="Executive Profile">
      {/* Right-sided layered portrait + warm architectural glow behind/beside Title & Name */}
      <motion.div
        className="hero-bg-portrait"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1], delay: 0.08 }}
        aria-hidden="false"
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

      {/* Foreground Executive Identity Layer */}
      <motion.div
        className="hero-identity"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
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
        </div>

        <p className="exec-bio">{ABOUT}</p>

        <div className="hero-actions">
          <button type="button" className="cta-solid" onClick={onSave}>
            <UserPlusI width="18" height="18" /> Save Contact
          </button>
          <a className="cta-line" href={`tel:${P.mobile}`}>
            <PhoneI width="17" height="17" /> Call
          </a>
          <a className="cta-line" href={waUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsI width="17" height="17" /> WhatsApp
          </a>
          <a className="cta-line" href={`mailto:${P.email}`}>
            <MailI width="17" height="17" /> Email
          </a>
        </div>

        <div className="exec-metrics">
          {STATS.map((s) => (
            <div className="metric-col" key={s.label}>
              <Counter to={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
