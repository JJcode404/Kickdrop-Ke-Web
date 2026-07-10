import { PHONE_TEL } from "../config.js";

/* Floating "call us" bubble, stacked just above the WhatsApp chat launcher.
   Tapping it opens the phone dialer via a tel: link. */
export default function CallButton() {
  return (
    <a
      className="call-fab"
      href={`tel:${PHONE_TEL}`}
      aria-label="Call KICKDROP"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 5a1 1 0 0 1 1-1h2.6a1 1 0 0 1 1 .76l.9 3.6a1 1 0 0 1-.29.95l-1.6 1.6a13 13 0 0 0 5.9 5.9l1.6-1.6a1 1 0 0 1 .95-.29l3.6.9a1 1 0 0 1 .76 1V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5z" />
      </svg>
    </a>
  );
}
