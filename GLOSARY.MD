# Glosario — plata-neta

Terminología de dominio del proyecto. Todos los agentes y contribuidores deben usar
estos términos de forma consistente en código, documentación y conversaciones.

## Dominio del negocio

| Término | Definición |
|---|---|
| **Comercio (Merchant)** | Cliente del SaaS que usa la plataforma para cobrar y pagar. Entidad raíz del multi-tenant. |
| **Tenant** | Instancia lógica aislada de un comercio. Toda entidad de negocio pertenece a un tenant. |
| **Plan / Tier** | Nivel de suscripción mensual del comercio, determinado por su volumen de ventas. |
| **Volumen de ventas (GMV)** | Monto total bruto procesado por el comercio en un período (mensual). Define el tier de suscripción. |
| **Suscripción** | Contrato mensual del comercio con plata-neta. Se factura por adelantado según el tier vigente. |
| **Cobro (Payment/Collection)** | Dinero que el comercio recibe de un pagador final a través de la plataforma. |
| **Pago (Payout)** | Dinero que el comercio envía (a proveedores, empleados, retiros a su cuenta). |
| **Pagador (Payer)** | Persona o entidad que origina un cobro hacia el comercio. |
| **Beneficiario (Payee)** | Destinatario de un payout. |

## Pagos y transferencias (Argentina)

| Término | Definición |
|---|---|
| **CVU** | Clave Virtual Uniforme: identificador de cuenta en billeteras virtuales (equivalente a CBU bancario). |
| **Alias** | Nombre legible asociado a un CVU/CBU (ej. `comercio.plata.mp`). |
| **Transferencia 3.0** | Esquema argentino de pagos con QR interoperable entre bancos y billeteras. |
| **PSP** | Payment Service Provider: proveedor de servicios de pago (Mercado Pago, MODO, Ualá, etc.). |
| **PSP-CP** | PSP especializado en cuentas de pago (categoría regulatoria BCRA para billeteras). |
| **Coelsa** | Cámara compensadora que procesa transferencias inmediatas en Argentina. |
| **Debin** | Débito inmediato: pull de fondos autorizado por el pagador. |
| **QR interoperable** | Código QR único que cualquier billetera/banco puede escanear para pagar. |
| **Contra cargo / Chargeback** | Reversión de un cobro iniciada por el pagador o su emisor. |
| **Conciliación (Reconciliation)** | Proceso de cruzar movimientos reportados por el PSP con los registrados internamente. |
| **Settlement / Liquidación** | Acreditación efectiva de fondos cobrados en la cuenta del comercio. |

## Proveedores integrados

| Proveedor | Rol en la plataforma |
|---|---|
| **Mercado Pago** | PSP principal: cobros por transferencia CVU/alias, QR, checkout y payouts. |
| **MODO** | Billetera bancaria argentina: cobros con QR/transferencia. |
| **Ualá** | Billetera virtual: cobros y pagos por CVU. |
| **Naranja X** | Billetera virtual: cobros y pagos por CVU. |
| **Ripio** | On/off-ramp cripto: recepción de stablecoins para pagos desde monedas extranjeras y conversión a ARS. |

## Cripto / stablecoins

| Término | Definición |
|---|---|
| **Stablecoin** | Criptomoneda anclada a una moneda fiat (USDT, USDC ancladas al USD). |
| **USDT / USDC** | Stablecoins soportadas para recibir pagos internacionales vía Ripio. |
| **On-ramp** | Conversión de fiat a cripto. |
| **Off-ramp** | Conversión de cripto a fiat (USDT → ARS para liquidar al comercio). |
| **Red (Network)** | Blockchain donde circula la stablecoin (ej. TRC-20, ERC-20, Polygon). Afecta fees y tiempos. |
| **Wallet address** | Dirección destino de fondos cripto. |
| **TxHash** | Hash identificador único de una transacción on-chain. |

## Conceptos técnicos de pagos

| Término | Definición |
|---|---|
| **Idempotencia** | Garantía de que repetir una operación (mismo `idempotency-key`) no duplica el efecto. Obligatoria en todos los endpoints de dinero. |
| **Webhook** | Notificación HTTP del PSP hacia nuestra API con el estado de una operación. Siempre se verifica firma. |
| **Intent de pago** | Objeto que representa la intención de cobro/pago antes de su ejecución. |
| **Estado de transacción** | Máquina de estados: `pending → processing → succeeded | failed | reversed | expired`. |
| **Ledger** | Libro contable interno de doble entrada que registra todo movimiento de fondos. |
| **Saldo (Balance)** | Fondos disponibles del comercio en la plataforma, derivados del ledger. |
| **Fee / Comisión** | Cargo que el PSP o la plataforma aplica sobre una operación. |
| **KYC / KYB** | Verificación de identidad del comercio (Know Your Customer / Business). Requisito regulatorio. |
| **AML** | Anti-Money Laundering: controles contra lavado de dinero. |
| **Money (tipo de dato)** | Montos siempre en la menor unidad (centavos) como entero, nunca float. |

## Modelo de suscripción

| Término | Definición |
|---|---|
| **Tier por volumen** | El plan se asigna según GMV mensual: umbrales definidos en configuración de planes. |
| **Re-tiering** | Reevaluación mensual del GMV del comercio para ajustar su plan del ciclo siguiente. |
| **Período de facturación** | Ciclo mensual de cobro de suscripción. |
| **MRR** | Monthly Recurring Revenue: ingreso mensual recurrente por suscripciones. |
| **Trial** | Período de prueba inicial del comercio antes del primer cobro. |
