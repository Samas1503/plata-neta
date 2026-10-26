"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { signIn } from "@/auth";
import { hashPassword } from "@/lib/password";

export async function register(formData: FormData): Promise<void> {
  const tenantName = String(formData.get("tenantName") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!tenantName || !email || !password) {
    redirect("/register?error=missing");
  }
  if (password.length < 8) {
    redirect("/register?error=short_password");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/register?error=email_taken");
  }

  const slugBase = tenantName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await prisma.tenant.create({
    data: {
      name: tenantName,
      slug: `${slugBase}-${Date.now().toString(36)}`,
      users: {
        create: {
          email,
          name: name || null,
          role: "OWNER",
          passwordHash: hashPassword(password),
        },
      },
    },
  });

  redirect("/login?registered=1");
}

// AUTH-7: throttle simple por email — 5 intentos/min (in-memory, best-effort).
const attempts = new Map<string, number[]>();
function throttled(key: string): boolean {
  const now = Date.now();
  const list = (attempts.get(key) ?? []).filter((t) => now - t < 60_000);
  if (list.length >= 5) return true;
  list.push(now);
  attempts.set(key, list);
  return false;
}

export async function login(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email && throttled(email)) redirect("/login?error=rate-limited");
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=credentials");
    }
    throw error;
  }
}
