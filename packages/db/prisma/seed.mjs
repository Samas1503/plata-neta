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

  // ===== Datos demo (idempotente por idempotencyKey) =====
  // Credenciales PSP de los 5 providers (blob simbólico — no es secret real).
  for (const p of ["mercadopago", "uala", "modo", "brubank", "personalpay", "cuentadni"]) {
    await prisma.pspCredential.upsert({
      where: { tenantId_provider: { tenantId: tenant.id, provider: p } },
      update: {},
      create: { tenantId: tenant.id, provider: p, encryptedKeys: `demo-enc:${p}` },
    });
  }

  const day = 24 * 3600 * 1000;
  const now = Date.now();
  const le = (account, debit, credit, refType, refId, createdAt) => ({
    tenantId: tenant.id, account, debitCents: BigInt(debit), creditCents: BigInt(credit), refType, refId, createdAt,
  });
  const col = {
    pending: (amt, id, d) => [le("pending", amt, 0, "payment_intent", id, d), le("clearing", 0, amt, "payment_intent", id, d)],
    succeeded: (amt, id, d) => [le("available", amt, 0, "payment_intent", id, d), le("pending", 0, amt, "payment_intent", id, d)],
    released: (amt, id, d) => [le("clearing", amt, 0, "payment_intent", id, d), le("pending", 0, amt, "payment_intent", id, d)],
  };

  const intents = [
    // [provider, status, amountCents, daysAgo, desc]
    ["mercadopago", "SUCCEEDED", 1250000, 1, "Venta online #1042"],
    ["uala", "SUCCEEDED", 320000, 1, "Pedido mostrador #88"],
    ["mercadopago", "SUCCEEDED", 890000, 3, "Venta online #1040"],
    ["modo", "SUCCEEDED", 45000, 4, "Venta QR #210"],
    ["uala", "SUCCEEDED", 750000, 5, "Pedido mostrador #84"],
    ["mercadopago", "SUCCEEDED", 2100000, 7, "Venta online #1037"],
    ["uala", "SUCCEEDED", 199000, 9, "Pedido mostrador #81"],
    ["ripio", "SUCCEEDED", 500000, 10, "Cobro internacional USDC"],
    ["mercadopago", "SUCCEEDED", 640000, 12, "Venta online #1034"],
    ["modo", "SUCCEEDED", 120000, 14, "Venta QR #205"],
    ["uala", "PROCESSING", 300000, 0, "Pedido mostrador #89"],
    ["mercadopago", "PROCESSING", 1550000, 0, "Venta online #1043"],
    ["modo", "PENDING", 95000, 0, "Venta QR #212"],
    ["uala", "FAILED", 400000, 2, "Pedido mostrador #86"],
    ["mercadopago", "EXPIRED", 280000, 6, "Venta online #1038"],
  ];

  for (const [provider, status, amount, daysAgo, desc] of intents) {
    const createdAt = new Date(now - daysAgo * day);
    const existing = await prisma.paymentIntent.findFirst({
      where: { tenantId: tenant.id, idempotencyKey: `demo-${provider}-${daysAgo}-${amount}` },
    });
    if (existing) continue;
    const intent = await prisma.paymentIntent.create({
      data: {
        tenantId: tenant.id,
        provider,
        amountCents: BigInt(amount),
        currency: provider === "ripio" ? "USDC" : "ARS",
        status,
        idempotencyKey: `demo-${provider}-${daysAgo}-${amount}`,
        externalRef: `demo-${provider.slice(0, 4)}-${daysAgo}${amount}`,
        metadata: { description: desc },
        expiresAt: status === "PENDING" ? new Date(now + 3600_000) : null,
        createdAt,
        updatedAt: createdAt,
      },
    });
    const es = [...col.pending(amount, intent.id, createdAt)];
    if (status === "SUCCEEDED") es.push(...col.succeeded(amount, intent.id, new Date(createdAt.getTime() + 3_600_000)));
    if (["FAILED", "EXPIRED"].includes(status)) es.push(...col.released(amount, intent.id, new Date(createdAt.getTime() + 3_600_000)));
    await prisma.ledgerEntry.createMany({ data: es });
  }

  // Payouts demo
  const owner = await prisma.user.findFirst({ where: { tenantId: tenant.id, role: "OWNER" } });
  const op = await prisma.user.findFirst({ where: { tenantId: tenant.id, role: "OPERATOR" } });
  const payouts = [
    // [payeeRef, amount, status, daysAgo, approved]
    ["proveedor.papel.uala", 850000, "SUCCEEDED", 3, true],
    ["transporte.urbano.mp", 1200000, "SUCCEEDED", 5, true],
    ["insumos.grupo.nx", 400000, "PENDING", 0, false], // esperando aprobación
    ["servicios.luz.uala", 600000, "FAILED", 2, true],
  ];
  for (const [payeeRef, amount, status, daysAgo, approved] of payouts) {
    const createdAt = new Date(now - daysAgo * day);
    const existing = await prisma.payout.findFirst({
      where: { tenantId: tenant.id, idempotencyKey: `demo-p-${daysAgo}-${amount}` },
    });
    if (existing) continue;
    const payout = await prisma.payout.create({
      data: {
        tenantId: tenant.id,
        provider: "mercadopago",
        payeeRef,
        amountCents: BigInt(amount),
        currency: "ARS",
        status,
        idempotencyKey: `demo-p-${daysAgo}-${amount}`,
        externalRef: status === "SUCCEEDED" ? `sandbox-pay-${daysAgo}` : null,
        createdByUserId: op?.id ?? null,
        approvedById: approved ? owner?.id ?? null : null,
        createdAt,
        updatedAt: createdAt,
      },
    });
    if (status !== "PENDING") {
      const es = [
        le("clearing", amount, 0, "payout", payout.id, createdAt),
        le("available", 0, amount, "payout", payout.id, createdAt),
      ];
      if (status === "FAILED") {
        es.push(le("available", amount, 0, "payout", payout.id, createdAt), le("clearing", 0, amount, "payout", payout.id, createdAt));
      }
      await prisma.ledgerEntry.createMany({ data: es });
    }
  }

  // Ciclo de suscripción del mes pasado
  const prevStart = new Date(now - 30 * day);
  const periodStart = new Date(prevStart.getFullYear(), prevStart.getMonth(), 1);
  await prisma.subscriptionCycle.upsert({
    where: { tenantId_periodStart: { tenantId: tenant.id, periodStart } },
    update: {},
    create: {
      tenantId: tenant.id,
      periodStart,
      periodEnd: new Date(periodStart.getFullYear(), periodStart.getMonth() + 1, 0),
      gmvSnapshot: BigInt(6_000_000),
      tierApplied: "growth",
      amountCents: BigInt(1_500_000),
      invoicedAt: new Date(periodStart.getTime() + 2 * day),
    },
  });

  // Eventos de auditoría
  if ((await prisma.auditLog.count({ where: { tenantId: tenant.id } })) === 0) {
    await prisma.auditLog.createMany({
      data: [
        { tenantId: tenant.id, apiKeyId: "demo-key", action: "api_key.create", entity: "api_key", entityId: "demo-key-1", createdAt: new Date(now - 6 * day) },
        { tenantId: tenant.id, userId: owner?.id ?? "demo", action: "payout.approve", entity: "payout", entityId: "demo-pay-1", createdAt: new Date(now - 5 * day) },
        { tenantId: tenant.id, userId: op?.id ?? "demo", action: "payout.create", entity: "payout", entityId: "demo-pay-1", createdAt: new Date(now - 5 * day) },
        { tenantId: tenant.id, apiKeyId: "demo-key", action: "credential.upsert", entity: "psp_credential", entityId: "demo-cred-uala", createdAt: new Date(now - 7 * day) },
      ],
    });
  }

  console.log(`Demo data: ${intents.length} intents, ${payouts.length} payouts, 1 ciclo, 4 audit logs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
