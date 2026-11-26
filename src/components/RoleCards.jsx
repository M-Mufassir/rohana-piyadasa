import { motion } from "framer-motion";
import { JOBS, P } from "../data";

const TINTS = ["#ff6a13", "#3f4f63", "#8c2f39"];

/** Swipeable editorial cards: white side strip with vertical label + tinted portrait. */
export default function RoleCards() {
  return (
    <div className="rc-track">
      {JOBS.map((j, i) => (
        <motion.article
          className="rc"
          key={j.role}
          style={{ "--tint": TINTS[i % TINTS.length] }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px -10% 0px 0px" }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="rc-side">
            <span className="rc-idx">0{i + 1}</span>
            <span className="rc-vert">{j.short}</span>
            <i className="rc-avatar" style={{ backgroundImage: `url(${P.photo})` }} />
          </div>
          <div className="rc-photo">
            <span className="rc-big">0{i + 1}</span>
            <img src={P.photo} alt="" loading="lazy" />
          </div>
          {j.now && <span className="rc-now">CURRENT</span>}
          <div className="rc-info">
            <em>{j.when}</em>
            <h3>{j.role}</h3>
            <p>{j.org}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
