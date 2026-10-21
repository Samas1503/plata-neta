import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { isProviderId } from "@plata-neta/providers";
import { encryptJson } from "@/lib/crypto";

// POST /api/v1/credentials — upsert de PspCredential del comercio (cifrada en reposo).
// Dev tool de Fase 0/1 — antes de producción: auth de tenant + rate limiting.

export async function POST(req: NextRequest) {
  let body: {
    tenantId?: string;
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

  const { tenantId, provider, accessToken, webhookSecret, baseUrl } = body;
  if (!tenantId || !provider || !accessToken) {
    return NextResponse.json(
      { error: "required: tenantId, provider, accessToken" },
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

  // Nunca devolver material sensible — solo metadatos.
  return NextResponse.json(
    { credential: { id: credential.id, tenantId, provider } },
    { status: 201 },
  );
}
