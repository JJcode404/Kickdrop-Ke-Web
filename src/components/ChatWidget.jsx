import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "../config.js";

const QUICK_REPLIES = [
  "Is my size in stock?",
  "How fast is delivery?",
  "Help me pick a pair",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const waHref = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text || "Hi KICKDROP, I have a question."
    )}`;

  const send = (text) => {
    window.open(waHref(text), "_blank", "noopener");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="chat">
      {open && (
        <div
          className="chat__panel"
          ref={panelRef}
          role="dialog"
          aria-label="Chat with KICKDROP"
        >
          <div className="chat__head">
            <span className="chat__status-dot" aria-hidden="true" />
            <div>
              <p className="chat__title">KICKDROP Support</p>
              <p className="chat__subtitle">Typically replies within minutes</p>
            </div>
            <button
              type="button"
              className="chat__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="chat__body">
            <p className="chat__bubble">
              Hi 👋 Looking for a pair? Ask us anything — sizing, stock,
              delivery, or authenticity.
            </p>
            <div className="chat__quick" role="group" aria-label="Quick questions">
              {QUICK_REPLIES.map((q) => (
                <button
                  type="button"
                  key={q}
                  className="chat__chip"
                  onClick={() => send(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(message);
            }}
          >
            <label htmlFor="chat-message" className="visually-hidden">
              Type your message
            </label>
            <input
              id="chat-message"
              type="text"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="chat__send" aria-label="Send on WhatsApp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>

          <p className="chat__note">Continues in WhatsApp — no account needed.</p>
        </div>
      )}

      <button
        type="button"
        className="chat__launcher"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with us on WhatsApp"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        )}
        <span className="chat__online-dot" aria-hidden="true" />
      </button>
    </div>
  );
}
