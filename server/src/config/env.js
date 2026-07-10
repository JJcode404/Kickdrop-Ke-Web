import "dotenv/config";
import { z } from "zod";

/* Fail fast at boot if the environment is misconfigured — never start the
   server with a missing secret or a placeholder value. */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url(),
  CLIENT_ORIGINS: z
    .string()
    .min(1)
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 chars"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 chars"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(7),
  COOKIE_DOMAIN: z.string().optional().transform((v) => (v ? v : undefined)),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";

if (isProd && env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) {
  console.error("❌ JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must differ in production.");
  process.exit(1);
}
