import { motion } from "framer-motion";
import { JOBS, P, COMPANY_BLURB, FOCUS } from "../data";
import { BriefcaseI, BuildingI, SparkleI } from "./Icons";

/**
 * Photo-free Career & Executive Journey section inspired by Reference #2
 * ("My Academic and Professional Journey" — dark structured cards with orange icon badge,
 * clean typographic hierarchy, date pills, and domain tags — ZERO portraits/photos).
 */
export default function CareerJourney() {
  return (
    <section id="career" className="sec-block">
      <div className="sec-header-row centered-head">
        <div>
          <div className="eyebrow-pill">
            <SparkleI width="12" height="12" /> EXECUTIVE TRACK RECORD
          </div>
          <h2 className="sec-title">
            My Corporate &amp; <span>Telecom Journey</span>
          </h2>
        </div>
      </div>

      <div className="journey-grid">
        {/* Primary Work Experience Card (Zero Photos) */}
        <motion.div
          className="journey-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.65 }}
        >
          <div className="jc-head">
            <div className="jc-icon-badge">
              <BriefcaseI width="20" height="20" />
            </div>
            <div>
              <h3>Work Experience</h3>
              <span>17+ Years Across Sri Lanka&apos;s Leading Operators</span>
            </div>
          </div>

          <div className="jc-timeline">
            {JOBS.map((job) => (
              <article className={`jc-row ${job.now ? "is-current" : ""}`} key={job.idx}>
                <div className="jc-rail" aria-hidden>
                  <span className="jc-dot" />
                  <span className="jc-line" />
                </div>

                <div className="jc-content">
                  <div className="jc-row-top">
                    <div>
                      <div className="jc-org-kicker">
                        <span className="jc-idx">{job.idx}</span>
                        <span>{job.short}</span>
                        {job.now && <em className="jc-live-pill">CURRENT ROLE</em>}
                      </div>
                      <h4>{job.role}</h4>
                      <p className="jc-org-sub">{job.org} · {job.type}</p>
                    </div>
                    <span className="jc-date-pill">{job.when}</span>
                  </div>

                  <p className="jc-summary">{job.summary}</p>

                  <div className="jc-tags">
                    {job.pillars.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        {/* Side / Companion Architecture: Organization & Core Domain Matrix (Zero Photos) */}
        <div className="journey-side">
          <motion.div
            className="journey-card company-spotlight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="jc-head">
              <div className="jc-icon-badge">
                <BuildingI width="20" height="20" />
              </div>
              <div>
                <h3>{P.company}</h3>
                <span>Corporate Backing &amp; Scale</span>
              </div>
            </div>

            <p className="cs-blurb">{COMPANY_BLURB}</p>

            <div className="cs-metrics">
              <div className="cs-metric-box">
                <small>GLOBAL GROUP</small>
                <strong>{P.group}</strong>
              </div>
              <div className="cs-metric-box">
                <small>HEADQUARTERS</small>
                <strong>{P.location}</strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="journey-card domain-matrix"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <div className="dm-head">
              <span>Core Specializations</span>
              <small>{FOCUS.length} Domains</small>
            </div>
            <div className="dm-grid">
              {FOCUS.map((f, i) => (
                <div className="dm-pill-card" key={f}>
                  <span className="dm-num">0{i + 1}</span>
                  <strong>{f}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
