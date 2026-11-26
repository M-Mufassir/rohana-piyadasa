import { useEffect, useRef } from "react";
import { motion, animate, useInView, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "", as = "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  );
}

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const v = useMotionValue(0);
  const txt = useTransform(v, (n) => Math.round(n) + suffix);
  useEffect(() => {
    if (inView) {
      const c = animate(v, to, { duration: 1.4, ease: "easeOut" });
      return () => c.stop();
    }
  }, [inView, to, v]);
  return <motion.b ref={ref}>{txt}</motion.b>;
}

export function SecHead({ children }) {
  return <div className="sec-h">{children}</div>;
}
