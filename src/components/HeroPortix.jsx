import { motion } from "framer-motion";
import { P, ABOUT, STATS } from "../data";
import { PhoneI, WhatsI, MailI, UserPlusI } from "./Icons";
import { Counter } from "./Parts";

const waUrl = () => `https://wa.me/${P.mobile.replace("+", "")}`;

export default function HeroPortix({ onSave }) {
  return (
    <section className="hero-canvas" aria-label="Executive Profile">
      <div className="hero-grid">
        {/* Left: Unmistakable Executive Identity — Full Name, Role, Company & Direct Actions */}
        <motion.div
          className="hero-identity"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="org-kicker">
            <span className="org-dot" aria-hidden />
            <span>{P.company}</span>
            <span className="kicker-sep">·</span>
            <span className="org-sub">A Member of {P.group}</span>
          </div>

          <h1 className="exec-name">{P.name}</h1>

          <p className="exec-role">
            {P.title} <span>— {P.unit}</span>
          </p>

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

        {/* Right: Single Main Studio Portrait seamlessly integrated into the open canvas */}
        <motion.div
          className="hero-portrait-stage"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
        >
          <div className="studio-orb" aria-hidden />
          <div className="portrait-fade-wrap">
            <img
              className="hero-portrait-img"
              src={P.photo}
              alt={`${P.name} — ${P.title}, ${P.unit} at ${P.company}`}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
