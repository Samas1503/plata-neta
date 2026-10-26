# Seguridad — plata-neta

## Modelo de amenazas

| Actor | Puede intentar | Defensa |
|---|---|---|
| Cualquiera en internet | replay de webhook, minteo de API keys, brute force login | firma obligatoria (401 antes de persistir) + ts ±5min; bootstrap rate-limited + constant-time + solo cuando 0 keys; throttle login 5/min |
| Tenant malicioso (key válida) | acceder a otro tenant, SSRF, spoofear estado de pago, escalar aprobaciones | tenantId siempre de la key; `baseUrl` no viaja a adapters; aprobación exige key/creador distintos |
| VIEWER/OPERATOR | escribir fuera de su rol | requireRole en cada server action; role se re-lee de DB cada request (JWT no stale) |
| Interno con DB acceso | leer credenciales PSP | `PspCredential.encryptedKeys` AES-256-GCM; API keys solo hash SHA-256 |

## Criptografía

- **Credenciales PSP**: `encryptJson`/`decryptJson` en `packages/db/src/crypto.ts` — AES-256-GCM, IV aleatorio 96-bit por mensaje, auth tag obligatorio, key base64 32B (`ENCRYPTION_KEY`).
- **API keys**: `sk_test_`/`sk_live_` + random 24B; DB guarda solo `sha256(key)`; secreto mostrado una vez (nunca por URL).
- **Passwords**: scrypt + salt (`lib/password.ts`, verificación `timingSafeEqual`).
- **Webhooks**: HMAC-SHA256 por provider con `timingSafeEqual`; MP además valida `ts` fresco (±5min anti-replay). Firmas inválidas → 401 antes de persistir.

## Hard boundaries

- `tenantId` SIEMPRE de la auth — nunca del body ni query.
- Separación de funciones en payouts: `createdByUserId`/`createdByKeyId` ≠ `approvedById`.
- Idempotencia: unique `(tenantId, idempotencyKey)` en intents y payouts; `@@unique(provider, eventId)` en webhooks → dedup por constraint, no por chequeo.
- Transiciones de estado atómicas (`updateMany` + count check) — dos jobs no pueden acreditar el mismo cobro.
- Webhooks procesan solo si `signatureValid === true`; el processor re-consulta `getStatus` al PSP — el payload no decide el estado.
- Ledger double-entry: `pending`/`available`/`clearing` — reversal siempre compensatorio.

## Hardering aplicado (auditoría run-1)

15 hallazgos fixeados — ver [AUDITORIA-SEGURIDAD.md](AUDITORIA-SEGURIDAD.md):
SSRF por `baseUrl`, eco de body upstream, bootstrap sin rate limit, key en URL,
replay de webhooks + doble crédito, payload mal parseado en processor, VIEWER
escribiendo cobros, JWT con role stale, secrets parciales en claves Redis.

## Pendientes conocidos (design gaps)

- `webhookSecret` por-tenant se guarda pero no se usa — la firma se verifica
  contra el env global del PSP (válido para plataforma-propia; PSPs con secret
  por-merchant necesitan lookup por tenant).
- `executePayouts`: fallo entre `provider.payout()` y `payout.update` puede
  dejar ledger y realidad divergentes — mitigar con reconciliación externa.
- Login throttle es in-memory (por proceso) — para multi-replica usar Redis.

## Auditorías

- `run-1` (2026-10): security-audit skill, profile quick, scope completo —
  `~/security-audit-skill/plata-neta/run-1/`
