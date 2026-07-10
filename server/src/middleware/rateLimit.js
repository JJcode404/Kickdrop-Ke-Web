import rateLimit from "express-rate-limit";

const json = (req, res) =>
  res.status(429).json({ error: "Too many requests, please try again later." });

/* Broad limiter for the whole API. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json,
});

/* Strict limiter for credential endpoints to blunt brute-force / credential
   stuffing. Keyed by IP + submitted email so one attacker can't lock out a
   whole shared-NAT network, and vice-versa. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) =>
    `${req.ip}:${(req.body?.email ?? "").toLowerCase()}`,
  handler: json,
});
