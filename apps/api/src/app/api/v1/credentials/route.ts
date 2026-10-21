import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { isProviderId } from "@plata-neta/providers";
import { authenticateApiKey } from "@/lib/apikey";
import { encryptJson } from "@plata-neta/db";
import { audit } from "@/lib/audit";
import { rateLimit, rateLimitKey } from "@/lib/ratelimit";

// POST /api/v1/credentials — upsert de PspCredential del comercio (cifrada en reposo).
// tenantId deriva de la API key — nunca del body (aislamiento multi-tenant).

export async function POST(req: NextRequest) {
  const rl = await rateLimit(rateLimitKey(req, "creds"), 10);
  if (!rl.ok) {
    return json(
      { error: "rate limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });
  const tenantId = auth.tenantId;

  let body: {
    provider?: string;
    accessToken?: string;
    webhookSecret?: string;
    baseUrl?: string;
    [key: string]: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, { status: 400 });
  }

  const { provider, accessToken, webhookSecret, baseUrl, ...extra } = body;
  if (!provider || !accessToken) {
    return json(
      { error: "required: provider, accessToken" },
      { status: 400 },
    );
  }
  if (!isProviderId(provider)) {
    return json({ error: `unknown provider: ${provider}` }, { status: 400 });
  }

  const encryptedKeys = encryptJson({ accessToken, ...extra, webhookSecret, baseUrl });

  const credential = await prisma.pspCredential.upsert({
    where: { tenantId_provider: { tenantId, provider } },
    update: { encryptedKeys },
    create: { tenantId, provider, encryptedKeys },
  });

  await audit({ tenantId, apiKeyId: auth.keyId, action: "credential.upsert", entity: "psp_credential", entityId: credential.id, metadata: { provider } });
  // Nunca devolver material sensible — solo metadatos.
  return json(
    { credential: { id: credential.id, tenantId, provider } },
    { status: 201 },
  );
}
