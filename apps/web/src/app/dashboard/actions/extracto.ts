"use server";

import { redirect } from "next/navigation";
import { prisma } from "@plata-neta/db";
import { canTransition, entriesForCollectionSucceeded } from "@plata-neta/core";
import { auth } from "@/auth";

// Importación de extracto bancario/billetera (CSV) para conciliar cobros
// sin API. El comercio baja los movimientos de su app, los sube acá y el
// sistema matchea por monto + referencia → confirma los intents.

const AMOUNT_COLS = ["monto", "amount", "importe", "total"];
const REF_COLS = ["referencia", "reference", "concepto", "descripcion", "detalle", "ref"];
const DATE_COLS = ["fecha", "date"];

function parseAmount(raw: string): bigint | null {
  // Acepta "1.234,56" (AR) y "1234.56" (en).
  const t = raw.replace(/[$\s]/g, "");
  const normalized = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t;
  const n = Number(normalized);
  if (!Number.isFinite(n) || n <= 0) return null;
  return BigInt(Math.round(n * 100));
}

interface ExtractoRow {
  reference: string;
  amountCents: bigint;
  dateStr: string;
}

function parseCsv(text: string): ExtractoRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const sep = lines[0]!.includes(";") ? ";" : ",";
  const headers = lines[0]!.toLowerCase().split(sep).map((h) => h.trim().replace(/['"]/g, ""));
  const pick = (cands: string[]) =>
    headers.findIndex((h) => cands.some((c) => h.includes(c)));
  const iAmt = pick(AMOUNT_COLS);
  const iRef = pick(REF_COLS);
  const iDate = pick(DATE_COLS);
  if (iAmt < 0) return [];

  const rows: ExtractoRow[] = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(sep).map((c) => c.trim().replace(/^"|"$/g, ""));
    const amount = parseAmount(cols[iAmt] ?? "");
    if (!amount) continue;
    rows.push({
      amountCents: amount,
      reference: iRef >= 0 ? cols[iRef] ?? "" : "",
      dateStr: iDate >= 0 ? cols[iDate] ?? "" : "",
    });
  }
  return rows;
}

export async function importarExtracto(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user || !["OWNER", "OPERATOR"].includes(session.user.role)) {
    redirect("/dashboard");
  }
  const file = formData.get("extracto");
  if (!(file instanceof File) || file.size === 0 || file.size > 2 * 1024 * 1024) {
    redirect("/dashboard/reconciliation?error=archivo");
  }
  const rows = parseCsv(await file.text());
  if (rows.length === 0) {
    redirect("/dashboard/reconciliation?error=formato");
  }

  // Intents conciliables del tenant (solo los que esperan confirmación).
  const pendientes = await prisma.paymentIntent.findMany({
    where: { tenantId: session.user.tenantId, status: { in: ["PENDING", "PROCESSING"] } },
  });

  let matched = 0, unmatched = 0, ambiguous = 0;
  for (const row of rows) {
    const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9]/g, "");
    const rowRef = norm(row.reference);
    const candidates = pendientes.filter((i) => {
      // Monto exacto ±1 centavo.
      const diff = i.amountCents > row.amountCents ? i.amountCents - row.amountCents : row.amountCents - i.amountCents;
      if (diff > 1n) return false;
      // Referencia: substring en cualquier dirección sobre ref/idempotency/descripción.
      if (!rowRef) return true; // sin columna de referencia → solo monto
      const hay = [i.externalRef ?? "", i.idempotencyKey, norm(String((i.metadata as Record<string, unknown>)?.["description"] ?? ""))]
        .map((v) => norm(v));
      return hay.some((h) => h.length > 3 && (h.includes(rowRef) || rowRef.includes(h)));
    });

    if (candidates.length > 1) { ambiguous++; continue; }
    if (candidates.length === 0) { unmatched++; continue; }

    const intent = candidates[0]!;
    if (!canTransition(intent.status, "SUCCEEDED")) { unmatched++; continue; }

    await prisma.$transaction(async (tx) => {
      const { count } = await tx.paymentIntent.updateMany({
        where: { id: intent.id, status: intent.status },
        data: { status: "SUCCEEDED" },
      });
      if (count !== 1) return;
      for (const e of entriesForCollectionSucceeded(intent.id, intent.amountCents)) {
        await tx.ledgerEntry.create({
          data: { tenantId: intent.tenantId, account: e.account, debitCents: e.debitCents, creditCents: e.creditCents, refType: e.refType, refId: e.refId },
        });
      }
      await tx.auditLog.create({
        data: {
          tenantId: session.user.tenantId,
          userId: session.user.id!,
          action: "cobro.confirm_extracto",
          entity: "payment_intent",
          entityId: intent.id,
          metadata: { provider: intent.provider, ref: row.reference },
        },
      });
    });
    matched++;
  }

  redirect(`/dashboard/reconciliation?imported=${matched}&unmatched=${unmatched}&ambiguous=${ambiguous}`);
}
