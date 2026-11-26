import { motion } from "framer-motion";
import { P, FOCUS } from "../data";
import { PhoneI, WhatsI, MailI, SparkleI, ArrowUpRightI } from "./Icons";

const waUrl = () => `https://wa.me/${P.mobile.replace("+", "")}`;

export default function HeroPortix({ onConnect }) {
  const tickerItems = [...FOCUS, "HUTCH Enterprise", "CK Hutchison Holdings"];

  return (
    <section className="hero-shell" aria-label="Introduction">
      <div className="hero-stage">
        {/* Ambient subtle grid & warm vignette */}
        <div className="hero-grid-bg" aria-hidden />

        <div className="hero-split">
          {/* Left column: PORTIX editorial role eyebrow + high-contrast two-tone statement */}
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
          >
            <div className="hero-eyebrow">
              <span className="sq-dot" aria-hidden />
              <span>{P.title.toUpperCase()} · {P.unit.toUpperCase()}</span>
            </div>

            <h2 className="hero-statement">
              <span className="bright">CONNECTIVITY</span> THAT EMPOWERS MODERN{" "}
              <span className="bright-accent">ENTERPRISES</span>
            </h2>

            <p className="hero-sub">
              Driving strategic B2B growth at <strong>{P.company}</strong> — delivering dedicated fiber, corporate mobility, and resilient telecom ecosystems across Sri Lanka.
            </p>

            <div className="hero-quick-bar">
              <a className="hq-pill primary" href={`tel:${P.mobile}`}>
                <PhoneI /> Call Direct
              </a>
              <a className="hq-pill" href={waUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsI /> WhatsApp
              </a>
              <a className="hq-pill" href={`mailto:${P.email}`}>
                <MailI /> Email
              </a>
            </div>
          </motion.div>

          {/* Right column: PORTIX glowing terracotta orb + single main authentic portrait */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}
          >
            <div className="orb-halo" aria-hidden />
            <div className="orb-circle" aria-hidden />

            {/* Floating executive credential pills inspired by Reference #2 */}
            <div className="float-badge fb-left">
              <strong>10+ Yrs</strong>
              <span>Telecom Leadership</span>
            </div>
            <div className="float-badge fb-right">
              <span className="live-dot" />
              <span>Colombo · Sri Lanka</span>
            </div>

            <img
              className="hero-portrait"
              src={P.photo}
              alt={P.name}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>

        {/* Bottom spanning giant display name + overlapping circular orange CTA (PORTIX signature) */}
        <div className="hero-bottom-lockup">
          <div className="hero-prefix-tag">P.A. · HUTCH ENTERPRISE · CK HUTCHISON GROUP</div>

          <button
            type="button"
            className="portix-cta-circle"
            onClick={onConnect}
            aria-label="Connect with Rohana Piyadasa"
          >
            <span>CONNECT NOW</span>
            <ArrowUpRightI width="16" height="16" />
          </button>

          <h1 className="hero-giant-name" aria-label={P.name}>
            <span>ROHANA</span> <span>PIYADASA</span>
          </h1>
        </div>
      </div>

      {/* Reference #2 signature scrolling sparkle marquee strip */}
      <div className="marquee-bar" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div className="marquee-group" key={dup}>
              {tickerItems.map((item) => (
                <span className="marquee-item" key={`${dup}-${item}`}>
                  <SparkleI className="m-star" width="14" height="14" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
