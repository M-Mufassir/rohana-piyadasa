import { motion } from "framer-motion";
import { NfcI } from "./Icons";
import { P } from "../data";

export default function Splash() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="splash-core">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="ring"
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          />
        ))}
        <motion.div
          className="splash-logo"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
        >
          <NfcI />
        </motion.div>
      </div>
      <motion.div
        className="splash-txt"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <img src={P.logo} alt="HUTCH Enterprise" />
      </motion.div>
      <motion.div className="splash-tap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <NfcI /> Card detected
      </motion.div>
    </motion.div>
  );
}
