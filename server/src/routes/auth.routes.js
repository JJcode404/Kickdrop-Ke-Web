import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import {
  signAccessToken,
  issueRefreshToken,
  consumeRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
} from "../lib/tokens.js";
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE } from "../lib/cookies.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { asyncHandler, unauthorized, conflict } from "../lib/httpError.js";

const router = Router();

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

async function startSession(res, user) {
  const accessToken = signAccessToken(user);
  const { raw, expiresAt } = await issueRefreshToken(user.id);
  setAuthCookies(res, {
    accessToken,
    refreshToken: raw,
    refreshExpiresAt: expiresAt,
  });
}

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw conflict("An account with that email already exists");

    const user = await prisma.user.create({
      data: { name, email, passwordHash: await hashPassword(password) },
    });

    await startSession(res, user);
    res.status(201).json({ user: publicUser(user) });
  })
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    /* Always run a hash comparison, even when the user doesn't exist, so
       response timing doesn't reveal which emails are registered. */
    const ok = user
      ? await verifyPassword(password, user.passwordHash)
      : await verifyPassword(password, "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinva");

    if (!user || !ok) throw unauthorized("Invalid email or password");

    await startSession(res, user);
    res.json({ user: publicUser(user) });
  })
);

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const raw = req.cookies?.[REFRESH_COOKIE];
    const record = await consumeRefreshToken(raw);
    if (!record) {
      clearAuthCookies(res);
      throw unauthorized("Session expired, please sign in again");
    }

    const user = await prisma.user.findUnique({ where: { id: record.userId } });
    if (!user) {
      clearAuthCookies(res);
      throw unauthorized("Session expired, please sign in again");
    }

    const { raw: newRaw, expiresAt } = await rotateRefreshToken(raw, user.id);
    setAuthCookies(res, {
      accessToken: signAccessToken(user),
      refreshToken: newRaw,
      refreshExpiresAt: expiresAt,
    });
    res.json({ user: publicUser(user) });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    await revokeRefreshToken(req.cookies?.[REFRESH_COOKIE]);
    clearAuthCookies(res);
    res.status(204).end();
  })
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) throw unauthorized();
    res.json({ user: publicUser(user) });
  })
);

export default router;
