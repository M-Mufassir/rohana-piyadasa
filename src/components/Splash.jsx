import { motion } from "framer-motion";
import { P } from "../data";

export default function Splash() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="splash-core">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="ring"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
          />
        ))}
        <div className="splash-logo" aria-hidden>
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M17 16h8.5v11.8h13V16H47v32h-8.5V35.4h-13V48H17V16z" fill="#ffffff" />
          </svg>
        </div>
      </div>
      <div className="splash-txt">
        <img src={P.logo} alt="HUTCH Enterprise" />
      </div>
    </motion.div>
  );
}
