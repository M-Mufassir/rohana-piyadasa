import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "../data";
import { ArrowUpRightI } from "./Icons";

/**
 * Seamless Open-Canvas Enterprise Solutions List (hairline-divided, zero boxy cards).
 */
export default function ServicesAccordion({ onInquire }) {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="canvas-section">
      <div className="section-head">
        <span className="sec-label">Enterprise Capabilities</span>
        <h2 className="sec-heading">Tailored Telecom &amp; Connectivity Solutions</h2>
      </div>

      <div className="solutions-list">
        {SERVICES.map((svc, idx) => {
          const open = active === idx;
          return (
            <div
              key={svc.num}
              className={`sol-row ${open ? "is-open" : ""}`}
              onClick={() => setActive(open ? -1 : idx)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(open ? -1 : idx);
                }
              }}
            >
              <div className="sol-bar">
                <span className="sol-num">{svc.num}</span>
                <div className="sol-title-group">
                  <h3>{svc.title}</h3>
                  <span className="sol-domain">{svc.tag}</span>
                </div>
                <span className="sol-toggle" aria-hidden>
                  <ArrowUpRightI width="18" height="18" />
                </span>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="sol-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <p>{svc.desc}</p>
                    <div className="sol-meta-row">
                      <div className="sol-points">
                        {svc.points.map((pt) => (
                          <span key={pt}>{pt}</span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="text-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInquire?.(svc.title);
                        }}
                      >
                        Inquire about {svc.title} <ArrowUpRightI width="14" height="14" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
