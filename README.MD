# plata-neta

SaaS multi-tenant para comercios argentinos: **cobros y pagos directos por
transferencia** a través de Mercado Pago, MODO, Ualá, Naranja X y stablecoins
vía Ripio — todo detrás de una sola plataforma.

**Modelo de negocio:** suscripción mensual por tiers, escalonada según el
volumen de ventas mensual (GMV) de cada comercio. Sin % por transacción.

**Posicionamiento:** orquestador SaaS (categoría Yuno/Primer/Qobra), no PSP —
los fondos viajan por los rieles de los PSPs directo a las cuentas del
comercio; plata-neta nunca custodia dinero.

## Stack

- **Monorepo** pnpm + Turborepo
- **Next.js + TypeScript** (App Router, strict)
- **PostgreSQL + Prisma** (montos en centavos `BigInt`, nunca float)
- **Auth**: Auth.js v5 credentials (scrypt nativo, JWT, roles por tenant)

## Estructura

```
apps/
  web/   # Dashboard del comercio — http://localhost:3500
  api/   # REST API + webhooks PSP — http://localhost:3001
packages/
  db/        # Prisma schema, migraciones, seed
  core/      # Money, máquina de estados TxStatus, errores de dominio
  providers/ # Interfaz PaymentProvider (MP, MODO, Ualá, Naranja X, Ripio)
```

## Requisitos

- Node ≥ 20, pnpm, Docker (para Postgres)

## Levantar la demo

```bash
# 1. Instalar dependencias
pnpm install

# 2. Crear env (valores sandbox incluidos en .env.example)
cp .env.example .env
#   y rellenar AUTH_SECRET: openssl rand -base64 32
cp .env apps/web/.env.local      # cada app lee su propio .env.local
cp .env apps/api/.env.local

# 3. Base de datos (Postgres en Docker, puerto 5433)
docker compose up -d db
pnpm db:push                     # crea el schema
pnpm db:seed                     # tenant + usuarios demo

# 4. Levantar todo
pnpm dev                         # web :3500 · api :3001
```

Comandos útiles: `pnpm lint` (typecheck), `pnpm test`, `pnpm build`,
`pnpm db:studio` (Prisma Studio), `pnpm db:migrate`.

## Credenciales de prueba (solo desarrollo/sandbox)

Tenant: **Comercio Demo** (plan starter, KYC verificado)

| Email | Password | Rol |
|---|---|---|
| `owner@demo.plata` | `demo1234` | OWNER |
| `operator@demo.plata` | `demo1234` | OPERATOR |
| `viewer@demo.plata` | `demo1234` | VIEWER |

> ⚠️ Estas credenciales son exclusivamente del seed local. No existen en
> producción ni deben reutilizarse ahí.

## Estado del proyecto — Fase 0 ✅

- [x] Monorepo + DB + auth + modelo Tenant/User
- [x] Webhook PSP: persiste eventos antes de procesar (`202`/`401`)
- [x] Money en enteros, máquina de estados, interfaz `PaymentProvider`
- [ ] **Fase 1**: ledger + adaptador Mercado Pago sandbox (cobro por
      transferencia + webhook `x-signature`)
- [ ] Fases 2–6: payouts MP, Ualá/Naranja X/MODO, Ripio, suscripciones,
      reportes

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
