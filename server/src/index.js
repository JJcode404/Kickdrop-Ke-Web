import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { disconnectPrisma, prisma } from "./lib/prisma.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`🟢 Kickdrop API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

async function shutdown(signal) {
  console.log(`\n${signal} received, shutting down…`);
  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
  // Force-exit if connections don't drain in time.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Verify DB connectivity at boot; fail loudly if the database is unreachable.
prisma
  .$queryRaw`SELECT 1`
  .then(() => console.log("🟢 Database connection OK"))
  .catch((err) => {
    console.error("❌ Cannot reach database:", err.message);
    process.exit(1);
  });
