const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const mk = (children) => (props) => <svg {...base} {...props}>{children}</svg>;

export const PhoneI = mk(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />);
export const MailI = mk(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const WhatsI = mk(<><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" /></>);
export const SmsI = mk(<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />);
export const UserPlusI = mk(<><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" /></>);
export const ShareI = mk(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>);
export const ChevI = mk(<path d="m9 6 6 6-6 6" />);
export const ArrowRightI = mk(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const ArrowUpRightI = mk(<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>);
export const PinI = mk(<><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>);
export const InI = mk(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 8v.01M12 17v-6m0 3a3 3 0 0 1 6 0v3" /></>);
export const GlobeI = mk(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>);
export const QrI = mk(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4" /></>);
export const CloseI = mk(<path d="M6 6l12 12M18 6 6 18" />);
export const CopyI = mk(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>);
export const NfcI = mk(<><path d="M6 8.5a6.5 6.5 0 0 1 0 7M10 6a10 10 0 0 1 0 12M14 3.5a13.5 13.5 0 0 1 0 17" /></>);
export const CheckI = mk(<path d="m5 12 5 5 9-10" />);
export const BriefcaseI = mk(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 12h20" /></>);
export const BuildingI = mk(<><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V9h4a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2" /></>);
export const SparkleI = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M12 2l2.3 7.2L22 12l-7.7 2.8L12 22l-2.3-7.2L2 12l7.7-2.8L12 2z" />
  </svg>
);
