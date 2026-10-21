import { PrismaClient } from "@prisma/client";
import { PrismaClient as DemoClient } from "./generated/demo/client.js";
import path from "node:path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  // Demo estático: sqlite empaquetado dentro del proyecto (deploy Vercel).
  if (process.env.DEMO_SQLITE === "1") {
    const dbPath =
      process.env.DEMO_DB_PATH ??
      path.resolve(process.cwd(), "packages/db/prisma/demo.db");
    return new DemoClient({
      datasources: { db: { url: `file:${dbPath}` } },
    }) as unknown as PrismaClient;
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
