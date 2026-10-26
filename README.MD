# plata-neta

SaaS multi-tenant para comercios argentinos: **cobros y pagos directos por
transferencia** a través de 17 proveedores — billeteras (Mercado Pago, MODO,
Ualá, Naranja X, Brubank, Personal Pay, Cuenta DNI, Prex, BNA+), bancos
(Galicia, Santander, BBVA, Macro, Nación, Provincia, Credicoop) y stablecoins
vía Ripio — todo al 0% por transferencia CVU/CBU/alias, detrás de una sola plataforma.

**Modelo de negocio:** suscripción mensual por tiers, escalonada según el
volumen de ventas mensual (GMV) de cada comercio. Sin % por transacción.

**Posicionamiento:** orquestador SaaS (categoría Yuno/Primer/Qobra), no PSP —
los fondos viajan por los rieles de los PSPs directo a las cuentas del
comercio; plata-neta nunca custodia dinero.

## Stack

- **Monorepo** pnpm + Turborepo
- **Next.js + TypeScript** (App Router, strict)
- **PostgreSQL + Prisma** (montos en centavos `BigInt`, nunca float)
- **BullMQ + Redis** (cola de jobs: webhooks, expiración, conciliación, billing)
- **Auth**: Auth.js v5 credentials (scrypt nativo, JWT, roles por tenant)

## Estructura

```
apps/
  web/   # Dashboard del comercio — http://localhost:3500
  api/   # REST API + webhooks PSP — http://localhost:4500
packages/
  db/        # Prisma schema, migraciones, seed
  core/      # Money, máquina de estados TxStatus, errores de dominio
  providers/ # PaymentProvider — 17 adaptadores (billeteras + bancos + Ripio)
  jobs/      # Worker BullMQ: webhook.process, intent.expire, reconcile.run,
             # subscription.bill (schedulers incluidos)
```

## Requisitos

- Node ≥ 20, pnpm, Docker (Postgres + Redis)

## Levantar la demo

```bash
# 1. Instalar dependencias
pnpm install

# 2. Crear env (valores sandbox incluidos en .env.example)
cp .env.example .env
#   y rellenar AUTH_SECRET: openssl rand -base64 32
cp .env apps/web/.env.local      # cada app lee su propio .env.local
cp .env apps/api/.env.local

# 3. Infra (Postgres :5433 + Redis :6379 en Docker)
docker compose up -d db redis
pnpm db:push                     # crea el schema
pnpm db:seed                     # tenant + usuarios demo

# 4. Levantar todo
pnpm dev                         # turbo: web :3500 · api :4500 · worker de jobs
# o el worker por separado:
pnpm --filter @plata-neta/jobs dev
```

Comandos útiles: `pnpm lint` (typecheck), `pnpm test`, `pnpm build`,
`pnpm db:studio` (Prisma Studio), `pnpm db:migrate`.

## Demo visual

`pnpm db:seed` carga además **datos demo**: 15 cobros en todos los estados
across 4 providers, 4 payouts (1 esperando aprobación), 1 ciclo de
suscripción y eventos de auditoría — todo con ledger consistente.

```bash
pnpm --filter @plata-neta/jobs demo   # simulador: cobros vivos +
                                    # payouts que el worker ejecuta
```

El simulador crea cobros que transicionan PENDING→PROCESSING→SUCCEEDED
con asientos reales del ledger, y payouts bajo umbral que `payout.execute`
resuelve a SUCCEEDED. Recargá el dashboard para verlos moverse.

## Credenciales de prueba (solo desarrollo/sandbox)

Tenant: **Comercio Demo** (plan starter, KYC verificado)

| Email | Password | Rol |
|---|---|---|
| `owner@demo.plata` | `demo1234` | OWNER |
| `operator@demo.plata` | `demo1234` | OPERATOR |
| `viewer@demo.plata` | `demo1234` | VIEWER |

> ⚠️ Estas credenciales son exclusivamente del seed local. No existen en
> producción ni deben reutilizarse ahí.

## Variables de entorno

Además de `DATABASE_URL` y `AUTH_SECRET` (lista completa en `.env.example`):

| Var | Uso |
|---|---|
| `REDIS_URL` | Cola BullMQ (`redis://localhost:6379`) |
| `BOOTSTRAP_SECRET` | Crea la **primera** API key por tenant (dev only) |
| `PAYOUT_APPROVAL_THRESHOLD` | Umbral en centavos para aprobación en dos pasos de payouts (default `10000000`) |
| `INTENT_EXPIRES_MINUTES` | TTL de intents PENDING → EXPIRED por sweep (default `60`) |
| `MP_WEBHOOK_SECRET`, `MODO_WEBHOOK_SECRET`, `UALA_WEBHOOK_SECRET`, `NARANJAX_WEBHOOK_SECRET`, `RIPIO_WEBHOOK_SECRET` | Verificación de firma de webhooks, uno por PSP |

## API keys y auth de la API

La API REST (`:4500`) autentica con `Authorization: Bearer sk_test_...`
(`sk_live_` en producción). La primera key de cada tenant se crea con el
bootstrap secret — **solo si el tenant aún no tiene keys**:

```bash
curl -X POST http://localhost:4500/api/v1/api-keys \
  -H "x-bootstrap-secret: $BOOTSTRAP_SECRET" \
  -H "content-type: application/json" \
  -d '{"tenantId": "<cuid-del-tenant>", "name": "default"}'
```

`tenantId` = cuid del tenant **Comercio Demo** del seed (se obtiene desde
el dashboard o con `pnpm db:studio`). La respuesta devuelve el secreto una
sola vez; las keys siguientes se crean autenticado con una key válida.

## API REST — endpoints

Todos bajo `/api/v1`, auth `Bearer sk_*` salvo webhooks:

| Endpoint | Descripción |
|---|---|
| `GET/POST /payment-intents` | Crear y listar intents de cobro |
| `GET/POST /payouts` · `POST /payouts/:id/approve` | Payouts; aprobación en dos pasos sobre `PAYOUT_APPROVAL_THRESHOLD` |
| `GET/POST /api-keys` · `DELETE /api-keys/:id` | Gestión de API keys |
| `GET /reconciliation` | Desajustes entre intents y ledger |
| `GET /subscription/preview` | Preview del tier/facturación por GMV |
| `GET /reports/summary` · `GET /reports/export` | Reporte agregado y export CSV |
| `POST /credentials` | Cargar credenciales PSP del comercio (AES-256-GCM) |
| `POST /webhooks/:provider` | Webhooks PSP: firma → persistir → procesar async |

## Dashboard

`apps/web` (`:3500`) con nav compartida: `/dashboard` (home),
`/dashboard/cobros` (+`/nuevo`, +`/[id]`), `/dashboard/payouts`,
`/dashboard/reconciliation`, `/dashboard/plan`, `/dashboard/reportes`,
`/dashboard/keys`, `/dashboard/equipo` (invitar usuarios, roles — solo OWNER),
`/dashboard/auditoria` (registro de acciones).

## Estado del proyecto — Fases 0–6 ✅

- [x] Monorepo + DB + auth + modelo Tenant/User
- [x] Webhook PSP: persiste eventos antes de procesar (`202`/`401`)
- [x] Money en enteros, máquina de estados, interfaz `PaymentProvider`
- [x] **Fase 1**: ledger + adaptador Mercado Pago (cobro por
      transferencia + webhook `x-signature`)
- [x] **Fase 2**: payouts MP + conciliación (`reconcile.run`, `/reconciliation`)
- [x] **Fase 3**: Ualá y Naranja X (CVU) + MODO (adaptadores + webhooks firmados)
- [x] **Fase 4**: Ripio — recepción de stablecoins (payouts cripto fuera del MVP)
- [x] **Fase 5**: suscripciones tiered por GMV + facturación de ciclo
      (`subscription.bill`)
- [x] **Fase 6**: reportes + export CSV + auditoría + API keys
- [x] **Hardening**: security headers, `sanitizeMetadata`, body limit 64KB,
      rate limiting Redis, webhook dedup por eventId, serialización BigInt→string
- [x] **Jobs recurrentes** (BullMQ): `webhook.process`, `intent.expire`,
      `payout.execute` (sweep */2min — sandbox simula PSP; falla → FAILED +
      reverso a available), `reconcile.run` */15m, `subscription.bill` 1ro/mes
- [x] **Equipo**: invitar usuarios OPERATOR/VIEWER, cambio de roles (OWNER,
      anti auto-cambio); intents con `expiresAt` real

## Marco legal (resultado de los debates `business-model` y `psp-boundary`)

Análisis multi-agente con evidencia normativa (síntesis completa en
`.context/work/*/debate/synthesis.md`). Estado: **pre-launch pendiente de
opinión legal formal**.

### ¿Qué es plata-neta legalmente?

- **Orquestador SaaS**, no PSP: los fondos viajan por los rieles de los PSPs
  registrados directo a las cuentas del comercio. Comparables: Yuno, Primer,
  Qobra (AR, no registrada), Rebill, LimePay.
- **MODO es un riel proveedor**, no un modelo espejo ni competidor: Play
  Digital S.A. está registrada como PSP en el BCRA (Com. "C" 93224) — cobra
  comisión por pago PCT aprobado; plata-neta cobra suscripción flat.

### BCRA — función "aceptación" (TO PSP 1.4.3 / Com. "A" 7769)

- La norma es **genuinamente indeterminada** para orquestadores con
  credenciales del comercio: lectura literal ("adherir comercios" = rol de
  participante del esquema) vs. lectura por tareas (facilitar/transmitir/
  confirmar — que el backend ejecuta). El redline de A 7769 eliminó los
  requisitos contractuales → no hay respuesta única por texto.
- **Conclusión**: diseño con imposibilidad estructural de cumplir la función +
  **consulta formal a SEFyC y opinión legal como gate pre-lanzamiento**.
  Registrarse "por las dudas" quedó descartado (DDJJ inexacta = infracción).
- Reglas 🔴: solo credenciales/cuentas del comercio (`PspCredential`); nunca
  adherir comercios al esquema, emitir QR/IDs propios ni recibir liquidación
  con ID propio (evita aceptación 1.4.3 y agregación 1.4.8); nunca capturar
  credenciales del pagador (iniciación 1.4.4); marca del comercio frente al
  pagador, nunca la propia.
- Fallback acordado si la consulta es adversa: conector ejecutado en el
  entorno del comercio (SDK/self-hosted) o registro PSP.

### CNV — PSAV (RG 994/2024 + 1058/2025, consolidado RG 1172/2026)

- El riel Ripio queda **fuera de PSAV si y solo si plata-neta no puede
  disponer de los activos**: el comercio está excluido (art. 2° ii) y Ripio
  ya es PSAV N° 36 (todas las categorías).
- Reglas 🔴: credenciales con scope "crear intent + leer estado" — **nunca
  llamar endpoints de movimiento** (key con poder de iniciar = "instrumento
  que permite el control", Cat. 4); off-ramp = standing instruction del
  comercio en Ripio; payouts cripto **fuera del MVP** (Cat. 3); jamás cuenta
  ómnibus/addresses propias/netting de fees sobre flujo VA.
- Encuadre contractual: exclusión art. 2° iv (software sin disposición) +
  preferentemente **delegación de Ripio bajo RG 1058**. Nunca defenderse como
  "mandatario" — "en nombre de otra persona" es el disparador del tipo.
- Gate antes de activar el riel cripto: opinión legal sobre Cat. 4.

### Reglas técnicas de dinero (RULES.MD §1-2)

- Montos en centavos enteros (`BigInt`); idempotencia en toda operación;
  ledger de doble entrada como fuente de verdad.
- Webhooks: verificar firma antes de procesar; `200` solo tras persistir.

## Documentos de contexto

| Archivo | Contenido |
|---|---|
| `GLOSARY.MD` | Terminología de dominio (CVU, PCT, PSP, ledger…) |
| `RULES.MD` | Reglas obligatorias: dinero, seguridad, regulatorio |
| `AGENTS.MD` | Contexto para agentes IA y contribuidores |
| `MODELS.MD` | Asignación de modelos IA por tarea |
| `DOCUMENTATION.MD` | Arquitectura, módulos, integraciones, ADRs, roadmap |
