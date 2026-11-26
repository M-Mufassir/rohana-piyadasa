import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import Card3D from "./components/Card3D";
import Splash from "./components/Splash";
import QRModal from "./components/QRModal";
import Poster from "./components/Poster";
import RoleCards from "./components/RoleCards";
import { Reveal, Counter, SecHead } from "./components/Parts";
import { PhoneI, MailI, WhatsI, SmsI, UserPlusI, ShareI, ChevI, PinI, InI, GlobeI, QrI, NfcI } from "./components/Icons";
import { P, ABOUT, STATS, FOCUS, JOBS, COMPANY_BLURB, pageUrl } from "./data";
import { saveVCard } from "./lib/vcard";

const wa = (text = "") => `https://wa.me/${P.mobile.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export default function App() {
  const [splash, setSplash] = useState(true);
  const [qr, setQr] = useState(false);
  const [toast, setToast] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "", topic: "" });
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const say = useCallback((m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setSplash(false), reduce ? 200 : 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (splash) return;
    const ctx = gsap.context(() => {
      gsap.from(".id > *", { y: 20, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.35 });
      gsap.from(".q", { y: 24, opacity: 0, stagger: 0.08, duration: 0.7, ease: "back.out(1.6)", delay: 0.7 });
    });
    return () => ctx.revert();
  }, [splash]);

  const share = async () => {
    const data = { title: P.name, text: `${P.name} · ${P.title} ${P.unit} · ${P.company}`, url: pageUrl() };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(pageUrl());
        say("Link copied");
      }
    } catch {
      /* cancelled */
    }
  };

  const save = async () => {
    await saveVCard();
    say("Contact card ready — open to save");
  };

  const leadText = `Hello ${P.first}, I'd like a call back regarding ${lead.topic || "Hutch Enterprise solutions"}.\nName: ${lead.name || "-"}\nPhone: ${lead.phone || "-"}`;
  const leadMail = `mailto:${P.email}?subject=${encodeURIComponent("Call back request – Hutch Enterprise")}&body=${encodeURIComponent(leadText)}`;

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="bg-glow" />
      <div className="grain" />

      <AnimatePresence>{splash && <Splash key="splash" />}</AnimatePresence>

      <main className="wrap">
        <header className="top">
          <img className="brand-logo" src={P.logo} alt="HUTCH Enterprise" />
          <div className="pill">
            <NfcI width="14" height="14" /> NFC card
          </div>
        </header>

        <Card3D ready={!splash} />

        <div className="id">
          <span className="tag">
            {P.title} · {P.unit}
          </span>
          <h1>
            {P.first}
            <br />
            <span>{P.last}</span>
          </h1>
          <p>
            <b>{P.company}</b> · a member of {P.group}
          </p>
        </div>

        <div className="quick">
          <a className="q" href={`tel:${P.mobile}`}><PhoneI />Call</a>
          <a className="q" href={wa()} target="_blank" rel="noopener noreferrer"><WhatsI />WhatsApp</a>
          <a className="q" href={`mailto:${P.email}`}><MailI />Email</a>
          <a className="q" href={`sms:${P.mobile}`}><SmsI />SMS</a>
        </div>

        <Poster onBadge={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })} />

        <Reveal>
          <SecHead>About</SecHead>
          <div className="glass">
            <p className="about">{ABOUT}</p>
            <div className="stats">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <Counter to={s.value} suffix={s.suffix} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="contact">
          <SecHead>Contact</SecHead>
          <div className="contact-list">
            <a className="row" href={`tel:${P.mobile}`}>
              <div className="ico"><PhoneI /></div>
              <div><small>Mobile</small><span>{P.mobileFmt}</span></div>
              <ChevI className="go" width="16" height="16" />
            </a>
            <a className="row" href={`tel:${P.general}`}>
              <div className="ico"><PhoneI /></div>
              <div><small>General</small><span>{P.generalFmt}</span></div>
              <ChevI className="go" width="16" height="16" />
            </a>
            <a className="row" href={`mailto:${P.email}`}>
              <div className="ico"><MailI /></div>
              <div><small>Email</small><span>{P.email}</span></div>
              <ChevI className="go" width="16" height="16" />
            </a>
            {P.website && (
              <a className="row" href={P.website} target="_blank" rel="noopener noreferrer">
                <div className="ico"><GlobeI /></div>
                <div><small>Website</small><span>{P.website.replace(/^https?:\/\//, "")}</span></div>
                <ChevI className="go" width="16" height="16" />
              </a>
            )}
            {P.linkedin && (
              <a className="row" href={P.linkedin} target="_blank" rel="noopener noreferrer">
                <div className="ico"><InI /></div>
                <div><small>LinkedIn</small><span>View profile</span></div>
                <ChevI className="go" width="16" height="16" />
              </a>
            )}
            <div className="row">
              <div className="ico"><PinI /></div>
              <div><small>Location</small><span>{P.location}</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <SecHead>Expertise</SecHead>
          <div className="chips">
            {FOCUS.map((f, i) => (
              <motion.span
                className="chip"
                key={f}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
              >
                {f}
              </motion.span>
            ))}
          </div>
        </Reveal>

        <Reveal className="career">
          <SecHead>Career</SecHead>
          <RoleCards />
        </Reveal>

        <Reveal>
          <SecHead>The Company</SecHead>
          <div className="group">
            <h3>{P.company}</h3>
            <p>{COMPANY_BLURB}</p>
            <div className="ck">A MEMBER OF {P.group.toUpperCase()}</div>
          </div>
        </Reveal>

        <Reveal>
          <SecHead>Request a call back</SecHead>
          <div className="glass form">
            <input placeholder="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} autoComplete="name" />
            <input placeholder="Phone number" inputMode="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} autoComplete="tel" />
            <input placeholder="What do you need? (e.g. fiber, connectivity)" value={lead.topic} onChange={(e) => setLead({ ...lead, topic: e.target.value })} />
            <div className="form-actions">
              <a className="btn" href={wa(leadText)} target="_blank" rel="noopener noreferrer"><WhatsI /> WhatsApp</a>
              <a className="btn ghost-wide" href={leadMail}><MailI /> Email</a>
            </div>
          </div>
        </Reveal>

        <footer>
          <img className="powered" src={P.poweredBy} alt="Powered by HUTCH Enterprise" />
          © {new Date().getFullYear()} HUTCH Enterprise · a member of {P.group}
          <br />
          Tap your NFC card to share this page
        </footer>
      </main>

      <div className="dock">
        <div className="dock-in">
          <button className="btn" onClick={save}><UserPlusI /> Save Contact</button>
          <button className="btn ghost" onClick={() => setQr(true)} aria-label="Show QR code"><QrI /></button>
          <button className="btn ghost" onClick={share} aria-label="Share"><ShareI /></button>
        </div>
      </div>

      <AnimatePresence>{qr && <QRModal key="qr" onClose={() => setQr(false)} onCopied={say} />}</AnimatePresence>
      <div className={"toast" + (toast ? " show" : "")} role="status">{toast}</div>
    </>
  );
}
