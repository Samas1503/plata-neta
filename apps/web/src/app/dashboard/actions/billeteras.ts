"use server";

import { redirect } from "next/navigation";
import { prisma, encryptJson } from "@plata-neta/db";
import { isProviderId } from "@plata-neta/providers";
import { auth } from "@/auth";

async function requireRole(roles: string[]) {
  const session = await auth();
  if (!session?.user || !roles.includes(session.user.role)) {
    redirect("/dashboard");
  }
  return session.user;
}

// Alta self-service de billetera del comercio: provider + CVU/CBU/alias.
// Todo el blob viaja cifrado (AES-256-GCM) en PspCredential.encryptedKeys.
export async function saveBilletera(formData: FormData): Promise<void> {
  const user = await requireRole(["OWNER", "OPERATOR"]);
  const provider = String(formData.get("provider") ?? "");
  const cvu = String(formData.get("cvu") ?? "").trim();
  const cbu = String(formData.get("cbu") ?? "").trim();
  const alias = String(formData.get("alias") ?? "").trim();
  const accessToken = String(formData.get("accessToken") ?? "").trim();

  if (!isProviderId(provider) || (!cvu && !cbu && !alias)) {
    redirect("/dashboard/billeteras?error=invalid");
  }

  const plain = {
    accessToken: accessToken || `self-${provider}`,
    ...(cvu ? { cvu } : {}),
    ...(cbu ? { cbu } : {}),
    ...(alias ? { alias } : {}),
  };

  const cred = await prisma.pspCredential.upsert({
    where: { tenantId_provider: { tenantId: user.tenantId, provider } },
    update: { encryptedKeys: encryptJson(plain) },
    create: {
      tenantId: user.tenantId,
      provider,
      encryptedKeys: encryptJson(plain),
    },
  });
  await prisma.auditLog.create({
    data: {
      tenantId: user.tenantId,
      userId: user.id!,
      action: "credential.upsert",
      entity: "psp_credential",
      entityId: cred.id,
    },
  });
  redirect("/dashboard/billeteras");
}

export async function deleteBilletera(credentialId: string): Promise<void> {
  const user = await requireRole(["OWNER", "OPERATOR"]);
  const cred = await prisma.pspCredential.findUnique({ where: { id: credentialId } });
  if (!cred || cred.tenantId !== user.tenantId) redirect("/dashboard/billeteras");
  await prisma.pspCredential.delete({ where: { id: credentialId } });
  await prisma.auditLog.create({
    data: {
      tenantId: user.tenantId,
      userId: user.id!,
      action: "credential.delete",
      entity: "psp_credential",
      entityId: credentialId,
    },
  });
  redirect("/dashboard/billeteras");
}
