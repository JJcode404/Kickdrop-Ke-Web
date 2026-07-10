import { verifyAccessToken } from "../lib/tokens.js";
import { ACCESS_COOKIE } from "../lib/cookies.js";
import { unauthorized, forbidden } from "../lib/httpError.js";

/* Reads the access token from the httpOnly cookie (falling back to a Bearer
   header for non-browser clients) and attaches req.user. */
export function requireAuth(req, _res, next) {
  const bearer = req.get("authorization");
  const token =
    req.cookies?.[ACCESS_COOKIE] ||
    (bearer?.startsWith("Bearer ") ? bearer.slice(7) : null);

  if (!token) return next(unauthorized("Authentication required"));

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch {
    next(unauthorized("Invalid or expired session", "TOKEN_INVALID"));
  }
}

/* Populates req.user when a valid access token is present, but never rejects.
   For endpoints open to guests that should still attribute to a user if one
   is signed in (e.g. placing an order). */
export function optionalAuth(req, _res, next) {
  const bearer = req.get("authorization");
  const token =
    req.cookies?.[ACCESS_COOKIE] ||
    (bearer?.startsWith("Bearer ") ? bearer.slice(7) : null);
  if (token) {
    try {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.sub, role: payload.role, email: payload.email };
    } catch {
      /* ignore invalid/expired token — treat as guest */
    }
  }
  next();
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) return next(forbidden("Insufficient permissions"));
    next();
  };
}
