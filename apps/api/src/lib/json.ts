import { NextResponse } from "next/server";

// NextResponse.json no serializa BigInt — los modelos Prisma usan
// amountCents/BigInt. Serializamos con replacer que pasa BigInt a string.
export function json(data: unknown, init?: ResponseInit): NextResponse {
  const body = JSON.stringify(data, (_k, v) => (typeof v === "bigint" ? v.toString() : v));
  return new NextResponse(body, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  }) as NextResponse;
}
