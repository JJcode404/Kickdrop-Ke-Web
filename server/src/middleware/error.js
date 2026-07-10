import { ZodError } from "zod";
import { HttpError } from "../lib/httpError.js";
import { isProd } from "../config/env.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Not found" });
}

// eslint-disable-next-line no-unused-vars -- Express needs the 4-arg signature.
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.flatten().fieldErrors,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, code: err.code });
  }

  // Prisma unique-constraint violation.
  if (err?.code === "P2002") {
    return res.status(409).json({ error: "Resource already exists" });
  }

  // Unknown error: log the detail server-side, but never leak internals.
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    ...(isProd ? {} : { detail: String(err?.message ?? err) }),
  });
}
