"use server";

import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { auth } from "@/auth";

async function requireOwner() {
  const session = await auth();
  if (!session?.user || session.user.role !== "OWNER") {
    redirect("/dashboard");
  }
  return session.user.tenantId;
}

export async function createApiKey(formData: FormData): Promise<void> {
  const tenantId = await requireOwner();
  const name = String(formData.get("name") ?? "").trim() || "default";

  const res = await fetch(`${process.env.API_INTERNAL_URL ?? "http://localhost:3001"}/api/v1/api-keys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bootstrap-secret": process.env.BOOTSTRAP_SECRET ?? "",
    },
    body: JSON.stringify({ tenantId, name }),
  });
  if (!res.ok) redirect("/dashboard/keys?error=create");
  const { apiKey } = (await res.json()) as { apiKey: string };
  redirect(`/dashboard/keys?created=${encodeURIComponent(apiKey)}`);
}

export async function revokeApiKey(id: string): Promise<void> {
  const tenantId = await requireOwner();
  await prisma.apiKey.updateMany({
    where: { id, tenantId },
    data: { revokedAt: new Date() },
  });
  redirect("/dashboard/keys");
}
