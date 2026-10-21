// Seed de datos demo — ejecutar con `pnpm db:seed` (idempotente).
// Usuarios de prueba documentados en README.MD — NUNCA usar en producción.

import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

const DEMO_PASSWORD = "demo1234";

async function main() {
  const plans = [
    { name: "starter", gmvThreshold: 0n, monthlyPrice: 0n },
    { name: "growth", gmvThreshold: 50_000_000n, monthlyPrice: 1_500_000n }, // >$500k GMV → $15k
    { name: "scale", gmvThreshold: 500_000_000n, monthlyPrice: 7_500_000n }, // >$5M → $75k
    { name: "enterprise", gmvThreshold: 5_000_000_000n, monthlyPrice: 30_000_000n }, // >$50M → $300k
  ];
  const plan = plans[0];
  for (const p of plans) {
    await prisma.plan.upsert({ where: { name: p.name }, update: p, create: p });
  }

  const tenant = await prisma.tenant.upsert({
    where: { slug: "comercio-demo" },
    update: {},
    create: {
      name: "Comercio Demo",
      slug: "comercio-demo",
      status: "ACTIVE",
      kycStatus: "VERIFIED",
      planId: plan.id,
    },
  });

  const users = [
    { email: "owner@demo.plata", name: "Dueña Demo", role: "OWNER" },
    { email: "operator@demo.plata", name: "Operador Demo", role: "OPERATOR" },
    { email: "viewer@demo.plata", name: "Visor Demo", role: "VIEWER" },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        tenantId: tenant.id,
        email: u.email,
        name: u.name,
        role: u.role,
        passwordHash: hashPassword(DEMO_PASSWORD),
      },
    });
  }

  console.log("Seed OK — tenant:", tenant.slug);
  for (const u of users) console.log(`  ${u.email} / ${DEMO_PASSWORD} (${u.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
