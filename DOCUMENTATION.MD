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
Tenant ─┬─ User (role: OWNER | OPERATOR | VIEWER)
        ├─ ApiKey (prefix sk_test_/sk_live_, keyHash sha256 — nunca en claro)
        ├─ Plan (tier, gmv_threshold, monthly_price)
        ├─ PspCredential (provider, encrypted_keys — AES-256-GCM)
        ├─ PaymentIntent (amount_cents, currency, provider, status, idempotency_key, expires_at)
        ├─ Payout (payee_ref, amount_cents, provider, status, created_by, approved_by)
        ├─ LedgerEntry (account, debit/credit, ref_id — net = debit - credit)
        ├─ WebhookEvent (provider, event_id, payload, signature_valid, processed_at)
        ├─ AuditLog (action, entity, entity_id, actor userId|apiKeyId)
        └─ SubscriptionCycle (period, gmv_snapshot, tier_applied, invoiced_at)
```

Montos: centavos `BigInt`. Respuestas API serializan BigInt→string (`apps/api/src/lib/json.ts`).

## Variables de entorno (.env.example — borrador)

```bash
# App
DATABASE_URL=postgresql://plata:plata@localhost:5433/plata_neta
REDIS_URL=redis://localhost:6379
APP_ENV=sandbox                    # sandbox | production
AUTH_URL=http://localhost:3500
AUTH_SECRET=                       # openssl rand -base64 32
ENCRYPTION_KEY=                    # base64 AES-256-GCM (32 bytes)

# API auth + bootstrap
BOOTSTRAP_SECRET=                  # crea la PRIMERA API key por tenant
PAYOUT_APPROVAL_THRESHOLD=10000000 # centavos — sobre esto requiere 2 pasos
INTENT_EXPIRES_MINUTES=60          # TTL de intents PENDING

# Webhooks PSP (HMAC secrets por provider)
MP_WEBHOOK_SECRET=
MODO_WEBHOOK_SECRET=
UALA_WEBHOOK_SECRET=
NARANJAX_WEBHOOK_SECRET=
RIPIO_WEBHOOK_SECRET=

# Mercado Pago (base URL para mock en tests)
MP_API_BASE_URL=https://api.mercadopago.com
```

Nota: Next lee env por app — cada app necesita su `.env.local`.

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
| 2026-10-21 | Env por app: cada app lee `.env.local` propio | Convención adoptada |
| 2026-10-21 | Auth de API: **API keys por tenant** (`sk_test_`/`sk_live_`, sha256 hash, secreto mostrado una vez); tenantId siempre deriva de la key, nunca del body | Aceptado (T0) |
| 2026-10-21 | Cola de jobs: **BullMQ + Redis** (`packages/jobs`, worker dedicado) — webhook.process, intent.expire, payout.execute, reconcile.run, subscription.bill | Aceptado (T0) |
| 2026-10-21 | Ejecución de payouts: job `payout.execute` (sweep */2min) — ledger Sent + adapter.payout; sandbox simula ejecución; falla → FAILED + reverso a available | Aceptado |
| 2026-10-21 | Adaptadores Ualá/NX/MODO via factory `createCvuAdapter` — instrucciones con CVU/alias/QR del comercio (no llamadas reales aún); Ripio recepción-only | Aceptado (skeletons) |

## Estado de implementación (2026-10-21)

Implementado y verificado end-to-end (smoke: key→credencial→intent→payout→conciliación→CSV):

- **Fase 0** ✅ — Monorepo, Postgres :5433, Auth.js credentials, Tenant/User.
- **Fase 1** ✅ — Ledger doble entrada, PaymentIntent idempotente, adapter MP
  (createIntent/getStatus/x-signature/parseWebhook), credenciales cifradas, webhook.
- **Fase 2** ✅ — Payouts con aprobación 2 pasos (≠ creador, sobre umbral) + job
  payout.execute + conciliación intent↔ledger (`/api/v1/reconciliation`).
- **Fase 3** ✅ skeletons — Ualá/NX/MODO generan instrucciones con datos del comercio;
  pendiente cablear APIs reales.
- **Fase 4** ✅ skeleton — Ripio recepción-only (network/asset validados, payout=error).
- **Fase 5** ✅ — Planes seeded, job subscription.bill (GMV→tier→ciclo idempotente),
  `/api/v1/subscription/preview`, `/dashboard/plan`. Pendiente: invoicedAt/factura real.
- **Fase 6** ✅ — reports/summary + export CSV, AuditLog + /dashboard/auditoria,
  security headers, sanitizeMetadata, rate limiting Redis.
- **Transversal** — API keys auth en toda la API, webhook dedup por eventId,
  expiresAt en intents, gestión de equipo (invitar/roles), nav compartida.

Pendiente (externo): docs reales de APIs Ualá/NX/MODO/Ripio, credenciales
sandbox, webhook público, tests de rutas API/jobs, invoicedAt, gates BCRA/CNV.
