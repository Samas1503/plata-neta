import { createHash, randomBytes } from "node:crypto";
import type { NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";

export interface ApiAuth {
  tenantId: string;
  keyId: string;
}

export function generateApiKey(name: string): {
  prefix: string;
  secret: string;
  keyHash: string;
  display: string;
} {
  const env = process.env.APP_ENV === "production" ? "live" : "test";
  const prefix = `sk_${env}_`;
  const secret = randomBytes(24).toString("base64url");
  return {
    prefix,
    secret,
    keyHash: hashKey(prefix + secret),
    display: `${prefix}${secret.slice(0, 6)}…`,
  };
}

export function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

// Autentica Authorization: Bearer <sk_...> → tenant del dueño de la key.
export async function authenticateApiKey(
  req: NextRequest,
): Promise<ApiAuth | null> {
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token || !token.startsWith("sk_")) return null;

  const key = await prisma.apiKey.findFirst({
    where: { keyHash: hashKey(token), revokedAt: null },
  });
  if (!key) return null;

  await prisma.apiKey.update({
    where: { id: key.id },
    data: { lastUsedAt: new Date() },
  });
  return { tenantId: key.tenantId, keyId: key.id };
}
