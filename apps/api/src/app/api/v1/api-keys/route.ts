import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey, generateApiKey } from "@/lib/apikey";
import { audit } from "@/lib/audit";
import { rateLimit, rateLimitKey } from "@/lib/ratelimit";
import { timingSafeEqual } from "node:crypto";

// POST /api/v1/api-keys — crear key (devuelve el secreto UNA sola vez).
// Bootstrap: mientras no haya OAuth, la primera key por tenant se crea con
// header X-Bootstrap-Secret = BOOTSTRAP_SECRET + tenantId en el body.
// Las siguientes requieren una API key válida.
function secretEquals(a: string | null, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function POST(req: NextRequest) {
  const rl = await rateLimit(rateLimitKey(req, "apikeys"), 10);
  if (!rl.ok) {
    return json({ error: "rate limited" }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });
  }
  const body = (await req.json().catch(() => ({}))) as {
    tenantId?: string;
    name?: string;
  };

  const auth = await authenticateApiKey(req);
  let tenantId = auth?.tenantId;

  if (!tenantId) {
    // Bootstrap: solo si el tenant NO tiene keys aún.
    const bootstrapOk =
      !!process.env.BOOTSTRAP_SECRET &&
      secretEquals(req.headers.get("x-bootstrap-secret"), process.env.BOOTSTRAP_SECRET);
    if (!bootstrapOk || !body.tenantId) {
      return json({ error: "unauthorized" }, { status: 401 });
    }
    const existing = await prisma.apiKey.count({
      where: { tenantId: body.tenantId, revokedAt: null },
    });
    if (existing > 0) {
      return json(
        { error: "tenant already has keys — authenticate with API key" },
        { status: 403 },
      );
    }
    tenantId = body.tenantId;
  }

  const name = body.name?.trim() || "default";
  const { prefix, secret, keyHash, display } = generateApiKey(name);

  const key = await prisma.apiKey.create({
    data: { tenantId, name, prefix, keyHash },
  });

  await audit({ tenantId, apiKeyId: auth?.keyId, action: "api_key.create", entity: "api_key", entityId: key.id, metadata: { name } });
  // El secreto completo solo aparece en esta respuesta.
  return json(
    {
      apiKey: `${prefix}${secret}`,
      key: { id: key.id, name, prefix, display },
    },
    { status: 201 },
  );
}

// GET /api/v1/api-keys — listar metadatos (nunca el secreto).
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const keys = await prisma.apiKey.findMany({
    where: { tenantId: auth.tenantId },
    select: {
      id: true,
      name: true,
      prefix: true,
      lastUsedAt: true,
      revokedAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return json({ keys });
}
