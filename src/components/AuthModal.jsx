import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/StoreContext.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SocialButton({ label, children, onClick }) {
  return (
    <button type="button" className="auth__social" onClick={onClick}>
      <span className="auth__social-icon" aria-hidden="true">{children}</span>
      {label}
    </button>
  );
}

function PasswordField({ id, label, value, onChange, autoComplete, minLength = 6 }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="auth__field">
      <label htmlFor={id}>{label}</label>
      <div className="auth__password">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          minLength={minLength}
        />
        <button
          type="button"
          className="auth__eye"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
            <circle cx="12" cy="12" r="2.75" />
            {!visible && <path d="M4 20L20 4" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AuthModal() {
  const { authOpen, setAuthOpen, user, signIn, register, signOut } = useStore();
  const [tab, setTab] = useState("signin"); // "signin" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!authOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setAuthOpen(false);
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("input, button")?.focus();
    setStatus("");
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [authOpen, setAuthOpen]);

  if (!authOpen) return null;

  const submitSignIn = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setStatus("Please enter a valid email address.");
    if (!password) return setStatus("Please enter your password.");
    setStatus("");
    setBusy(true);
    try {
      await signIn({ email, password });
    } catch (err) {
      setStatus(err?.message || "Couldn't sign in — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setStatus("Please enter your name.");
    if (!EMAIL_RE.test(email)) return setStatus("Please enter a valid email address.");
    if (password.length < 8)
      return setStatus("Password must be at least 8 characters, with a letter and a number.");
    setStatus("");
    setBusy(true);
    try {
      await register({ name: name.trim(), email, password });
    } catch (err) {
      setStatus(err?.message || "Couldn't create your account — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const notAvailable = (what) =>
    setStatus(`${what} isn't wired up in this demo yet — use email & password.`);

  return (
    <>
      <button
        type="button"
        className="shop__backdrop auth__backdrop"
        aria-label="Close sign in"
        onClick={() => setAuthOpen(false)}
      />
      <div
        className="auth"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        ref={panelRef}
      >
        <div className="auth__head">
          <h2 id="auth-title" className="auth__title">
            {user ? `Welcome back` : "Come on in"}
          </h2>
          <button
            type="button"
            className="filter-panel__close"
            onClick={() => setAuthOpen(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {user ? (
          <div className="auth__account">
            <p className="auth__account-name">{user.name}</p>
            <p className="auth__account-email">{user.email}</p>
            <button type="button" className="btn btn--primary auth__submit" onClick={() => setAuthOpen(false)}>
              Continue Shopping
            </button>
            <button type="button" className="btn btn--ghost auth__submit" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <div className="auth__tabs" role="tablist" aria-label="Sign in or register">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signin"}
                className="auth__tab"
                onClick={() => { setTab("signin"); setStatus(""); }}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "register"}
                className="auth__tab"
                onClick={() => { setTab("register"); setStatus(""); }}
              >
                I&rsquo;m New Here
              </button>
            </div>

            {tab === "signin" ? (
              <form className="auth__form" onSubmit={submitSignIn} noValidate>
                <div className="auth__field">
                  <label htmlFor="auth-email">Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <PasswordField
                  id="auth-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth__forgot"
                  onClick={() =>
                    setStatus(
                      EMAIL_RE.test(email)
                        ? `If an account exists for ${email}, a reset link is on its way.`
                        : "Enter your email above and we'll send a reset link."
                    )
                  }
                >
                  Forgot your password?
                </button>
                <button type="submit" className="btn btn--primary auth__submit" disabled={busy}>
                  {busy ? "Signing in…" : "Sign In"}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost auth__submit"
                  onClick={() => notAvailable("One-time codes")}
                >
                  Continue With One-Time Code
                </button>
              </form>
            ) : (
              <form className="auth__form" onSubmit={submitRegister} noValidate>
                <div className="auth__field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="auth__field">
                  <label htmlFor="auth-email-r">Email address</label>
                  <input
                    id="auth-email-r"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <PasswordField
                  id="auth-password-r"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                />
                <button type="submit" className="btn btn--primary auth__submit" disabled={busy}>
                  {busy ? "Creating…" : "Create Account"}
                </button>
                <p className="auth__terms">
                  By registering you agree to our Terms &amp; Conditions and
                  Privacy Policy.
                </p>
              </form>
            )}

            <p className="auth__status" role="status">{status}</p>

            <p className="auth__divider" aria-hidden="true"><span>or</span></p>

            <div className="auth__socials">
              <SocialButton label="Continue With Google" onClick={() => notAvailable("Google sign-in")}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.17 3.57-8.81z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.93-2.92l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l4-3.1z" />
                  <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.62l4 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
                </svg>
              </SocialButton>
              <SocialButton label="Continue With Apple" onClick={() => notAvailable("Apple sign-in")}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.86-1.6.02-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.05 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.78 1.3-.02 2.2-1.2 3-2.4a10 10 0 0 0 1.4-2.8c-.03-.01-2.6-1-2.8-3.9zM14.4 5.6c.7-.8 1.1-1.9 1-3-1 .04-2.1.66-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.5z" />
                </svg>
              </SocialButton>
              <SocialButton label="Continue With Facebook" onClick={() => notAvailable("Facebook sign-in")}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path fill="#fff" d="M16.7 15.5l.5-3.5h-3.3V9.7c0-1 .5-1.9 2-1.9h1.5V4.8s-1.4-.24-2.7-.24c-2.7 0-4.5 1.65-4.5 4.6V12H7.1v3.5h3.1V24a12 12 0 0 0 3.7 0v-8.5h2.8z" />
                </svg>
              </SocialButton>
            </div>

            {tab === "signin" && (
              <p className="auth__foot">
                New to KICKDROP?{" "}
                <button type="button" className="auth__foot-link" onClick={() => { setTab("register"); setStatus(""); }}>
                  Register.
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
