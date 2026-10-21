"use server";

import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { hashPassword } from "@/lib/password";
import { auth } from "@/auth";

async function requireOwner() {
  const session = await auth();
  if (!session?.user || session.user.role !== "OWNER") redirect("/dashboard");
  return session.user;
}

export async function inviteUser(formData: FormData): Promise<void> {
  const user = await requireOwner();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "OPERATOR") as "OPERATOR" | "VIEWER";
  const password = String(formData.get("password") ?? "");

  if (!email || !password || password.length < 8) {
    redirect("/dashboard/equipo?error=invalid");
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) redirect("/dashboard/equipo?error=exists");

  await prisma.user.create({
    data: {
      tenantId: user.tenantId,
      email,
      name: name || null,
      role: role === "VIEWER" ? "VIEWER" : "OPERATOR",
      passwordHash: hashPassword(password),
    },
  });
  redirect("/dashboard/equipo");
}

export async function changeRole(userId: string, formData: FormData): Promise<void> {
  const user = await requireOwner();
  const role = String(formData.get("role") ?? "") as "OWNER" | "OPERATOR" | "VIEWER";
  if (!["OWNER", "OPERATOR", "VIEWER"].includes(role)) redirect("/dashboard/equipo");
  // No puede cambiar su propio rol.
  if (userId === user.id) redirect("/dashboard/equipo?error=self");

  await prisma.user.updateMany({
    where: { id: userId, tenantId: user.tenantId },
    data: { role },
  });
  redirect("/dashboard/equipo");
}
