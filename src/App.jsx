import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Card3D from "./components/Card3D";
import Splash from "./components/Splash";
import QRModal from "./components/QRModal";
import HeroPortix from "./components/HeroPortix";
import ServicesAccordion from "./components/ServicesAccordion";
import CareerJourney from "./components/CareerJourney";
import { Reveal } from "./components/Parts";
import {
  PhoneI,
  MailI,
  WhatsI,
  UserPlusI,
  ShareI,
  PinI,
  InI,
  GlobeI,
  QrI,
  CopyI,
} from "./components/Icons";
import { P, pageUrl } from "./data";
import { saveVCard } from "./lib/vcard";

const wa = (text = "") =>
  `https://wa.me/${P.mobile.replace("+", "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

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
    const t = setTimeout(() => setSplash(false), reduce ? 120 : 1050);
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
      title: `${P.name} · ${P.company}`,
      text: `${P.name} — ${P.title}, ${P.unit} at ${P.company}`,
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
    say("Contact card (.vcf) downloaded");
  };

  const leadText = `Hello ${P.shortFirst}, I would like to discuss ${lead.topic || "HUTCH Enterprise solutions"}.\nName: ${lead.name || "-"}\nPhone: ${lead.phone || "-"}`;
  const leadMail = `mailto:${P.email}?subject=${encodeURIComponent("Enterprise Inquiry – HUTCH Enterprise")}&body=${encodeURIComponent(leadText)}`;

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="canvas-ambient" aria-hidden />

      <AnimatePresence>{splash && <Splash key="splash" />}</AnimatePresence>

      <div className="canvas-wrap">
        {/* Clean Executive Top Header */}
        <header className="top-nav">
          <a href="#" className="brand-lockup" aria-label="HUTCH Enterprise">
            <img className="brand-logo" src={P.logo} alt="HUTCH" />
            <span className="brand-divider" aria-hidden />
            <span className="brand-unit">Enterprise</span>
          </a>

          <nav className="nav-menu" aria-label="Page navigation">
            <a href="#card">Digital Card</a>
            <a href="#services">Solutions</a>
            <a href="#career">Experience</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button type="button" className="nav-icon-btn" onClick={() => setQr(true)} aria-label="Show QR Code">
              <QrI width="17" height="17" />
            </button>
            <button type="button" className="nav-icon-btn" onClick={share} aria-label="Share Profile">
              <ShareI width="17" height="17" />
            </button>
            <button type="button" className="nav-cta" onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>
        </header>

        <main className="canvas-flow">
          {/* 1. Open Canvas Hero — Clear Identity + Portrait #1 (Main) */}
          <HeroPortix onSave={save} />

          {/* 2. Open Canvas Interactive 3D NFC Card — Portrait #2 (Card) */}
          <Reveal id="card" className="canvas-section card-band">
            <div className="card-band-grid">
              <div className="card-band-copy">
                <span className="sec-label">NFC Digital Business Card</span>
                <h2 className="sec-heading">Interactive Executive Pass</h2>
                <p>
                  Drag to rotate or tap the card to flip between executive credentials and your instant QR connection pass for{" "}
                  <strong>{P.name}</strong> at <strong>{P.company}</strong>.
                </p>
                <div className="inline-links">
                  <button type="button" className="cta-solid sm" onClick={save}>
                    <UserPlusI width="16" height="16" /> Save to Contacts (.vcf)
                  </button>
                  <button type="button" className="cta-line sm" onClick={() => setQr(true)}>
                    <QrI width="16" height="16" /> Open QR Code
                  </button>
                </div>
              </div>

              <div className="card-band-stage">
                <Card3D ready={!splash} />
              </div>
            </div>
          </Reveal>

          {/* 3. Open Canvas Enterprise Capabilities */}
          <Reveal as="div">
            <ServicesAccordion onInquire={handleInquire} />
          </Reveal>

          {/* 4. Open Canvas Photo-Free Career & Organization */}
          <Reveal as="div">
            <CareerJourney />
          </Reveal>

          {/* 5. Open Canvas Direct Contact & Callback */}
          <Reveal id="contact" className="canvas-section">
            <div className="contact-split">
              <div className="contact-direct">
                <span className="sec-label">Direct Contact</span>
                <h2 className="sec-heading">Connect with {P.name}</h2>
                <p className="contact-lead">
                  Reach out directly for corporate connectivity, dedicated fiber, mobility fleets, or strategic enterprise partnerships.
                </p>

                <div className="direct-lines">
                  <div className="dl-item">
                    <a href={`tel:${P.mobile}`} className="dl-link">
                      <PhoneI className="dl-ico" />
                      <div>
                        <small>Direct Mobile</small>
                        <strong>{P.mobileFmt}</strong>
                      </div>
                    </a>
                    <button type="button" className="dl-copy" onClick={() => copyText(P.mobile, "Mobile number")} aria-label="Copy mobile">
                      <CopyI width="15" height="15" />
                    </button>
                  </div>

                  <div className="dl-item">
                    <a href={`tel:${P.general}`} className="dl-link">
                      <PhoneI className="dl-ico" />
                      <div>
                        <small>Enterprise General Line</small>
                        <strong>{P.generalFmt}</strong>
                      </div>
                    </a>
                    <button type="button" className="dl-copy" onClick={() => copyText(P.general, "General number")} aria-label="Copy general number">
                      <CopyI width="15" height="15" />
                    </button>
                  </div>

                  <div className="dl-item">
                    <a href={`mailto:${P.email}`} className="dl-link">
                      <MailI className="dl-ico" />
                      <div>
                        <small>Official Email</small>
                        <strong className="email-txt">{P.email}</strong>
                      </div>
                    </a>
                    <button type="button" className="dl-copy" onClick={() => copyText(P.email, "Email address")} aria-label="Copy email">
                      <CopyI width="15" height="15" />
                    </button>
                  </div>

                  {P.website && (
                    <div className="dl-item">
                      <a href={P.website} target="_blank" rel="noopener noreferrer" className="dl-link">
                        <GlobeI className="dl-ico" />
                        <div>
                          <small>Website</small>
                          <strong>{P.website.replace(/^https?:\/\//, "")}</strong>
                        </div>
                      </a>
                    </div>
                  )}

                  {P.linkedin && (
                    <div className="dl-item">
                      <a href={P.linkedin} target="_blank" rel="noopener noreferrer" className="dl-link">
                        <InI className="dl-ico" />
                        <div>
                          <small>LinkedIn</small>
                          <strong>Executive Profile</strong>
                        </div>
                      </a>
                    </div>
                  )}

                  <div className="dl-item">
                    <div className="dl-link">
                      <PinI className="dl-ico" />
                      <div>
                        <small>Corporate Office</small>
                        <strong>{P.company} · {P.location}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-inquiry">
                <span className="sec-label">Request a Call Back</span>
                <h3>Send a Quick Brief</h3>
                <p>Leave your details below to initiate a conversation via WhatsApp or corporate email.</p>

                <div className="clean-form">
                  <label>
                    <span>Your Name or Company</span>
                    <input
                      placeholder="e.g. Kamal Perera · Apex Holdings"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <input
                      placeholder="+94 7X XXX XXXX"
                      inputMode="tel"
                      value={lead.phone}
                      onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                      autoComplete="tel"
                    />
                  </label>
                  <label>
                    <span>Requirement</span>
                    <input
                      placeholder="Dedicated fiber, corporate mobile fleet, enterprise SLA..."
                      value={lead.topic}
                      onChange={(e) => setLead({ ...lead, topic: e.target.value })}
                    />
                  </label>

                  <div className="inquiry-btns">
                    <a className="cta-solid" href={wa(leadText)} target="_blank" rel="noopener noreferrer">
                      <WhatsI width="17" height="17" /> Message on WhatsApp
                    </a>
                    <a className="cta-line" href={leadMail}>
                      <MailI width="17" height="17" /> Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </main>

        <footer className="canvas-footer">
          <img className="powered" src={P.poweredBy} alt="Powered by HUTCH Enterprise" />
          <div className="footer-meta">
            <span>
              <strong>{P.name}</strong> · {P.title}, {P.unit}
            </span>
            <span>
              © {new Date().getFullYear()} {P.company} · A Member of {P.group}
            </span>
          </div>
        </footer>
      </div>

      {/* Mobile-only Sticky Action Bar for instant NFC Save */}
      <div className="mobile-bar">
        <button type="button" className="cta-solid full" onClick={save}>
          <UserPlusI width="17" height="17" /> Save Contact
        </button>
        <a className="bar-icon" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsI width="18" height="18" />
        </a>
        <button type="button" className="bar-icon" onClick={() => setQr(true)} aria-label="QR Code">
          <QrI width="18" height="18" />
        </button>
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
