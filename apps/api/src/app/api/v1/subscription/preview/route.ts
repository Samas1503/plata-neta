import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { authenticateApiKey } from "@/lib/apikey";

// GET /api/v1/subscription/preview — GMV actual del ciclo + tier proyectado.
export async function GET(req: NextRequest) {
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [gmv, plans] = await Promise.all([
    prisma.paymentIntent.aggregate({
      where: { tenantId: auth.tenantId, status: "SUCCEEDED", createdAt: { gte: periodStart, lte: periodEnd } },
      _sum: { amountCents: true },
    }),
    prisma.plan.findMany({ orderBy: { gmvThreshold: "asc" } }),
  ]);

  const gmvTotal = gmv._sum.amountCents ?? 0n;
  const projected = [...plans].reverse().find((p) => gmvTotal >= p.gmvThreshold) ?? plans[0];

  return NextResponse.json({
    period: periodStart.toISOString().slice(0, 7),
    gmvCents: gmvTotal.toString(),
    projectedTier: projected?.name,
    projectedPriceCents: projected?.monthlyPrice.toString(),
  });
}
