import { connection } from "@plata-neta/jobs";
import type { NextRequest } from "next/server";

// Sliding window via INCR + EXPIRE: limit req/min por clave.
export async function rateLimit(
  key: string,
  limit: number,
  windowSec = 60,
): Promise<{ ok: boolean; retryAfter: number }> {
  const k = `rl:${key}`;
  const count = await connection.incr(k);
  if (count === 1) await connection.expire(k, windowSec);
  if (count <= limit) return { ok: true, retryAfter: 0 };
  const ttl = await connection.ttl(k);
  return { ok: false, retryAfter: Math.max(ttl, 1) };
}

export function rateLimitKey(req: NextRequest, suffix: string): string {
  const auth = req.headers.get("authorization") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anon";
  const id = auth ? auth.slice(-16) : ip;
  return `${suffix}:${id}`;
}
