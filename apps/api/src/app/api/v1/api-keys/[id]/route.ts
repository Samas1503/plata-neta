import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey } from "@/lib/apikey";
import { audit } from "@/lib/audit";

// DELETE /api/v1/api-keys/:id — revocar (no borra, marca revokedAt).
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const key = await prisma.apiKey.findFirst({
    where: { id, tenantId: auth.tenantId },
  });
  if (!key) return json({ error: "not found" }, { status: 404 });

  await prisma.apiKey.update({
    where: { id },
    data: { revokedAt: new Date() },
  });
  await audit({ tenantId: auth.tenantId, apiKeyId: auth.keyId, action: "api_key.revoke", entity: "api_key", entityId: id });
  return json({ revoked: true });
}
