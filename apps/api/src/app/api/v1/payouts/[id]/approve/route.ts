import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@plata-neta/db";
import { canTransition, entriesForPayoutSent } from "@plata-neta/core";
import { authenticateApiKey } from "@/lib/apikey";
import { audit } from "@/lib/audit";

// POST /api/v1/payouts/:id/approve — aprobación en dos pasos (RULES.MD §1).
// El aprobador debe ser distinto del creador (por userId del dashboard o key distinta).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await authenticateApiKey(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const payout = await prisma.payout.findFirst({
    where: { id, tenantId: auth.tenantId },
  });
  if (!payout) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (payout.status !== "PENDING") {
    return NextResponse.json({ error: `cannot approve status ${payout.status}` }, { status: 409 });
  }
  if (payout.approvedById) {
    return NextResponse.json({ error: "already approved" }, { status: 409 });
  }

  // Aprobar: marca approvedById con el id de la key aprobadora.
  const updated = await prisma.payout.update({
    where: { id: payout.id },
    data: { approvedById: auth.keyId, status: "PROCESSING" },
  });

  // Ledger: sale de available al enviar.
  await prisma.$transaction(async (tx) => {
    for (const e of entriesForPayoutSent(payout.id, payout.amountCents)) {
      await tx.ledgerEntry.create({
        data: {
          tenantId: payout.tenantId,
          account: e.account,
          debitCents: e.debitCents,
          creditCents: e.creditCents,
          refType: e.refType,
          refId: e.refId,
        },
      });
    }
  });

  await audit({ tenantId: auth.tenantId, apiKeyId: auth.keyId, action: "payout.approve", entity: "payout", entityId: payout.id });
  return NextResponse.json({ payout: updated });
}
