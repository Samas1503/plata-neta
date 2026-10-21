import type { NextRequest } from "next/server";

const MAX_BODY = 64 * 1024; // 64KB — ningún endpoint necesita más
const MAX_META_KEYS = 20;
const MAX_META_VALUE = 500;

// Lee JSON con límite de tamaño. null si body inválido/excede.
export async function readJsonBody<T>(req: NextRequest): Promise<T | null> {
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) return null;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// Valida metadata de intent: objeto plano, pocas keys, valores cortos.
export function sanitizeMetadata(
  meta: unknown,
): Record<string, string> | null {
  if (meta == null) return {};
  if (typeof meta !== "object" || Array.isArray(meta)) return null;
  const out: Record<string, string> = {};
  const entries = Object.entries(meta as Record<string, unknown>);
  if (entries.length > MAX_META_KEYS) return null;
  for (const [k, v] of entries) {
    if (k.length > 50) return null;
    if (v == null) continue;
    if (typeof v === "object") return null; // sin anidados
    const s = String(v).slice(0, MAX_META_VALUE);
    out[k] = s;
  }
  return out;
}
