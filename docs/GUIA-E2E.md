# Guía End-to-End — plata-neta

Qué hace el sistema, quién hace qué, y el flujo completo de un cobro 0%
por transferencia a CVU/CBU/alias — del registro del comercio a la plata
en su cuenta.

---

## 1. Qué es plata-neta

Un **orquestador de pagos multi-tenant** para comercios argentinos.
No es un PSP: no custodia plata, no emite cuentas, no cobra % por cobro.
Lo que hace:

- Te deja **conectar tus propias billeteras/bancos** (CVU, CBU, alias)
- Genera **instrucciones de cobro** listas para que tu cliente transfiera
  directo a TU cuenta (0% comisión — transferencia = gratis)
- **Registra y concilia** cada cobro en un ledger contable
- Orquesta **pagos salientes** (payouts a proveedores) con aprobación en dos pasos
- Te cobra **una suscripción mensual** según tu volumen (GMV)

El comercio paga por el SaaS, no por cada transacción.

## 2. Los actores

| Actor | Qué hace |
|---|---|
| **OWNER** | Dueño del comercio. Todo: credenciales, keys, equipo, aprueba payouts |
| **OPERATOR** | Opera: crea cobros, propone payouts, conecta billeteras. No aprueba ni administra |
| **VIEWER** | Solo lectura del dashboard |
| **Cliente/pagador** | El que transfiere — NO es usuario de plata-neta, solo recibe la instrucción de pago |
| **Proveedor/payee** | A quien le pagás — recibe transferencia a su alias |

## 3. Flujo completo de un cobro (E2E)

```
COMERCIO                          PLATA-NETA                    PAGADOR
   │                                  │                           │
   │  1. Registro + alta billetera    │                           │
   │ ──────────────────────────────> │                           │
   │     guarda CVU/alias cifrado    │                           │
   │                                 │                           │
   │  2. Crear cobro (UI o API)      │                           │
   │ ──────────────────────────────> │ intent PENDING            │
   │                                 │ ledger: pending+/clearing-│
   │                                 │                           │
   │  3. Recibe paymentDetails       │                           │
   │ <────────────────────────────── │ {cvu, alias, monto, ref}  │
   │                                 │                           │
   │  4. Comparte link/QR/datos ────────────────────────────────>│
   │                                 │                           │
   │                                 │     5. Transfiere al CVU  │
   │                                 │         del comercio      │
   │                                 │ <─────────────────────────│
   │                                 │                           │
   │                                 │  6. Webhook firmado       │
   │                                 │     (o polling de estado) │
   │                                 │     → SUCCEEDED           │
   │                                 │     ledger: available+/   │
   │                                 │             pending-      │
   │                                 │                           │
   │  7. Dashboard muestra ACREDITADO│ ← plata YA en su cuenta   │
   │     ledger + auditoría          │     del banco/billetera   │
```

**Punto clave**: la plata nunca pasa por plata-neta. El paso 5 va del
pagador directo a la cuenta del comercio. plata-neta solo registra,
verifica la firma del webhook, actualiza estado y ledger.

### Los estados posibles

| Estado | Significado |
|---|---|
| `PENDING` | Cobro creado, esperando transferencia |
| `PROCESSING` | Transferencia en camino / en el clearing del PSP |
| `SUCCEEDED` | ACREDITADO — plata en `available` del ledger |
| `FAILED` | No se pudo completar — libera posición pendiente |
| `EXPIRED` | Pasó `INTENT_EXPIRES_MINUTES` sin confirmarse |
| `REVERSED` | Se devolvió la transferencia |

## 4. Flujo paso a paso (desde cero)

### Paso 0 — Registro del comercio

`http://localhost:3500/register` (o el deploy en Vercel):
email + nombre + password → crea `Tenant` + `User` role=OWNER
(plus un `owner@demo.plata`/`demo1234` ya precargado en seed).

### Paso 1 — Conectar una billetera (lo único que hay que hacer para cobrar)

**UI**: Dashboard → **Billeteras** → elegir provider → cargar:
- `CVU` (billeteras: Ualá, Brubank, Personal Pay, Prex, Cuenta DNI, BNA+, MP, NX)
- `CBU` (bancos: Galicia, Santander, BBVA, Macro, Nación, Provincia, Credicoop)
- `alias` (opcional pero recomendado — más fácil para el pagador)
- `accessToken` (solo si el PSP te da uno — si no, dejalo vacío)

> Se guarda cifrado AES-256-GCM en `PspCredential.encryptedKeys`.
> Nadie (ni plata-neta) puede leer el CVU/alias en plano fuera del flow.

**API** (equivalente):
```bash
curl -X POST :4500/api/v1/credentials \
  -H "Authorization: Bearer $KEY" -d '{
    "provider": "uala",
    "accessToken": "tok-o-placeholder",
    "cvu": "0000007900001234567890",
    "alias": "micomercio.uala"
  }'
```

### Paso 2 — Crear el cobro

**UI**: Cobros → **Nuevo cobro** → provider + monto + descripción.
Solo aparecen los providers con credencial conectada.

**API**:
```bash
curl -X POST :4500/api/v1/payment-intents \
  -H "Authorization: Bearer $KEY" -d '{
    "provider": "uala",
    "amountCents": 50000,
    "idempotencyKey": "pedido-1042",
    "metadata": { "descripcion": "Pedido mostrador #1042" }
  }'
```

**Respuesta** — la instrucción de pago lista para el cliente:
```json
{
  "intent": {
    "id": "clxyz...", "status": "PENDING",
    "paymentDetails": {
      "cvu": "0000007900001234567890",
      "alias": "micomercio.uala",
      "amount": "500.00", "currency": "ARS",
      "reference": "uala-pedido-1042"
    }
  }
}
```

El `idempotencyKey` garantiza que reintentos no dupliquen el cobro.

### Paso 3 — El pagador transfiere

El comercio le pasa al cliente (link, QR, WhatsApp, ticket):
```
Transferí $500.00 a
  Alias: micomercio.uala   (o CVU: 0000007900001234567890)
  Referencia: uala-pedido-1042
```
La transferencia sale de la cuenta del cliente y entra **directo**
a la cuenta Ualá del comercio — sin pasar por plata-neta.

### Paso 4 — Confirmación

Dos vías:
- **Webhook** (donde el PSP lo soporte): `POST /api/webhooks/uala`
  con firma válida → persiste `WebhookEvent` → BullMQ → `processWebhook`
  re-consulta `getStatus` al PSP → transición a `SUCCEEDED` + ledger.
- **Sin webhook** (bancos sin API): el sweep de jobs + la conciliación
  lo actualizan cuando el PSP reporte, o el comercio lo marca cuando vea
  la transferencia en su app.

El ledger siempre cuadra:
- PENDING → `pending +monto` / `clearing -monto`
- SUCCEEDED → `available +monto` / `pending -monto`
- FAILED/EXPIRED → `clearing +monto` / `pending -monto` (libera)

### Paso 5 — Pagar a proveedores (payout)

**UI**: Pagos → Nuevo → alias/CBU del proveedor + monto.

- Monto < `PAYOUT_APPROVAL_THRESHOLD` (default $100k ARS) → directo
  `PROCESSING` → el job `payout.execute` lo envía (sandbox: simula).
- Monto ≥ umbral → `PENDING` → **otro** OWNER lo aprueba
  (aprobador ≠ creador — separación de funciones) → `PROCESSING` → ejecuta.

En conciliación: el ledger descuenta `available` y mueve por `clearing`.

### Paso 6 — Facturación a plata-neta

El job `subscription.bill` (1° de cada mes): suma el GMV del mes,
busca el `Plan` cuyo threshold aplica, crea `SubscriptionCycle`
con el precio mensual → `/dashboard/plan` muestra barra hacia el tier.

## 5. Dashboard — qué muestra cada pantalla

| Pantalla | Ves |
|---|---|
| **Resumen** | KPIs: saldos del ledger, cobros/payouts recientes |
| **Billeteras** | Las 17 providers, tus CVU/CBU/alias conectados, alta/baja |
| **Cobros** | Lista filtrada, estados en vivo, detalle con ledger por cobro |
| **Pagos** | Payouts, pendientes de aprobación, estados |
| **Conciliación** | Desajustes intent↔ledger (drift detection) |
| **Plan** | GMV del mes, tier actual, progreso al siguiente |
| **Reportes** | Resumen por provider/estado + **Exportar CSV** |
| **Keys** | API keys del tenant (crear/revocar — la key se muestra una vez) |
| **Equipo** | Invitar OPERATOR/VIEWER, cambiar roles (OWNER) |
| **Auditoría** | Quién hizo qué — usuario vs api key, acción, entidad |

## 6. Arquitectura en 30 segundos

```
apps/api :4500    REST multi-tenant + webhooks firmados
apps/web :3500    Dashboard (Next.js + HeroUI + Auth.js)
packages/
  db              Prisma schema + crypto AES-256-GCM
  core            Ledger helpers, máquina de estados, money utils
  providers       17 adaptadores PaymentProvider (factory CVU)
  jobs            BullMQ processors: webhook, expiry, payout, billing
```

Jobs programados: `intent.expire` cada 5min, `reconcile.run` cada 15min,
`payout.execute` cada 2min, `subscription.bill` 1° de cada mes 03:00.

## 7. Qué NO hace plata-neta (por diseño legal)

- ❌ No custodia fondos — la plata va comercio→comercio
- ❌ No emite CVU/QR propios — solo usa los del comercio
- ❌ No intermedia settlement bajo su CUIT — evita la "aceptación" BCRA
- ❌ No mueve cripto saliente (Ripio es solo recepción — CNV/PSAV)
- ❌ No reemplaza al banco/billetera del comercio — los organiza
