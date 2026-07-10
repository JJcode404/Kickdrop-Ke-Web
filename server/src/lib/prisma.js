import { PrismaClient } from "@prisma/client";
import { isProd } from "../config/env.js";

export const prisma = new PrismaClient({
  log: isProd ? ["warn", "error"] : ["query", "warn", "error"],
});

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
