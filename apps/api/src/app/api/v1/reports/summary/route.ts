import { NextResponse, type NextRequest } from "next/server";
import { json } from "@/lib/json";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey } from "@/lib/apikey";

// GET /api/v1/reports/summary?from&to — GMV por provider/moneda + ledger.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const from = url.searchParams.get("from") ? new Date(url.searchParams.get("from")!) : new Date(Date.now() - 30 * 86400000);
  const to = url.searchParams.get("to") ? new Date(url.searchParams.get("to")!) : new Date();

  const [byProvider, byStatus, ledger] = await Promise.all([
    prisma.paymentIntent.groupBy({
      by: ["provider", "currency"],
      where: { tenantId: auth.tenantId, status: "SUCCEEDED", createdAt: { gte: from, lte: to } },
      _sum: { amountCents: true },
      _count: true,
    }),
    prisma.paymentIntent.groupBy({
      by: ["status"],
      where: { tenantId: auth.tenantId, createdAt: { gte: from, lte: to } },
      _count: true,
    }),
    prisma.ledgerEntry.groupBy({
      by: ["account"],
      where: { tenantId: auth.tenantId },
      _sum: { debitCents: true, creditCents: true },
    }),
  ]);

  return json({
    period: { from, to },
    gmvByProvider: byProvider.map((r) => ({
      provider: r.provider,
      currency: r.currency,
      count: r._count,
      amountCents: (r._sum.amountCents ?? 0n).toString(),
    })),
    intentsByStatus: Object.fromEntries(byStatus.map((r) => [r.status, r._count])),
    ledger: Object.fromEntries(
      ledger.map((r) => [
        r.account,
        ((r._sum.debitCents ?? 0n) - (r._sum.creditCents ?? 0n)).toString(),
      ]),
    ),
  });
}
