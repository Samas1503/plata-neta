# Guía de pendientes — plata-neta

Estado: MVP funcional completo (T0–T12 + hardening + equipo/auditoría + 65 tests).
Todo lo de abajo es lo que queda para producción. Orden sugerido top-down.

## 1. Cableado real de PSPs (bloqueante para cobros reales)

Los adaptadores generan instrucciones de cobro locales (CVU/alias/QR del
comercio) pero **no llaman las APIs reales**. Por cada PSP:

- **Mercado Pago** (`packages/providers/src/mercadopago/`): createIntent ya pega
  a `/v1/payments` — probar con access token sandbox real + webhook público
  (ngrok `→ :4500/api/webhooks/mercadopago`). Verificar manifest `x-signature`
  con un webhook real (MP incluye `data.id`, `request-id`, `ts`).
- **Ualá / Naranja X** (`createCvuAdapter`): reemplazar el intent local por la
  API real de cada uno. Necesita: docs de API (no públicas completas — pedir
  acceso comercial), credenciales sandbox, endpoints de status reales.
- **MODO**: QR PCT del comercio — necesita credenciales MODO comercios + docs
  del protocolo QR dinámico.
- **Ripio**: `createIntent` es solo depósito (address del comercio) — correcto
  por diseño (CNV). `getStatus` asume `/v1/deposits/{id}` — confirmar contra API
  real de Ripio.

## 2. Ejecución de payouts en producción

`payout.execute` simula en sandbox (`APP_ENV!=production` → `sandbox-*`). Para
producción hay que implementar `payout()` por provider (MP: API de transferencias
del comercio; CVU adapters: su API de envío). Hoy todos tiran
`PaymentFailedError` → el payout queda `FAILED` + ledger revertido. Decidir si
es el comportamiento deseado o si quedan `PROCESSING` para reintento manual.

## 3. Webhooks con URL pública

El flujo firma→persist→dedup→enqueue ya funciona; falta exponer
`api:4500/api/webhooks/:provider` públicamente (ngrok en dev, dominio en prod)
y registrar la URL en cada PSP + cargar los `*_WEBHOOK_SECRET`.

## 4. Facturación real de suscripciones

`subscription.bill` genera el `SubscriptionCycle` con `tierApplied` +
`amountCents` pero `invoicedAt` nunca se setea. Falta decidir cómo se cobra la
suscripción: factura descargable vs cargo automático vía el PSP del comercio.
El modelo de datos está listo — falta solo el acto de cobro + `invoicedAt`.

## 5. Tests pendientes

Hechos (65): core (money, estados, ledger), providers (firma MP), API (auth,
idempotencia, approve, dedup webhook, reports, credentials, api-keys,
reconciliation, subscription preview). Faltan:

- Procesadores de `packages/jobs` (executePayouts, processWebhook,
  expireIntents, reconcile, billSubscription) — necesitan prisma mockeado
  completo o una DB de test (docker tiene Postgres :5433 — `DATABASE_URL` de
  test + `prisma db push` a un schema `test`).
- Acciones de servidor del web (cobros/payouts/equipo/keys).
- E2E browser (Playwright) del flujo completo login→crear cobro.

## 6. Hardening restante

- CORS: la API hoy es accesible por cualquier origen con key válida — si se
  expone a terceros, whiteliste por tenant u `Origin` check.
- Body limit está aplicado a intents; extender `readJsonBody` a credentials/
  payouts/api-keys.
- `AuditLog` cubre keys/credentials/payouts — extender a login, cambios de
  rol, cambios de plan.
- Tenant status: `SUSPENDED`/`ONBOARDING` existen pero nadie los lee — decidir
  si un tenant suspendido puede cobrar (hoy sí).

## 7. Features sin construir (fuera del MVP)

- Importación de extracto PSP en conciliación (hoy solo compara interno).
- KYC/onboarding del comercio (`KycStatus` siempre PENDING).
- Facturación formal (CBU/factura C) si el modelo lo requiere.
- SDK público / docs de API para integradores.
- Portal de onboarding del comercio (conectar credenciales desde UI — hoy solo
  vía API POST /credentials).

## Cómo retomar

```bash
docker compose up -d db redis && pnpm db:seed && pnpm dev
# web :3500 · api :4500 · worker BullMQ (auto-schedulers)
# Bootstrap API key: POST :4500/api/v1/api-keys + x-bootstrap-secret
```

Gates legales (RULES.MD §8) antes de producción: opinión BCRA sobre
"aceptación" 1.4.3 + opinión CNV sobre PSAV/Ripio.
