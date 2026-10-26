# Arquitectura — plata-neta

## Capas

```
Cliente ──> apps/api (Next.js :4500) ──> PostgreSQL (Prisma)
                 │                          ▲
                 └──> BullMQ ──> Redis ──> worker (packages/jobs)
                       procesa webhooks, expira intents,
                       ejecuta payouts, factura suscripciones
Dashboard (apps/web :3500) ──> Prisma directo + Auth.js
```

## Modelo de datos (Prisma)

| Entidad | Rol |
|---|---|
| `Tenant` | Comercio. `slug`, `status`, `planId`. Todo cuelga de `tenantId`. |
| `User` | Usuario del comercio. `role`: OWNER/OPERATOR/VIEWER. |
| `Plan` | Tier de suscripción por GMV mensual. |
| `ApiKey` | Key Bearer por tenant — solo hash SHA-256 en DB. |
| `PspCredential` | Credenciales del PSP del comercio — `encryptedKeys` (AES-256-GCM). |
| `PaymentIntent` | Cobro. `idempotencyKey`, `provider`, `amountCents`, `expiresAt`. |
| `Payout` | Pago saliente. Aprobación en dos pasos (umbral). |
| `LedgerEntry` | Asientos double-entry: `pending`/`available`/`clearing`. |
| `WebhookEvent` | Eventos firmados, dedup `(provider, eventId)`. |
| `AuditLog` | Quién hizo qué: user o apiKey, acción, entidad. |
| `SubscriptionCycle` | Snapshot mensual GMV → tier → monto facturado. |

## Flujo de dinero (cobro)

1. `POST /payment-intents` → intent PENDING + asientos ledger (`pending`/`-clearing`)
2. PSP/webhook confirma → SUCCEEDED + (`available`/`pending`)
3. Falla/expira → FAILED/EXPIRED + liberación (`clearing`/`pending`)
4. `payout.execute` resuelve payouts: aprobados → SUCCEEDED; falla → FAILED + reverso

## Reglas duras (RULES.MD)

- Montos en centavos `BigInt` — nunca float
- `idempotencyKey` única por tenant en intents y payouts
- `tenantId` siempre de la auth (API key o sesión) — nunca del body
- plata-neta nunca custodia fondos ni emite QR/CVU propios
- Webhook: verificar firma ANTES de procesar; inválida → 401
