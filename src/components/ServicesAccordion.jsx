import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "../data";
import { ArrowUpRightI, SparkleI } from "./Icons";

/**
 * Interactive Enterprise Services Accordion inspired by Reference #2
 * ("How I Bring Ideas to Life" — numbered dark rows that expand into vibrant solid orange cards).
 */
export default function ServicesAccordion({ onInquire }) {
  const [active, setActive] = useState(1); // 02 highlighted in vibrant orange by default, matching ref UI

  return (
    <section id="services" className="sec-block">
      <div className="sec-header-row">
        <div>
          <div className="eyebrow-pill">
            <SparkleI width="12" height="12" /> ENTERPRISE CAPABILITIES
          </div>
          <h2 className="sec-title">
            How I Deliver <span>Business Impact</span>
          </h2>
        </div>
        <button type="button" className="pill-cta-sm" onClick={() => onInquire?.("")}>
          Discuss Solutions <ArrowUpRightI width="15" height="15" />
        </button>
      </div>

      <div className="svc-stack">
        {SERVICES.map((svc, idx) => {
          const open = active === idx;
          return (
            <motion.div
              key={svc.num}
              layout
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              className={`svc-item ${open ? "is-open" : ""}`}
              onClick={() => setActive(idx)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(idx);
                }
              }}
            >
              <div className="svc-top">
                <span className="svc-num">{svc.num}</span>
                <div className="svc-heading-wrap">
                  <h3>{svc.title}</h3>
                  {!open && <span className="svc-mini-tag">{svc.tag}</span>}
                </div>
                <span className="svc-orb-arrow" aria-hidden>
                  <ArrowUpRightI width="17" height="17" />
                </span>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="svc-body"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p>{svc.desc}</p>
                    <div className="svc-pills-row">
                      {svc.points.map((pt) => (
                        <span className="svc-pt" key={pt}>
                          {pt}
                        </span>
                      ))}
                      <button
                        type="button"
                        className="svc-ask-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInquire?.(svc.title);
                        }}
                      >
                        Request Consultation →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
