# API Reference — :4500

Auth: `Authorization: Bearer sk_test_...` (API key por tenant).
`tenantId` SIEMPRE se deriva de la key — nunca del body.
Respuestas JSON; `amountCents`/`BigInt` serializan como string.

## API keys

```
POST /api/v1/api-keys          bootstrap inicial (header x-bootstrap-secret)
                               o autenticada para keys adicionales
```

## Credenciales PSP (cifradas AES-256-GCM)

```
POST /api/v1/credentials
  body: { provider, accessToken, webhookSecret?, baseUrl?,
          cvu?, cbu?, alias?, qrPayload?, ...extra }
  → 201 { id, provider } — el secreto nunca se devuelve
```

## Cobros

```
POST /api/v1/payment-intents
  body: { provider, amountCents, idempotencyKey, currency?, metadata? }
  → 201 { id, provider, status: PENDING, paymentDetails: {cvu, cbu,
        alias, qrCode, amount, reference} }
  → retry con mismo idempotencyKey → 200 { duplicated: true }
GET  /api/v1/payment-intents?provider=&status=&limit=
```

## Pagos

```
POST /api/v1/payouts   { provider, payeeRef, amountCents, idempotencyKey }
                       monto ≥ PAYOUT_APPROVAL_THRESHOLD → PENDING (espera aprobación)
POST /api/v1/payouts/:id/approve   solo OWNER, aprobador ≠ creador → PROCESSING
GET  /api/v1/payouts?status=
```

## Webhooks

```
POST /api/webhooks/:provider
  firma inválida → 401 (nunca persiste ni procesa)
  duplicado (provider,eventId) → 200 { duplicated: true }
  ok → 200 { queued: true } → BullMQ → processWebhook
```

## Reportes y conciliación

```
GET /api/v1/reconciliation          intents con ledger desbalanceado
GET /api/v1/reports/summary         GMV, counts por estado/provider
GET /api/v1/reports/export          CSV contable del período
GET /api/v1/subscription/preview    GMV acumulado + tier que aplicaría
```

## Errores

| Status | Significado |
|---|---|
| 400 | Body inválido / metadata anidada / falta campo |
| 401 | Sin key / key inválida / firma webhook inválida |
| 404 | Entidad inexistente **o de otro tenant** (mismo código — nunca filtra existencia) |
| 409 | Payout no-PENDING intentando aprobar |
| 422 | Sin credencial PSP cargada para ese provider |
| 429 | Rate limit (por IP+endpoint, ventana 60s) |

## Límites

- Body: 64KB máx
- `metadata`: objeto plano ≤20 keys, valores string ≤500 chars
- Rate limit: 10 req/min credentials/payouts, 30/min intents (approx)
