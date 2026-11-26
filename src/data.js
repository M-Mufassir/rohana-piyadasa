// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change anything on the card / page.
// ─────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;

export const P = {
  name: "P.A. Rohana Piyadasa",
  first: "P.A. Rohana",
  last: "Piyadasa",
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
  photo: `${base}photo.png`, // transparent cut-out in /public
  logo: `${base}hutch-logo.png`, // HUTCH ENTERPRISE logo (transparent PNG)
  poweredBy: `${base}hutch-powered-by.png`, // "Powered by" lock-up used in footer
  linkedin: "", // e.g. "https://www.linkedin.com/in/…"  (row appears automatically)
  website: "", // e.g. "https://www.hutch.lk"            (row appears automatically)
  url: "", // leave empty to use the live page URL for QR / share / vCard
};

export const ABOUT =
  "With over a decade of experience in the telecommunications industry, I drive enterprise growth through innovative business strategies and strong client relationships — delivering tailored telecom solutions that meet diverse business needs, with customer satisfaction and long-term partnerships at the core.";

export const STATS = [
  { value: 10, suffix: "+", label: "Years in telecom" },
  { value: 2, suffix: "", label: "Telecom operators" },
  { value: 100, suffix: "%", label: "Enterprise focus" },
];

export const FOCUS = [
  "Enterprise Solutions",
  "Fiber & Broadband",
  "Corporate Connectivity",
  "Business Development",
  "Client Relationships",
  "Digital Transformation",
];

export const JOBS = [
  {
    role: "Senior Manager Enterprise Business",
    short: "HUTCH SRI LANKA",
    org: "Hutch Sri Lanka · Full-time",
    when: "Jan 2024 – Present",
    now: true,
  },
  {
    role: "Manager Enterprise Business",
    short: "HUTCHISON",
    org: "Hutchison Telecommunications Lanka (Pvt) Ltd",
    when: "Hutch · Full-time",
  },
  {
    role: "Business Solutions Manager",
    short: "MOBITEL",
    org: "Mobitel (Pvt) Ltd · Colombo",
    when: "Aug 2007 – Apr 2014",
  },
];

export const COMPANY_BLURB =
  "Connectivity, fiber and broadband, and tailored telecom solutions for Sri Lanka's businesses — backed by the global scale of CK Hutchison Holdings.";

export const pageUrl = () => P.url || window.location.href.split("#")[0];
