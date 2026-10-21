import { PrismaClient } from "@prisma/client";
import { PrismaClient as DemoClient } from "./generated/demo/client.js";
import path from "node:path";
import fs from "node:fs";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveDemoDbPath(): string {
  if (process.env.DEMO_DB_PATH) return process.env.DEMO_DB_PATH;
  // Candidatos según dónde corra el process (repo root, apps/web, lambda).
  const candidates = [
    path.resolve(process.cwd(), "packages/db/prisma/demo.db"),
    path.resolve(process.cwd(), "../../packages/db/prisma/demo.db"),
    path.resolve(__dirname, "../prisma/demo.db"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0]!;
}

function createClient(): PrismaClient {
  // Demo estático: sqlite empaquetado dentro del proyecto (deploy Vercel).
  if (process.env.DEMO_SQLITE === "1") {
    return new DemoClient({
      datasources: { db: { url: `file:${resolveDemoDbPath()}` } },
    }) as unknown as PrismaClient;
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
