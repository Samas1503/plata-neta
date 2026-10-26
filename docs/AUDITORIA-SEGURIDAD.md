# Security Audit — plata-neta @ b39644f → fixes en rama de auditoría
Profile: quick · Scope: apps/api, apps/web dashboard, packages/{db,providers,jobs}
Hunters: 2 (auth/tenant, crypto/webhooks) · Todos los findings HIGH+MEDIUM+LOW fixeados.

## Hallazgos y estado

### HIGH
| ID | Hallazgo | Fix aplicado |
|---|---|---|
| SEC-1 | `baseUrl` controlado por tenant → SSRF + spoofing de estado de pago (ledger falso) | `baseUrl` ignorado en credentials route — adapters usan solo su apiBaseUrl |
| SEC-3 | Bootstrap mintea keys de cualquier tenant, sin rate limit, comparación no-constante | `rateLimit` 10/min + `timingSafeEqual` |
| AUTH-1 | `session.user.id` nunca poblado (JWT @auth/core) → aprobación 2-pasos nunca funcionó, audit userId null, self-role guard roto | `session.user.id = token.sub` en callback session |
| AUTH-2 | Misma API key puede crear Y aprobar payout (sin separación de funciones) | `Payout.createdByKeyId` + reject 403 en approve |

### MEDIUM
| SEC-2 | Body upstream del PSP se devolvía al caller | error estático "provider error" + log server |
| SEC-4 | Secreto de API key viajaba en `?created=` (URL/logs/Referer) | key solo en memoria del componente client |
| SEC-5 | Replay de webhook: dedup solo por processedAt + carrera → doble crédito ledger | `@@unique(provider,eventId)` + P2002 dedup + ts ±5min MP + transición atómica updateMany |
| SEC-6 | `processWebhook` parseaba `{"raw":...}` stringify → dead-letter + ignoraba signatureValid | parse `event.payload.raw` + guard `!signatureValid → skip` |
| AUTH-3 | VIEWER podía crear cobros (sin requireRole) | `createIntent` exige OWNER/OPERATOR |
| AUTH-4 | Role stale en JWT ~30d tras demotion | jwt callback re-lee role/tenant de DB cada request |

### LOW
| SEC-7 | Tail del token en claves Redis; XFF spoofable | key con sha256 del token |
| SEC-8 | Credentials sin body cap ni whitelist de extras | whitelist cvu/cbu/alias/qrPayload/depositAddress + longitud máx |
| AUTH-5 | `!adapter` permitía persistir evento sin firma | `!adapter \|\| !signatureValid → 401` |
| AUTH-7 | Sin rate limit en webhook ni login | rateLimit 60/min webhook + throttle in-memory login 5/min |

## Design gaps (documentados, no violations)
- `webhookSecret` por-tenant guardado pero no usado — firma se verifica solo contra env global del PSP
- `executePayouts`: si provider.payout() ok pero update falla → reverso ledger vs plata real movida
- Bootstrap secret = credencial global (AUTH-6) — mitigado por rate limit + only-when-0-keys

## Verificación
pnpm lint 10/10 · tests 69 (12 core + 13 providers + 44 api) · schema push (createdByKeyId + unique webhook)
