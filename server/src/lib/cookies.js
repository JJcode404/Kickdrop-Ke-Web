import crypto from "node:crypto";
import { env, isProd } from "../config/env.js";
import { REFRESH_TTL_MS_CONST } from "./tokens.js";

export const ACCESS_COOKIE = "kd_access";
export const REFRESH_COOKIE = "kd_refresh";
export const CSRF_COOKIE = "kd_csrf";

const base = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  domain: env.COOKIE_DOMAIN,
  path: "/",
};

export function setAuthCookies(res, { accessToken, refreshToken, refreshExpiresAt }) {
  res.cookie(ACCESS_COOKIE, accessToken, {
    ...base,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...base,
    // Scope the refresh cookie so it is only ever sent to the auth routes.
    path: "/api/auth",
    maxAge: REFRESH_TTL_MS_CONST,
    expires: refreshExpiresAt,
  });
}

export function clearAuthCookies(res) {
  res.clearCookie(ACCESS_COOKIE, { ...base });
  res.clearCookie(REFRESH_COOKIE, { ...base, path: "/api/auth" });
}

/* Double-submit CSRF token: readable by JS (not httpOnly) so the SPA can echo
   it back in a header, which an attacker on another origin cannot read. */
export function issueCsrfCookie(res) {
  const token = crypto.randomBytes(24).toString("base64url");
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    domain: env.COOKIE_DOMAIN,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
}
