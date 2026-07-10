import crypto from "node:crypto";
import { CSRF_COOKIE } from "../lib/cookies.js";
import { forbidden } from "../lib/httpError.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function timingSafeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/* Double-submit-cookie CSRF guard. State-changing requests must send the CSRF
   token both as the kd_csrf cookie and in the X-CSRF-Token header; a
   cross-origin attacker can send the cookie but cannot read it to set the
   header. Safe (read-only) methods are exempt. */
export function csrfProtection(req, res, next) {
  if (SAFE_METHODS.has(req.method)) return next();

  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.get("x-csrf-token");

  if (!cookieToken || !headerToken || !timingSafeEqual(cookieToken, headerToken)) {
    return next(forbidden("Invalid or missing CSRF token", "CSRF_FAILED"));
  }
  next();
}
