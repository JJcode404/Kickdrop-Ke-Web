import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { csrfProtection } from "./middleware/csrf.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import { issueCsrfCookie } from "./lib/cookies.js";
import { asyncHandler } from "./lib/httpError.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

export function createApp() {
  const app = express();

  // Behind a reverse proxy (nginx, Render, Fly) so req.ip / secure cookies work.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  // Security headers. This is a JSON API, so lock the CSP to deny any resource
  // loading and disable cross-origin embedding.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] },
      },
      crossOriginResourcePolicy: { policy: "same-site" },
    }),
  );

  // Strict CORS allow-list; credentials enabled for cookie auth.
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / non-browser tools (no Origin header).
        if (!origin || env.CLIENT_ORIGINS.includes(origin))
          return cb(null, true);
        // Disallowed origin: respond without CORS headers so the browser blocks
        // the read, rather than throwing a 500.
        cb(null, false);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "X-CSRF-Token", "Authorization"],
      maxAge: 600,
    }),
  );

  // Small body cap to blunt payload-based DoS.
  app.use(express.json({ limit: "16kb" }));
  app.use(cookieParser());
  // app.use(apiLimiter);

  app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

  // Hands the SPA a CSRF token to echo back on mutating requests.
  app.get(
    "/api/csrf",
    asyncHandler(async (_req, res) => {
      res.json({ csrfToken: issueCsrfCookie(res) });
    }),
  );

  // CSRF guard applies to every state-changing request below.
  app.use(csrfProtection);

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/wishlist", wishlistRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
