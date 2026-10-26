# Guía de integración — billeteras y bancos (0%)

Todos los providers 0% funcionan igual: **el comercio cobra por
transferencia directa a su CVU/CBU/alias**. plata-neta genera la
instrucción de pago (monto + referencia + destino), el pagador transfiere,
y la conciliación confirma la entrada.

## Catálogo de providers

| id | Nombre | Rail | API pública | Estado adapter |
|---|---|---|---|---|
| `mercadopago` | Mercado Pago | Transferencia CVU / Checkout | ✅ Sí | Parcial (createIntent real) |
| `uala` | Ualá | CVU | Parcial | Skeleton |
| `modo` | MODO | QR PCT del comercio | Comercial | Skeleton |
| `naranjax` | Naranja X | CVU | Parcial | Skeleton |
| `ripio` | Ripio | Stablecoins recepción | Sí | Skeleton |
| `brubank` | Brubank | CVU | No pública | Skeleton |
| `personalpay` | Personal Pay | CVU | No pública | Skeleton |
| `cuentadni` | Cuenta DNI | CVU / QR DNI | Banco Provincia | Skeleton |
| `prex` | Prex | CVU | No pública | Skeleton |
| `bnaplus` | BNA+ | CVU | BNA | Skeleton |
| `galicia` | Galicia | CBU | Open banking | Skeleton |
| `santander` | Santander | CBU | Open banking | Skeleton |
| `bbva` | BBVA | CBU | Open banking | Skeleton |
| `macro` | Macro | CBU | Open banking | Skeleton |
| `bna` | Banco Nación | CBU | BNA | Skeleton |
| `provincia` | Banco Provincia | CBU | Banco Provincia | Skeleton |
| `credicoop` | Credicoop | CBU | No pública | Skeleton |

"Skeleton" = el adaptador ya genera la instrucción de cobro (funciona
hoy al 0%), falta cablear `getStatus`/webhook contra la API real.

## Cómo un usuario registra su billetera (flujo 0%)

1. Se registra en `/register` → obtiene su tenant.
2. Va a **Dashboard → Billeteras** → completa provider + CVU o CBU + alias.
   Los datos se guardan **cifrados AES-256-GCM** en `PspCredential.encryptedKeys`.
3. Al crear un cobro, el intent devuelve `paymentDetails`:
   ```json
   { "cvu": "...", "cbu": "...", "alias": "...", "amount": "500.00",
     "currency": "ARS", "reference": "brub-abc123" }
   ```
   El cliente transfiere directo al CVU/alias del comercio → **0% comisión**.
4. La confirmación llega por webhook (donde exista) o se concilia por
   `intent.expire`/reconciliación.

### API equivalente

```bash
curl -X POST :4500/api/v1/credentials \
  -H "Authorization: Bearer $API_KEY" -d '{
    "provider": "brubank",
    "accessToken": "token-o-dummy",
    "cvu": "0000000000000000000000",
    "alias": "mi.comercio.brubank"
  }'
```

Campos: `accessToken` requerido (para providers sin API real usá un
placeholder); `cvu`, `cbu`, `alias`, `qrPayload` van cifrados como extra.

## Cablear un provider real — checklist

Cada adaptador es `createCvuAdapter({id, apiBaseUrl, statusPath, signHeader})`
en `packages/providers/src/transferencia/index.ts`. Para hacerlo real:

1. **Docs/API**: conseguir documentación del PSP (la mayoría requiere
   convenio comercial — solicitar acceso developer).
2. **`createIntent`**: si el PSP tiene API de cobros, reemplazar el intent
   local por el POST real (ver `mercadopago/index.ts` de referencia).
   Si solo recepción por transferencia → dejar el intent local.
3. **`getStatus`**: ajustar `statusPath` + mapeo de estados al contrato
   real del PSP (`switch` en `cvu-adapter.ts`).
4. **`verifySignature`**: cada provider usa `${ID}_WEBHOOK_SECRET` +
   `signHeader` propio. Confirmar el esquema de firma real (HMAC-SHA256
   asumido; MP usa `x-signature`/`x-request-id` propios).
5. **`parseWebhook`**: mapear `externalRef`/`eventId` del payload real.
6. **`payout`**: hoy lanza `not implemented` en todos — implementar solo
   si el PSP permite débito/transferencias salientes por API.
7. **Tests**: agregar firma/parsing en `packages/providers/src/<id>/`.

## Notas legales

- Cuenta DNI y QR DNI: recepción directa al CBU del comercio — el QR es
  **del comercio**, nunca emitido por plata-neta (igual que MODO).
- Bancos "open banking" (Galicia/Santander/BBVA): las APIs exigen
  acuerdo de acceso (PSD2-style ARG). Sin acuerdo → solo instrucción de
  transferencia + conciliación por extracto importado.
- BCRA 1.4.3 "aceptación": el diseño CVU-directo lo evita por contrato —
  nunca intermediamos el dinero.
