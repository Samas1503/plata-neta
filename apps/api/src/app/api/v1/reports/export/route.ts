import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey } from "@/lib/apikey";

// GET /api/v1/reports/export.csv — export contable de intents+payouts+ledger.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const [intents, payouts, entries] = await Promise.all([
    prisma.paymentIntent.findMany({ where: { tenantId: auth.tenantId }, orderBy: { createdAt: "desc" }, take: 5000 }),
    prisma.payout.findMany({ where: { tenantId: auth.tenantId }, orderBy: { createdAt: "desc" }, take: 5000 }),
    prisma.ledgerEntry.findMany({ where: { tenantId: auth.tenantId }, orderBy: { createdAt: "desc" }, take: 10000 }),
  ]);

  const esc = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const rows: string[] = [];
  rows.push("type,id,provider/payee,account,debit,credit,status,amount,currency,external_ref,created_at");
  for (const i of intents) {
    rows.push(["payment_intent", i.id, i.provider, "", "", "", i.status, i.amountCents, i.currency, i.externalRef ?? "", i.createdAt.toISOString()].map(esc).join(","));
  }
  for (const p of payouts) {
    rows.push(["payout", p.id, p.payeeRef, "", "", "", p.status, p.amountCents, p.currency, p.externalRef ?? "", p.createdAt.toISOString()].map(esc).join(","));
  }
  for (const e of entries) {
    rows.push(["ledger_entry", e.id, "", e.account, e.debitCents, e.creditCents, "", "", "", e.refId ?? "", e.createdAt.toISOString()].map(esc).join(","));
  }

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="plata-neta-export-${Date.now()}.csv"`,
    },
  });
}
