import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey } from "@/lib/apikey";

// GET /api/v1/reconciliation/report — desajustes entre intents y ledger.
// Reglas: todo intent debe tener sus asientos; SUCCEEDED requiere
// pending→available; FAILED/EXPIRED/REVERSED requiere release.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const from = url.searchParams.get("from")
    ? new Date(url.searchParams.get("from")!)
    : new Date(Date.now() - 30 * 24 * 3600 * 1000);
  const to = url.searchParams.get("to")
    ? new Date(url.searchParams.get("to")!)
    : new Date();

  const [intents, entries] = await Promise.all([
    prisma.paymentIntent.findMany({
      where: { tenantId: auth.tenantId, createdAt: { gte: from, lte: to } },
      select: { id: true, provider: true, status: true, amountCents: true, externalRef: true, createdAt: true },
    }),
    prisma.ledgerEntry.findMany({
      where: { tenantId: auth.tenantId, refType: "payment_intent" },
      select: { refId: true, account: true, debitCents: true, creditCents: true },
    }),
  ]);

  const byRef = new Map<string, Map<string, bigint>>();
  for (const e of entries) {
    if (!e.refId) continue;
    const m = byRef.get(e.refId) ?? new Map<string, bigint>();
    m.set(e.account, (m.get(e.account) ?? 0n) + e.debitCents - e.creditCents);
    byRef.set(e.refId, m);
  }

  const drifts: { intentId: string; provider: string; status: string; expected: string; actual: string; amountCents: string }[] = [];
  for (const i of intents) {
    const m = byRef.get(i.id);
    const net = (acc: string) => m?.get(acc) ?? 0n;
    const hasEntries = !!m && m.size > 0;

    let expected: string | null = null;
    if (!hasEntries && i.status !== "PENDING") expected = "missing ledger entries";
    else if (i.status === "SUCCEEDED" && net("available") !== i.amountCents)
      expected = "available balance mismatch";
    else if (i.status === "PROCESSING" && net("pending") !== i.amountCents)
      expected = "pending balance mismatch";
    else if (
      ["FAILED", "EXPIRED", "REVERSED"].includes(i.status) &&
      net("pending") !== 0n
    )
      expected = "pending not released";

    if (expected) {
      drifts.push({
        intentId: i.id,
        provider: i.provider,
        status: i.status,
        expected,
        actual: `pending=${net("pending")}, available=${net("available")}`,
        amountCents: i.amountCents.toString(),
      });
    }
  }

  return json({
    period: { from, to },
    intentsChecked: intents.length,
    drifts,
  });
}
