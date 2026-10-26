"use client";

import { useState } from "react";
import { createApiKey } from "@/app/dashboard/actions/keys";
import { Input, Label, Button } from "@/components/heroui";
import { Panel, PanelBody } from "@/components/ds";

// SEC-4: la key se muestra solo en memoria del componente —
// nunca viaja por URL (history/logs/Referer).
export function CreateKeyForm() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function action(formData: FormData) {
    const res = await createApiKey(formData);
    if (res.apiKey) setApiKey(res.apiKey);
    else setError(true);
  }

  return (
    <div className="space-y-4">
      {apiKey && (
        <Panel className="border-emerald-300 bg-emerald-50/60">
          <PanelBody>
            <p className="text-sm font-semibold text-emerald-800">
              Guardá esta clave — solo se muestra una vez:
            </p>
            <code className="mt-2 block break-all rounded-xl border border-emerald-200 bg-white px-3 py-2 font-mono text-sm">
              {apiKey}
            </code>
          </PanelBody>
        </Panel>
      )}
      {error && <p className="text-sm text-red-500">No se pudo crear la key.</p>}
      <form action={action} className="flex items-end gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="producción, staging…" required />
        </div>
        <Button type="submit">Crear key</Button>
      </form>
    </div>
  );
}
