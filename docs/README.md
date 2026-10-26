# Documentación — plata-neta

SaaS multi-tenant de orquestación de pagos para comercios argentinos.
Los comercios cobran y pagan **directo a sus propias cuentas** (CVU/CBU/alias),
plata-neta nunca custodia fondos.

## Índice

| Doc | Contenido |
|---|---|
| [ARQUITECTURA.md](ARQUITECTURA.md) | Sistema, capas, modelo de datos, flujos de dinero y ledger |
| [BILLETERAS.md](BILLETERAS.md) | **Guía de integración por billetera/banco** — los 17 providers, cómo agregar credenciales, cómo cablear cada API real |
| [API.md](API.md) | Referencia completa de endpoints, auth, errores |
| [SEGURIDAD.md](SEGURIDAD.md) | Modelo de amenazas, cifrado, webhooks, auditoría, hardening |

## Quickstart

```bash
docker compose up -d db redis
pnpm install && pnpm db:push && pnpm db:seed
pnpm dev        # web :3500 · api :4500 · worker BullMQ
```

Login demo: `owner@demo.plata` / `demo1234` — tenant `comercio-demo`.

## Regla de oro (RULES.MD §8)

plata-neta es **capa de orquestación, no PSP**: el comercio conecta SUS
credenciales y SUS cuentas. Nunca emitimos QR/CVU propios ni liquidamos
fondos bajo identificador de plata-neta. Esto es lo que habilita el
modelo 0%: transferencia directa comercio↔pagador.
