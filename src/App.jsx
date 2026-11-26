import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Card3D from "./components/Card3D";
import Splash from "./components/Splash";
import QRModal from "./components/QRModal";
import HeroPortix from "./components/HeroPortix";
import ServicesAccordion from "./components/ServicesAccordion";
import CareerJourney from "./components/CareerJourney";
import { Reveal, Counter } from "./components/Parts";
import {
  PhoneI,
  MailI,
  WhatsI,
  SmsI,
  UserPlusI,
  ShareI,
  ChevI,
  ArrowRightI,
  PinI,
  InI,
  GlobeI,
  QrI,
  NfcI,
  SparkleI,
  CopyI,
} from "./components/Icons";
import { P, ABOUT, STATS, pageUrl } from "./data";
import { saveVCard } from "./lib/vcard";

const wa = (text = "") =>
  `https://wa.me/${P.mobile.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const QUICK_TOPICS = ["Dedicated Fiber", "Corporate Mobility", "Enterprise Connectivity", "Custom SLA"];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [qr, setQr] = useState(false);
  const [toast, setToast] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "", topic: "" });
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const say = useCallback((m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setSplash(false), reduce ? 180 : 1650);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInquire = (topic = "") => {
    if (topic) setLead((prev) => ({ ...prev, topic }));
    scrollTo("contact");
  };

  const share = async () => {
    const data = {
      title: P.name,
      text: `${P.name} · ${P.title} ${P.unit} · ${P.company}`,
      url: pageUrl(),
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(pageUrl());
        say("Profile link copied");
      }
    } catch {
      /* cancelled */
    }
  };

  const copyText = async (val, label) => {
    try {
      await navigator.clipboard.writeText(val);
      say(`${label} copied`);
    } catch {
      say("Copy unavailable");
    }
  };

  const save = async () => {
    await saveVCard();
    say("Contact card (.vcf) ready to save");
  };

  const leadText = `Hello ${P.shortFirst}, I'd like a call back regarding ${lead.topic || "HUTCH Enterprise solutions"}.\nName: ${lead.name || "-"}\nPhone: ${lead.phone || "-"}`;
  const leadMail = `mailto:${P.email}?subject=${encodeURIComponent("Call back request – HUTCH Enterprise")}&body=${encodeURIComponent(leadText)}`;

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="bg-glow" aria-hidden />
      <div className="grain" aria-hidden />

      <AnimatePresence>{splash && <Splash key="splash" />}</AnimatePresence>

      <div className="page-shell">
        {/* PORTIX-inspired Top Navigation Bar */}
        <header className="portix-nav">
          <a href="#" className="nav-brand" aria-label="HUTCH Enterprise Home">
            <img className="brand-logo" src={P.logo} alt="HUTCH Enterprise" />
            <span className="nfc-tag-dot">
              <NfcI width="13" height="13" /> NFC
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary sections">
            <a href="#card">NFC CARD</a>
            <a href="#services">SOLUTIONS</a>
            <a href="#career">CAREER</a>
            <a href="#contact">CONTACT</a>
          </nav>

          <div className="nav-right">
            <button
              type="button"
              className="icon-btn-top"
              onClick={() => setQr(true)}
              aria-label="Open QR Code"
              title="Show QR Code"
            >
              <QrI width="17" height="17" />
            </button>
            <button type="button" className="portix-talk-btn" onClick={() => scrollTo("contact")}>
              <span className="pt-arrow" aria-hidden>
                <ArrowRightI width="15" height="15" />
              </span>
              <span className="pt-label">LET&apos;S TALK</span>
            </button>
          </div>
        </header>

        <main className="main-container">
          {/* 1. PORTIX Hero (Contains Image #1 — Main Portrait) + Scrolling Sparkle Marquee */}
          <HeroPortix onConnect={() => scrollTo("contact")} />

          {/* 2. Interactive 3D NFC Digital Card + Executive Overview (Contains Image #2 — Card Portrait) */}
          <Reveal id="card" className="sec-block">
            <div className="card-showcase-grid">
              <div className="card-stage-panel">
                <div className="panel-top-meta">
                  <span className="eyebrow-pill">
                    <NfcI width="13" height="13" /> DIGITAL BUSINESS CARD
                  </span>
                  <span className="interactive-tag">360° INTERACTIVE</span>
                </div>

                <Card3D ready={!splash} />

                <div className="card-quick-actions">
                  <button type="button" className="btn-primary-sm" onClick={save}>
                    <UserPlusI width="17" height="17" /> Save Contact
                  </button>
                  <button type="button" className="btn-ghost-sm" onClick={() => setQr(true)}>
                    <QrI width="17" height="17" /> QR Code
                  </button>
                  <button type="button" className="btn-ghost-sm" onClick={share}>
                    <ShareI width="17" height="17" /> Share
                  </button>
                </div>
              </div>

              <div className="about-panel">
                <div className="eyebrow-pill">
                  <SparkleI width="12" height="12" /> EXECUTIVE PROFILE
                </div>
                <h2 className="sec-title">
                  Strategic Growth &amp; <span>Trusted Partnerships</span>
                </h2>
                <p className="about-copy">{ABOUT}</p>

                <div className="stats-bento">
                  {STATS.map((s) => (
                    <div className="stat-tile" key={s.label}>
                      <Counter to={s.value} suffix={s.suffix} />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="instant-channels">
                  <a className="ic-chip" href={`tel:${P.mobile}`}>
                    <PhoneI width="16" height="16" /> Call
                  </a>
                  <a className="ic-chip" href={wa()} target="_blank" rel="noopener noreferrer">
                    <WhatsI width="16" height="16" /> WhatsApp
                  </a>
                  <a className="ic-chip" href={`mailto:${P.email}`}>
                    <MailI width="16" height="16" /> Email
                  </a>
                  <a className="ic-chip" href={`sms:${P.mobile}`}>
                    <SmsI width="16" height="16" /> SMS
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3. Reference #2 Interactive Orange Expandable Enterprise Services */}
          <Reveal as="div">
            <ServicesAccordion onInquire={handleInquire} />
          </Reveal>

          {/* 4. New Photo-Free Career & Corporate Journey Section */}
          <CareerJourney />

          {/* 5. Direct Contact Channels & Instant Callback Request */}
          <Reveal id="contact" className="sec-block">
            <div className="sec-header-row">
              <div>
                <div className="eyebrow-pill">
                  <SparkleI width="12" height="12" /> DIRECT ACCESS
                </div>
                <h2 className="sec-title">
                  Let&apos;s Build Your <span>Next Connection</span>
                </h2>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-list-card">
                <div className="clc-row">
                  <a className="clc-main" href={`tel:${P.mobile}`}>
                    <div className="ico"><PhoneI /></div>
                    <div>
                      <small>Direct Mobile</small>
                      <span>{P.mobileFmt}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="copy-mini"
                    onClick={() => copyText(P.mobile, "Mobile number")}
                    aria-label="Copy mobile number"
                  >
                    <CopyI width="15" height="15" />
                  </button>
                </div>

                <div className="clc-row">
                  <a className="clc-main" href={`tel:${P.general}`}>
                    <div className="ico"><PhoneI /></div>
                    <div>
                      <small>Enterprise General Line</small>
                      <span>{P.generalFmt}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="copy-mini"
                    onClick={() => copyText(P.general, "General number")}
                    aria-label="Copy general number"
                  >
                    <CopyI width="15" height="15" />
                  </button>
                </div>

                <div className="clc-row">
                  <a className="clc-main" href={`mailto:${P.email}`}>
                    <div className="ico"><MailI /></div>
                    <div>
                      <small>Corporate Email</small>
                      <span>{P.email}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="copy-mini"
                    onClick={() => copyText(P.email, "Email address")}
                    aria-label="Copy email address"
                  >
                    <CopyI width="15" height="15" />
                  </button>
                </div>

                {P.website && (
                  <a className="clc-row link-only" href={P.website} target="_blank" rel="noopener noreferrer">
                    <div className="ico"><GlobeI /></div>
                    <div>
                      <small>Website</small>
                      <span>{P.website.replace(/^https?:\/\//, "")}</span>
                    </div>
                    <ChevI className="go" width="16" height="16" />
                  </a>
                )}

                {P.linkedin && (
                  <a className="clc-row link-only" href={P.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className="ico"><InI /></div>
                    <div>
                      <small>LinkedIn</small>
                      <span>View Executive Profile</span>
                    </div>
                    <ChevI className="go" width="16" height="16" />
                  </a>
                )}

                <div className="clc-row static">
                  <div className="ico"><PinI /></div>
                  <div>
                    <small>Office Location</small>
                    <span>{P.location} · {P.company}</span>
                  </div>
                </div>
              </div>

              <div className="callback-card">
                <div className="cb-head">
                  <h3>Request a Call Back</h3>
                  <p>Share your details and preferred solution — connect instantly via WhatsApp or Email.</p>
                </div>

                <div className="topic-chips">
                  {QUICK_TOPICS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`t-chip ${lead.topic === t ? "active" : ""}`}
                      onClick={() => setLead({ ...lead, topic: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="form-fields">
                  <input
                    placeholder="Your name / company"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    autoComplete="name"
                  />
                  <input
                    placeholder="Phone number"
                    inputMode="tel"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    autoComplete="tel"
                  />
                  <input
                    placeholder="What solution do you need? (e.g. dedicated fiber)"
                    value={lead.topic}
                    onChange={(e) => setLead({ ...lead, topic: e.target.value })}
                  />
                </div>

                <div className="form-actions">
                  <a className="btn" href={wa(leadText)} target="_blank" rel="noopener noreferrer">
                    <WhatsI /> Send via WhatsApp
                  </a>
                  <a className="btn ghost-wide" href={leadMail}>
                    <MailI /> Send Email
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <footer className="site-footer">
            <img className="powered" src={P.poweredBy} alt="Powered by HUTCH Enterprise" />
            <p>
              © {new Date().getFullYear()} <strong>{P.company}</strong> · A Member of {P.group}
            </p>
            <small>Tap your HUTCH Enterprise NFC card anytime to share this digital profile</small>
          </footer>
        </main>
      </div>

      {/* Persistent Mobile & Quick-Action Floating Dock */}
      <div className="dock">
        <div className="dock-in">
          <button type="button" className="btn" onClick={save}>
            <UserPlusI /> Save Contact
          </button>
          <a className="btn ghost" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsI />
          </a>
          <button type="button" className="btn ghost" onClick={() => setQr(true)} aria-label="Show QR code">
            <QrI />
          </button>
          <button type="button" className="btn ghost" onClick={share} aria-label="Share profile">
            <ShareI />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {qr && <QRModal key="qr" onClose={() => setQr(false)} onCopied={say} />}
      </AnimatePresence>
      <div className={"toast" + (toast ? " show" : "")} role="status">
        {toast}
      </div>
    </>
  );
}
