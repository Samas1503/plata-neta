// Simulador de actividad en vivo para la demo.
// Uso: pnpm --filter @plata-neta/jobs demo
// Crea cobros que transicionan PENDING→PROCESSING→SUCCEEDED con ledger real,
// y un payout que el job payout.execute ejecuta (sandbox).

import { prisma } from "@plata-neta/db";
import {
  canTransition,
  entriesForCollectionPending,
  entriesForCollectionSucceeded,
} from "@plata-neta/core";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const AMOUNTS = [45_000, 120_000, 85_000, 210_000, 300_000];
const PROVIDERS = ["uala", "mercadopago", "modo"] as const;
const DESCS = ["Venta online", "Pedido mostrador", "Venta QR", "Cobro link"];

async function ledger(tenantId: string, entries: ReturnType<typeof entriesForCollectionPending>) {
  for (const e of entries) {
    await prisma.ledgerEntry.create({
      data: { tenantId, account: e.account, debitCents: e.debitCents, creditCents: e.creditCents, refType: e.refType, refId: e.refId },
    });
  }
}

async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: "comercio-demo" } });
  if (!tenant) throw new Error("seed no corrido — pnpm db:seed primero");

  const rounds = Number(process.env.DEMO_ROUNDS ?? "3");
  const pauseMs = Number(process.env.DEMO_PAUSE_MS ?? "4000");

  for (let i = 0; i < rounds; i++) {
    const amount = BigInt(AMOUNTS[i % AMOUNTS.length]!);
    const provider = PROVIDERS[i % PROVIDERS.length]!;
    const desc = `${DESCS[i % DESCS.length]} #${1000 + i}`;

    // 1) cobro PENDING + ledger
    const intent = await prisma.$transaction(async (tx) => {
      const created = await tx.paymentIntent.create({
        data: {
          tenantId: tenant.id,
          provider,
          amountCents: amount,
          currency: "ARS",
          idempotencyKey: `live-${Date.now()}-${i}`,
          externalRef: `live-${provider.slice(0, 4)}-${i}`,
          metadata: { description: desc },
          expiresAt: new Date(Date.now() + 3600_000),
        },
      });
      return created;
    });
    await ledger(tenant.id, entriesForCollectionPending(intent.id, amount));
    console.log(`[demo] cobro ${intent.id.slice(-8)} PENDING — ${desc} $${Number(amount) / 100}`);
    await sleep(pauseMs);

    // 2) PROCESSING
    await prisma.paymentIntent.update({ where: { id: intent.id }, data: { status: "PROCESSING" } });
    console.log(`[demo] cobro ${intent.id.slice(-8)} PROCESSING…`);
    await sleep(pauseMs);

    // 3) SUCCEEDED + ledger
    if (canTransition("PROCESSING", "SUCCEEDED")) {
      await prisma.paymentIntent.update({ where: { id: intent.id }, data: { status: "SUCCEEDED" } });
      await ledger(tenant.id, entriesForCollectionSucceeded(intent.id, amount));
      console.log(`[demo] cobro ${intent.id.slice(-8)} ✓ SUCCEEDED`);
    }

    // 4) cada 2 rondas, un payout bajo umbral → el sweep payout.execute lo ejecuta
    if (i % 2 === 1) {
      const pay = await prisma.payout.create({
        data: {
          tenantId: tenant.id,
          provider: "uala",
          payeeRef: `proveedor.${i}.demo`,
          amountCents: BigInt(60_000),
          currency: "ARS",
          status: "PROCESSING",
          idempotencyKey: `live-pay-${Date.now()}-${i}`,
        },
      });
      console.log(`[demo] payout ${pay.id.slice(-8)} PROCESSING → payout.execute lo ejecuta`);
    }
  }

  console.log(`[demo] ${rounds} rondas listas — recargá /dashboard para ver el movimiento`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
