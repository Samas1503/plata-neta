# Reglas — plata-neta

Reglas obligatorias del proyecto. Aplican a humanos y agentes de IA por igual.
Violar una regla marcada como 🔴 bloquea el merge.

## 1. Dinero y transacciones

- 🔴 **Montos en enteros**: siempre en la menor unidad (centavos ARS, unidades
  mínimas de stablecoin) usando `bigint` o `Decimal`. Prohibido `number`/`float`
  para dinero.
- 🔴 **Idempotencia**: todo endpoint que cree/cobre/pague acepta
  `Idempotency-Key` y persiste el resultado. Reintentos devuelven el mismo
  resultado, nunca duplican.
- 🔴 **Ledger de doble entrada**: ningún movimiento de fondos existe sin su
  asiento contable (débito + crédito). El saldo se deriva del ledger, nunca se
  guarda como fuente de verdad mutable.
- 🔴 **Máquina de estados explícita**: `pending → processing → succeeded | failed
  | reversed | expired`. Las transiciones solo ocurren vía funciones dedicadas
  en `packages/core`.
- Las operaciones irreversibles (payout ejecutado, off-ramp cripto) requieren
  confirmación y registro de auditoría (`who`, `when`, `why`).

## 2. Seguridad

- 🔴 **Cero secretos en el repo**: credenciales de PSP, claves API y claves
  privadas viven en variables de entorno. `.env*` real está gitignored;
  `.env.example` solo con placeholders.
- 🔴 **Verificación de webhooks**: toda notificación de PSP se valida por
  firma/secret antes de procesar. Webhook inválido → `401`, nunca procesar.
- 🔴 **No loguear datos sensibles**: tokens, CVU completos, claves, payloads
  con PII. Enmascarar (`****1234`).
- Webhooks responden `200` únicamente después de persistir el evento en BD
  (procesamiento posterior asíncrono).
- Rate limiting en endpoints públicos y webhooks.
- KYC/KYB del comercio obligatorio antes de habilitar cobros reales.
- HTTPS obligatorio; secrets rotables sin deploy.

## 3. Multi-tenant

- 🔴 Toda entidad de negocio lleva `tenantId`. Ninguna query cruza tenants sin
  filtro explícito y autorización.
- Las credenciales PSP son por comercio (o por cuenta central, según diseño
  documentado en `DOCUMENTATION.MD`) y se cifran en reposo.

## 4. Código

- TypeScript estricto (`strict: true`). Prohibido `any` sin justificación en
  comentario; preferir `unknown` + narrowing.
- Idioma: **código en inglés** (nombres, comentarios, commits);
  documentación de dominio en **español**.
- Commits: conventional commits (`feat:`, `fix:`, `chore:`…), foco en el "por qué".
- Funciones pequeñas y puras para lógica de dominio (`packages/core` no depende
  de frameworks ni de PSPs concretos).
- Adaptadores PSP: cada proveedor implementa la interfaz `PaymentProvider`
  definida en `packages/providers` (crear al implementar). La lógica de negocio
  nunca llama SDKs de PSP directamente.
- Errores de dominio tipados (`PaymentFailedError`, `InsufficientFundsError`…),
  nunca `throw new Error("string")` en lógica de dinero.

## 5. Ambientes

- `sandbox` es el ambiente por defecto en desarrollo y tests. Nunca llamar
  endpoints productivos de PSP sin `NODE_ENV=production` + credenciales
  productivas.
- Tests que tocan PSPs usan mocks/stubs del adaptador; tests de integración
  contra sandboxes reales quedan marcados y fuera del CI rápido.

## 6. Testing

- Mínimo para lógica de dinero: happy path, duplicado por idempotency-key,
  webhook con firma inválida, timeout de PSP, conciliación con discrepancia.
- Nombres de test descriptivos: `it("rejects webhook with invalid signature")`.

## 7. Cripto (Ripio / stablecoins)

- 🔴 Validar red y dirección antes de cada operación (USDT en TRC-20 ≠ ERC-20).
- Registrar `txHash` como referencia inmutable de cada movimiento on-chain.
- Cotización fiat↔cripto con timestamp y fuente; nunca hardcodear tasas.
- Tolerancia de confirmaciones: un cobro cripto pasa a `succeeded` solo tras
  N confirmaciones de red configurables.

## 8. Regulatorio (BCRA / CNV) — resultado del debate `psp-boundary`

Postura: plata-neta es **orquestador SaaS**, no PSP ni PSAV. La defensa real es
arquitectónica (imposibilidad estructural de cumplir la función), no declarativa.

**Fiat (BCRA — función "aceptación", TO PSP 1.4.3 / A 7769):**

- 🔴 Operar solo con credenciales/cuentas del **propio comercio**
  (`PspCredential`). Nunca adherir comercios al esquema, emitir QR/IDs de
  comercio propios, ni recibir liquidación con ID propio (evita aceptación
  1.4.3 y agregación 1.4.8).
- 🔴 No capturar credenciales del **pagador** (eso sería "iniciación" 1.4.4).
- El checkout es del comercio con el PSP visible como procesador; plata-neta no
  pone su marca frente al pagador como prestatario del cobro.
- 🔴 **Gate pre-lanzamiento**: consulta formal a SEFyC con el diagrama de flujo
  + opinión legal de estudio con práctica BCRA. Respuesta adversa → rediseño
  (conector en el entorno del comercio / SDK self-hosted) o registro.

**Cripto (CNV — PSAV, RG 994/2024 + 1058/2025, texto consolidado RG 1172/2026):**

- 🔴 **Cero disposición**: credenciales Ripio con scope máximo "crear intent +
  leer estado". plata-neta **nunca llama endpoints de movimiento** (ni siquiera
  a destinos whitelisteados) — una key con poder de iniciar movimientos es
  "instrumento que permite el control" (Cat. 4).
- Retiros/off-ramps = standing instruction del comercio configurada en Ripio;
  conversión VA→ARS y liquidación al banco del comercio las ejecuta Ripio.
- 🔴 Prohibido: cuenta ómnibus, addresses propias o controladas por plata-neta,
  netting/fees sobre el flujo VA.
- **Payouts cripto a wallets de terceros: fuera del MVP** (riesgo Cat. 3).
- Marco contractual: exclusión art. 2° inc. iv (software sin disposición) +
  preferentemente convenio con Ripio como **tercero tecnológico delegado del
  registrado** (delegación RG 1058). Nunca invocar "mandato del comercio" como
  defensa PSAV — "en nombre de otra persona" es el disparador del tipo.
- 🔴 **Gate del riel cripto**: opinión legal sobre Cat. 4 antes de activarlo.

**Drift de producto**: cualquier feature futuro que emita IDs propios, toque
liquidación, custodie AV o ponga la marca frente al pagador **reabre el
análisis regulatorio** — revisar esta sección antes de implementarlo.
