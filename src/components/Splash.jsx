import { motion } from "framer-motion";
import { NfcI } from "./Icons";
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
        <div className="splash-logo">
          <NfcI />
        </div>
      </div>
      <div className="splash-txt">
        <img src={P.logo} alt="HUTCH Enterprise" />
      </div>
    </motion.div>
  );
}
