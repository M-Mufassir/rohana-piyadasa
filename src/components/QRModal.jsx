import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { CloseI, CopyI } from "./Icons";
import { P, pageUrl } from "../data";

export default function QRModal({ onClose, onCopied }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(pageUrl(), { margin: 1, width: 640, errorCorrectionLevel: "M", color: { dark: "#0a0a0f", light: "#ffffff" } }).then(setSrc);
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      onCopied("Link copied");
    } catch {
      onCopied("Copy not supported");
    }
  };

  return (
    <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="modal"
        role="dialog"
        aria-label="QR code"
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="x" onClick={onClose} aria-label="Close"><CloseI /></button>
        <div className="qr-title">Scan to connect</div>
        <div className="qr-sub">{P.name} · {P.company}</div>
        <div className="qr-box">{src ? <img src={src} alt="QR code for this page" /> : <div className="qr-load" />}</div>
        <button className="btn ghost-wide" onClick={copy}><CopyI /> Copy link</button>
      </motion.div>
    </motion.div>
  );
}
