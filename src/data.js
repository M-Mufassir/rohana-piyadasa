// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change anything on the card / page.
// ─────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;

export const P = {
  name: "P.A. Rohana Piyadasa",
  first: "P.A. Rohana",
  shortFirst: "Rohana",
  last: "Piyadasa",
  heroName: "ROHANA PIYADASA",
  title: "Senior Manager",
  unit: "Enterprise Business",
  company: "HUTCH Enterprise",
  group: "CK Hutchison Holdings",
  mobile: "+94727376036",
  mobileFmt: "+94 72 737 6036",
  general: "+94788632632",
  generalFmt: "+94 78 863 2632",
  email: "rohanap@hutchison.lk",
  location: "Colombo, Sri Lanka",
  photo: `${base}rohana-portrait.png`, // authentic studio cutout used ONLY in Hero & 3D Card
  logo: `${base}hutch-logo.png`, // HUTCH ENTERPRISE logo (transparent PNG)
  poweredBy: `${base}hutch-powered-by.png`, // "Powered by" lock-up used in footer
  linkedin: "", // e.g. "https://www.linkedin.com/in/…"  (row appears automatically)
  website: "", // e.g. "https://www.hutch.lk"            (row appears automatically)
  url: "", // leave empty to use the live page URL for QR / share / vCard
};

export const ABOUT =
  "With over a decade of experience in the telecommunications industry, I drive enterprise growth through innovative business strategies and strong client relationships — delivering tailored telecom solutions that meet diverse business needs, with customer satisfaction and long-term partnerships at the core.";

export const STATS = [
  { value: 10, suffix: "+", label: "Years in Telecom" },
  { value: 2, suffix: "", label: "Tier-1 Operators" },
  { value: 100, suffix: "%", label: "Enterprise Focus" },
];

export const FOCUS = [
  "Enterprise Solutions",
  "Fiber & Broadband",
  "Corporate Connectivity",
  "Business Development",
  "Client Relationships",
  "Digital Transformation",
];

export const SERVICES = [
  {
    num: "01",
    title: "Enterprise Solutions & Strategy",
    tag: "B2B Architecture",
    desc: "End-to-end telecommunications roadmaps tailored to corporate scale, multi-branch operations, and mission-critical business continuity across Sri Lanka.",
    points: ["Custom SLA", "Scalable Voice & Data", "Account Leadership"],
  },
  {
    num: "02",
    title: "Dedicated Fiber & Broadband",
    tag: "High-Speed Core",
    desc: "High-availability dedicated internet, metro ethernet, and corporate broadband engineered for low-latency enterprise workloads and cloud access.",
    points: ["Dedicated Leased Lines", "Redundant Uplink", "24/7 Enterprise NOC"],
  },
  {
    num: "03",
    title: "Corporate Connectivity & Mobility",
    tag: "Unified Workforce",
    desc: "Seamless corporate mobile fleets, secure APN/VPN private networking, and unified communication packages built to keep executive and field teams connected.",
    points: ["Corporate Postpaid", "Private APN", "Fleet Management"],
  },
  {
    num: "04",
    title: "Digital Transformation Partnerships",
    tag: "Future-Ready",
    desc: "Long-term consultative partnerships leveraging CK Hutchison's global telecom innovation to modernize customer engagement, IoT, and digital operations.",
    points: ["IoT & Smart Tech", "Cloud Readiness", "Executive Advisory"],
  },
];

export const JOBS = [
  {
    idx: "01",
    role: "Senior Manager Enterprise Business",
    short: "HUTCH SRI LANKA",
    org: "Hutch Sri Lanka",
    type: "Full-time · Colombo",
    when: "Jan 2024 – Present",
    now: true,
    summary:
      "Spearheading enterprise revenue growth, strategic B2B accounts, and custom connectivity portfolios across corporate sectors.",
    pillars: ["Enterprise Strategy", "Key Accounts", "Revenue Growth"],
  },
  {
    idx: "02",
    role: "Manager Enterprise Business",
    short: "HUTCHISON",
    org: "Hutchison Telecommunications Lanka (Pvt) Ltd",
    type: "Hutch · Full-time",
    when: "Enterprise Division",
    now: false,
    summary:
      "Expanded corporate client acquisition and retention by delivering tailored broadband, mobility, and enterprise communication solutions.",
    pillars: ["B2B Acquisition", "Client Retention", "Corporate Telecom"],
  },
  {
    idx: "03",
    role: "Business Solutions Manager",
    short: "MOBITEL",
    org: "Mobitel (Pvt) Ltd · Colombo",
    type: "Full-time · 6 yrs 9 mos",
    when: "Aug 2007 – Apr 2014",
    now: false,
    summary:
      "Built foundational corporate relationships and managed end-to-end business telecom deployments for Sri Lankan enterprises.",
    pillars: ["Solution Sales", "Corporate Deployments", "Account Management"],
  },
];

export const COMPANY_BLURB =
  "Connectivity, fiber and broadband, and tailored telecom solutions for Sri Lanka's businesses — backed by the global scale of CK Hutchison Holdings.";

export const pageUrl = () => P.url || window.location.href.split("#")[0];
