# Agentes — plata-neta

Contexto operativo para agentes de IA (Devin, Codex, etc.) que trabajen en este repositorio.

## Qué es plata-neta

SaaS multi-tenant que permite a **comercios argentinos** de distinta envergadura
realizar **cobros y pagos directos** mediante transferencias de billeteras virtuales
y stablecoins.

- **Modelo de negocio**: suscripción mensual por tiers, escalonada según el volumen
  de ventas (GMV) del comercio.
- **Proveedores de pago**: Mercado Pago (principal), MODO, Ualá, Naranja X.
- **Riel cripto**: Ripio para recibir stablecoins (USDT/USDC) desde monedas
  extranjeras y liquidar en ARS.

## Stack

- **Next.js + TypeScript** (App Router) — monorepo con pnpm + Turborepo.
- Base de datos: PostgreSQL + Prisma (propuesto).
- Auth: mejor opción evaluada al iniciar implementación (documentar decisión en `DOCUMENTATION.MD`).
- SDKs PSP: `mercadopago` (Node SDK oficial), APIs REST de MODO/Ualá/Naranja X/Ripio.

## Estructura del monorepo (convención)

```
apps/
  web/          # Dashboard del comercio (Next.js)
  api/          # API + webhooks de PSPs (Next.js API routes o servicio separado)
packages/
  db/           # Prisma schema, migraciones, cliente
  core/         # Dominio: ledger, money, estados de transacción
  providers/    # Adaptadores PSP: mercadopago, modo, uala, naranjax, ripio
  config/       # ESLint, TS config, env schemas compartidos
  ui/           # Componentes compartidos
```

## Documentos de contexto (leer siempre primero)

| Archivo | Contenido |
|---|---|
| `GLOSARY.MD` | Terminología de dominio. Usar estos términos en código y docs. |
| `RULES.MD` | Reglas obligatorias: seguridad, manejo de dinero, estilo. |
| `MODELS.MD` | Asignación de modelos IA por tipo de tarea. |
| `DOCUMENTATION.MD` | Arquitectura, módulos, integraciones y decisiones técnicas. |

## Instrucciones para agentes

1. **Nunca** commitear credenciales, access tokens ni archivos `.env`. Los secrets
   van en `.env.local` (gitignored) y se documentan como placeholders en `.env.example`.
2. Todo monto de dinero en **centavos enteros** (`bigint`/`Decimal`), jamás `float`.
3. Toda operación de dinero debe ser **idempotente** (`idempotency-key` obligatorio).
4. Todo webhook de PSP debe **verificar firma** antes de procesar y responder `200`
   solo tras persistir el evento.
5. Antes de crear código nuevo, revisar si existe un adaptador/patrón equivalente
   en `packages/providers` o `packages/core` y reutilizarlo.
6. Los cambios que muevan dinero requieren tests (happy path + al menos un caso de
   fallo: timeout, duplicado, firma inválida).
7. Código y comentarios en **inglés**; documentación de dominio y conversación con
   el usuario en **español**.
8. No implementar lógica financiera real sin flags de ambiente: `sandbox` por
   defecto, `production` solo con credenciales productivas verificadas.

## Comandos (una vez inicializado el proyecto)

```bash
pnpm install          # instalar dependencias
pnpm dev              # levantar apps en dev
pnpm build            # build de todos los paquetes
pnpm test             # tests
pnpm lint             # lint + typecheck
pnpm db:migrate       # migraciones Prisma
```
