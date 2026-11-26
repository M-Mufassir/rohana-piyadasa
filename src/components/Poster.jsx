import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { P } from "../data";
import { NfcI } from "./Icons";

const BADGE = "HUTCH ENTERPRISE • TAP • CONNECT • ";

/** Layered editorial hero: text BEHIND the portrait, outline text IN FRONT of it. */
export default function Poster({ onBadge }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r = (a, b) => (reduce ? [0, 0] : [a, b]);
  const y1 = useTransform(scrollYProgress, [0, 1], r(38, -38));
  const y2 = useTransform(scrollYProgress, [0, 1], r(-24, 34));
  const yp = useTransform(scrollYProgress, [0, 1], r(10, -4));
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  return (
    <div className="poster-wrap" ref={ref}>
      <div className="poster">
        <div className="p-checker" />
        <motion.svg className="p-star" style={{ rotate: rot }} viewBox="-110 -110 220 220" aria-hidden>
          {[0, 60, 120].map((a) => (
            <rect key={a} x="-15" y="-104" width="30" height="208" rx="5" fill="#ff6a13" transform={`rotate(${a})`} />
          ))}
        </motion.svg>

        <div className="p-top">
          <span>HELLO, I’M ROHANA</span>
          <span>SINCE 2007 · TELECOM</span>
        </div>
        <div className="p-vert">{P.unit.toUpperCase()}</div>

        <motion.div className="p-word w1" style={{ y: y1 }}>SENIOR</motion.div>
        <motion.div className="p-word w2" style={{ y: y2 }}>MANAGER</motion.div>

        <motion.img className="p-photo" style={{ x: "-50%", y: yp }} src={P.photo} alt={P.name} />

        <motion.div className="p-word w2 outline" style={{ y: y2 }} aria-hidden>MANAGER</motion.div>
      </div>

      <button className="p-badge" onClick={onBadge} aria-label="Go to contact details">
        <svg className="spin" viewBox="0 0 120 120" aria-hidden>
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fill="#fff" fontSize="10.5" fontWeight="700" fontFamily="Sora, sans-serif">
            <textPath href="#badge-circle" textLength="286" lengthAdjust="spacing">{BADGE}</textPath>
          </text>
        </svg>
        <span className="core"><NfcI /></span>
      </button>
    </div>
  );
}
