import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "./prisma.js";

const REFRESH_TTL_MS = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000;

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.ACCESS_TOKEN_TTL, algorithm: "HS256" }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: ["HS256"] });
}

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

/* Issues an opaque random refresh token, persists only its hash, and returns
   the raw token (sent to the client as an httpOnly cookie). */
export async function issueRefreshToken(userId) {
  const raw = crypto.randomBytes(48).toString("base64url");
  const expiresAt = new Date(Date.now() + REFRESH_TTL_MS);
  await prisma.refreshToken.create({
    data: { tokenHash: sha256(raw), userId, expiresAt },
  });
  return { raw, expiresAt };
}

/* Validates a raw refresh token against the store. Returns the owning userId,
   or null if unknown / expired / revoked. */
export async function consumeRefreshToken(raw) {
  if (!raw) return null;
  const record = await prisma.refreshToken.findUnique({
    where: { tokenHash: sha256(raw) },
  });
  if (!record) return null;
  if (record.revokedAt || record.expiresAt < new Date()) return null;
  return record;
}

export async function revokeRefreshToken(raw) {
  if (!raw) return;
  await prisma.refreshToken
    .updateMany({
      where: { tokenHash: sha256(raw), revokedAt: null },
      data: { revokedAt: new Date() },
    })
    .catch(() => {});
}

/* Rotation: revoke the presented token and mint a fresh one atomically. */
export async function rotateRefreshToken(oldRaw, userId) {
  await revokeRefreshToken(oldRaw);
  return issueRefreshToken(userId);
}

export const REFRESH_TTL_MS_CONST = REFRESH_TTL_MS;
