import { NextResponse, type NextRequest } from "next/server";
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
    return NextResponse.json(
      { error: "rate limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const tenantId = auth.tenantId;

  let body: {
    provider?: string;
    accessToken?: string;
    webhookSecret?: string;
    baseUrl?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { provider, accessToken, webhookSecret, baseUrl } = body;
  if (!provider || !accessToken) {
    return NextResponse.json(
      { error: "required: provider, accessToken" },
      { status: 400 },
    );
  }
  if (!isProviderId(provider)) {
    return NextResponse.json({ error: `unknown provider: ${provider}` }, { status: 400 });
  }

  const encryptedKeys = encryptJson({ accessToken, webhookSecret, baseUrl });

  const credential = await prisma.pspCredential.upsert({
    where: { tenantId_provider: { tenantId, provider } },
    update: { encryptedKeys },
    create: { tenantId, provider, encryptedKeys },
  });

  await audit({ tenantId, apiKeyId: auth.keyId, action: "credential.upsert", entity: "psp_credential", entityId: credential.id, metadata: { provider } });
  // Nunca devolver material sensible — solo metadatos.
  return NextResponse.json(
    { credential: { id: credential.id, tenantId, provider } },
    { status: 201 },
  );
}
