import { prisma, decryptJson } from "@plata-neta/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PROVIDER_IDS } from "@plata-neta/providers";
import { PROVIDER_LABEL, PANEL, PANEL_SOFT, BTN_PRIMARY, BTN_GHOST, SELECT } from "@/components/ds";
import { saveBilletera, deleteBilletera } from "@/app/dashboard/actions/billeteras";

const INPUT =
  "w-full rounded-xl border border-separator bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500";

// Billeteras del comercio: alta self-service de CVU/CBU/alias para cobrar al 0%.
export default async function BilleterasPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const creds = await prisma.pspCredential.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "asc" },
  });

  const configured = new Set(creds.map((c) => c.provider));

  const rows = creds.map((c) => {
    let info: { cvu?: string; cbu?: string; alias?: string } = {};
    try {
      info = decryptJson<typeof info>(c.encryptedKeys);
    } catch {
      info = {};
    }
    return { id: c.id, provider: c.provider, cvu: info.cvu, cbu: info.cbu, alias: info.alias };
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-8 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billeteras</h1>
        <p className="mt-1 text-sm text-muted">
          Registrá tu CVU, CBU o alias por provider — los cobros entran directo
          a tu cuenta, al 0%. Todo queda cifrado (AES-256-GCM).
        </p>
      </div>

      <section className={`${PANEL} p-6`}>
        <h2 className="mb-4 text-base font-semibold">Agregar billetera o banco</h2>
        <form action={saveBilletera} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="provider" className="mb-1 block text-xs font-medium text-muted">
              Provider
            </label>
            <select id="provider" name="provider" required className={SELECT}>
              {PROVIDER_IDS.map((id) => (
                <option key={id} value={id} disabled={configured.has(id)}>
                  {PROVIDER_LABEL[id] ?? id}
                  {configured.has(id) ? " (conectado)" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cvu" className="mb-1 block text-xs font-medium text-muted">CVU</label>
            <input id="cvu" name="cvu" placeholder="0000000000000000000000" className={INPUT} />
          </div>
          <div>
            <label htmlFor="cbu" className="mb-1 block text-xs font-medium text-muted">CBU (bancos)</label>
            <input id="cbu" name="cbu" placeholder="0000000000000000000000" className={INPUT} />
          </div>
          <div>
            <label htmlFor="alias" className="mb-1 block text-xs font-medium text-muted">Alias</label>
            <input id="alias" name="alias" placeholder="mi.comercio.wallet" className={INPUT} />
          </div>
          <div>
            <label htmlFor="accessToken" className="mb-1 block text-xs font-medium text-muted">
              Access token (opcional, si el PSP lo da)
            </label>
            <input id="accessToken" name="accessToken" type="password" className={INPUT} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={BTN_PRIMARY}>Guardar billetera</button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold">Conectadas ({rows.length})</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <article key={r.id} className={`${PANEL_SOFT} space-y-2 p-4`}>
              <header className="flex items-center justify-between">
                <strong className="text-sm">{PROVIDER_LABEL[r.provider] ?? r.provider}</strong>
                <form action={deleteBilletera.bind(null, r.id)}>
                  <button className={`${BTN_GHOST} !px-2 !py-1 text-xs text-red-500`}>Quitar</button>
                </form>
              </header>
              <dl className="space-y-1 text-xs text-muted">
                {r.alias && <div className="flex gap-2"><dt className="w-10">Alias</dt><dd className="font-mono text-foreground">{r.alias}</dd></div>}
                {r.cvu && <div className="flex gap-2"><dt className="w-10">CVU</dt><dd className="font-mono text-foreground">•••{r.cvu.slice(-8)}</dd></div>}
                {r.cbu && <div className="flex gap-2"><dt className="w-10">CBU</dt><dd className="font-mono text-foreground">•••{r.cbu.slice(-8)}</dd></div>}
              </dl>
            </article>
          ))}
          {rows.length === 0 && (
            <p className="text-sm text-muted">Todavía no conectaste ninguna billetera.</p>
          )}
        </div>
      </section>
    </div>
  );
}
