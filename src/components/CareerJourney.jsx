import { JOBS, P, COMPANY_BLURB, FOCUS } from "../data";

/**
 * Seamless Open-Canvas Career & Corporate Background (zero cards-in-cards, zero photos, full unclipped company names).
 */
export default function CareerJourney() {
  return (
    <section id="career" className="canvas-section">
      <div className="career-split">
        {/* Left: Clean Editorial Career Timeline */}
        <div className="career-main">
          <div className="section-head">
            <span className="sec-label">Career Track Record</span>
            <h2 className="sec-heading">Leadership Experience</h2>
          </div>

          <div className="timeline-canvas">
            {JOBS.map((job) => (
              <article className={`tl-entry ${job.now ? "is-current" : ""}`} key={job.idx}>
                <div className="tl-period">
                  <span>{job.when}</span>
                  {job.now && <em>Present Role</em>}
                </div>

                <div className="tl-body">
                  <h3>{job.role}</h3>
                  <p className="tl-company">{job.org}</p>
                  <p className="tl-desc">{job.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right: Organization Context & Core Focus Domains directly on the canvas */}
        <aside className="career-aside">
          <div className="org-editorial">
            <span className="sec-label">The Organization</span>
            <h3>{P.company}</h3>
            <p className="org-group-line">A Member of {P.group}</p>
            <p className="org-copy">{COMPANY_BLURB}</p>
          </div>

          <div className="focus-editorial">
            <span className="sec-label">Core Areas of Focus</span>
            <ul className="focus-list">
              {FOCUS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
