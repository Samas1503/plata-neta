# Documentación — plata-neta

## Visión general

**plata-neta** es un SaaS multi-tenant para comercios argentinos que permite
realizar **cobros y pagos directos** a través de billeteras virtuales y
stablecoins, centralizando todos los riels de pago en una sola plataforma.

**Modelo de negocio**: suscripción mensual por tiers. El tier de cada comercio
se determina por su **volumen de ventas mensual (GMV)** y se reevalúa en cada
ciclo de facturación.

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      apps/web                            │
│        Dashboard del comercio (Next.js App Router)       │
│   cobros · payouts · conciliación · reportes · plan      │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                      apps/api                            │
│   REST API · webhooks PSP · auth · jobs de conciliación  │
└──────┬──────────────┬──────────────────┬────────────────┘
       │              │                  │
┌──────▼─────┐ ┌──────▼───────┐ ┌────────▼────────┐
│ packages/  │ │ packages/    │ │ packages/       │
│ core       │ │ providers    │ │ db (Prisma)     │
│ ledger,    │ │ adaptadores  │ │ PostgreSQL      │
│ money,     │ │ por PSP      │ │                 │
│ estados    │ │              │ │                 │
└────────────┘ └──────┬───────┘ └─────────────────┘
                      │
        ┌─────┬───────┼───────┬──────────┐
        ▼     ▼       ▼       ▼          ▼
       MP    MODO    Ualá   Naranja X   Ripio
```

## Módulos de dominio

### 1. Identidad y tenants
- Comercios (tenants), usuarios con roles (`owner`, `operator`, `viewer`).
- Onboarding con KYC/KYB antes de habilitar operaciones reales.

### 2. Cobros (Collections)
- Intents de cobro con monto, moneda y medio elegido.
- Riels: transferencia CVU/alias, QR interoperable (Transferencias 3.0),
  checkout Mercado Pago, stablecoins vía Ripio.
- Expiración de intents, notificación al comercio, contracargos.

### 3. Pagos (Payouts)
- Envío de fondos a beneficiarios (CVU, alias, wallet cripto).
- Aprobación en dos pasos para montos sobre umbral configurable.
- Idempotencia estricta y registro de auditoría.

### 4. Ledger y saldos
- Libro de doble entrada: fuente única de verdad de los fondos.
- Cuentas internas por tenant: `available`, `pending`, `fees`.

### 5. Conciliación
- Jobs que cruzan extractos/reportes de cada PSP contra el ledger.
- Discrepancias → alerta y estado `reconciliation_pending`.

### 6. Suscripciones y facturación
- Planes tiered por GMV mensual (umbrales configurables).
- Re-tiering automático al cierre del ciclo.
- Facturación de la suscripción (cobro al comercio por el propio riel).

### 7. Reportes
- GMV, fees por PSP, cobros/payouts por período, exportación contable.

## Integraciones por proveedor

| PSP | Tipo | Riels | Notas de implementación |
|---|---|---|---|
| **Mercado Pago** | PSP principal | Transferencia CVU/alias, QR, Checkout, payouts | SDK oficial `mercadopago` (Node). Webhooks con firma `x-signature`. Sandbox con usuarios de prueba. |
| **MODO** | Billetera bancaria | QR, transferencia | Integración vía APIs de bancos participantes / Play Digital. Requiere convenio comercial. |
| **Ualá** | Billetera virtual | CVU, cobros a cuenta | API de Ualá Bis para comercios. |
| **Naranja X** | Billetera virtual | CVU, cobros a cuenta | API Naranja X Empresas / Debin. |
| **Ripio** | On/off-ramp cripto | USDT/USDC in-out, conversión a ARS | Ripio API/Trade. Soporta recibir pagos en stablecoins desde el exterior y liquidar ARS. Validar red (TRC-20/ERC-20/Polygon) por operación. |

> Estrategia: todos implementan una interfaz `PaymentProvider`
> (`createIntent`, `getStatus`, `payout`, `parseWebhook`, `verifySignature`)
> en `packages/providers`. El dominio no conoce SDKs concretos.

## Esquema de datos (borrador inicial)

```
Tenant ─┬─ User (role)
        ├─ Plan (tier, gmv_threshold, monthly_price)
        ├─ PspCredential (provider, encrypted_keys)
        ├─ PaymentIntent (amount_cents, currency, provider, status, idempotency_key)
        ├─ Payout (payee_ref, amount_cents, provider, status)
        ├─ LedgerEntry (account, debit/credit, ref_id)
        ├─ WebhookEvent (provider, payload, signature_valid, processed_at)
        └─ SubscriptionCycle (period, gmv_snapshot, tier_applied, invoiced_at)
```

## Variables de entorno (.env.example — borrador)

```bash
# App
DATABASE_URL=
APP_ENV=sandbox                    # sandbox | production

# Mercado Pago
MP_ACCESS_TOKEN=
MP_WEBHOOK_SECRET=

# MODO / Ualá / Naranja X
MODO_API_KEY=
UALA_API_KEY=
NARANJAX_API_KEY=

# Ripio
RIPIO_API_KEY=
RIPIO_API_SECRET=
RIPIO_WEBHOOK_SECRET=

# Suscripciones
BILLING_CRON_SECRET=
```

## Decisiones técnicas (ADR ligero)

| Fecha | Decisión | Estado |
|---|---|---|
| 2026-10-20 | Monorepo pnpm + Turborepo, Next.js + TypeScript | Aceptado |
| 2026-10-20 | Mercado argentino; PSPs: MP, MODO, Ualá, Naranja X + Ripio | Aceptado |
| 2026-10-20 | Suscripción mensual tiered por GMV | Aceptado |
| 2026-10-20 | Posicionamiento: **orquestador SaaS** (categoría Yuno/Primer/Qobra), NO PSP. MODO es riel proveedor, no modelo espejo ni competidor | Aceptado (debate `business-model`) |
| 2026-10-20 | Constraint regulatorio de diseño: operar solo sobre **credenciales y cuentas del propio comercio** (`PspCredential`); nunca adherir comercios al esquema, emitir QR/IDs propios ni recibir liquidación con ID propio — evita funciones "aceptación" (TO PSP 1.4.3) y "agregación" (1.4.8) del BCRA | Aceptado (debate `business-model`) |
| 2026-10-20 | Aceptación 1.4.3 es **indeterminada** para orquestadores: diseño con imposibilidad estructural de cumplir la función + consulta SEFyC y opinión legal como gate pre-lanzamiento | Aceptado (debate `psp-boundary`) |
| 2026-10-20 | Riel Ripio fuera de PSAV bajo reglas: cero disposición (nunca llamar endpoints de movimiento), off-ramp como standing instruction en Ripio, payouts cripto fuera del MVP, encuadre exclusión art. 2° iv + delegación RG 1058 | Aceptado (debate `psp-boundary`) |
| 2026-10-20 | ORM: Prisma + PostgreSQL (schema v0 pusheado: Tenant, User, Plan, PspCredential, PaymentIntent, Payout, LedgerEntry, WebhookEvent, SubscriptionCycle) | Aceptado (Fase 0) |
| 2026-10-20 | Auth: Auth.js v5 + credentials (scrypt nativo, JWT, roles por tenant) | Aceptado (Fase 0) |
| — | Cola de jobs para conciliación/webhooks | Pendiente (BullMQ, Inngest o cron) |
| — | Env por app: cada app lee `.env.local` propio (Next no lee `.env` del root) | Convención adoptada |

## Roadmap

1. **Fase 0** — Scaffold del monorepo, DB, auth, modelo Tenant/User.
2. **Fase 1** — Ledger + PaymentIntent + adaptador Mercado Pago (sandbox):
   cobro por transferencia y webhook.
3. **Fase 2** — Payouts MP + conciliación básica.
4. **Fase 3** — Ualá y Naranja X (CVU), MODO (QR).
5. **Fase 4** — Ripio: recepción de stablecoins, off-ramp a ARS.
6. **Fase 5** — Suscripciones tiered por GMV + facturación.
7. **Fase 6** — Reportes, exportación contable, hardening y auditoría.
