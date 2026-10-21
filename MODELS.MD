# Modelos IA — plata-neta

Configuración de modelos de IA usados en el desarrollo del proyecto: qué modelo
corresponde a cada tipo de tarea y cómo debe comportarse.

## Roles de modelo por tarea

| Tarea | Modelo / Perfil | Uso esperado |
|---|---|---|
| **Arquitectura y diseño** | Modelo de razonamiento fuerte (ej. SWE-2 High, Claude Opus, GPT-5 Thinking) | Diseño de módulos, esquemas de datos, decisiones de integración PSP. |
| **Implementación de código** | Modelo de coding (SWE-2 High, GPT-5 Codex, Claude Sonnet) | Features, adaptadores de providers, endpoints, UI. |
| **Lógica financiera crítica** | Razonamiento fuerte + revisión doble | Ledger, conciliación, idempotencia, máquina de estados. Todo cambio aquí exige revisión humana. |
| **Tests y QA** | Modelo de coding estándar | Generación de tests, casos borde, fixtures de webhooks. |
| **Documentación y glosario** | Modelo rápido/económico | Docs, comentarios, changelogs, traducciones. |
| **Análisis de logs / debugging** | Razonamiento fuerte | Trazado de flujos de pago, discrepancias de conciliación. |
| **Tareas mecánicas** | Modelo rápido | Renombres, migraciones de formato, boilerplate. |

## Configuración de comportamiento

- **Contexto obligatorio**: antes de cualquier tarea, el agente debe leer
  `AGENTS.MD`, `RULES.MD` y `GLOSARY.MD` (y `DOCUMENTATION.MD` si la tarea toca
  arquitectura).
- **Idioma**: razonamiento interno indistinto; salida al usuario en **español**;
  artefactos de código en **inglés**.
- **Autonomía**:
  - Alta en: tests, refactors, documentación, UI no financiera.
  - Media en: endpoints de API, integraciones PSP nuevas (proponer antes de
    implementar).
  - Baja en: lógica de ledger, manejo de credenciales, flujos de payout cripto.
    Proponer plan y esperar aprobación.
- **Verificación**: el agente debe ejecutar lint/typecheck/tests relevantes
  antes de declarar una tarea completa.

## Subagentes

| Perfil | Cuándo usarlo |
|---|---|
| `subagent_explore` | Exploración del codebase, investigación de APIs de PSPs, análisis de dependencias. |
| `subagent_general` | Implementaciones aisladas con criterio claro (un adaptador, un endpoint, un test). |

Restricciones de subagentes:
- Máximo necesario; tareas disjuntas (nunca dos agentes escribiendo el mismo archivo).
- Un subagente que toque `packages/core` (ledger/dinero) trabaja solo, sin
  paralelos en archivos relacionados.

## Registro de decisiones de modelos

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-10-20 | Setup inicial de contexto | Definición de archivos base del proyecto. |

> Actualizar esta tabla cada vez que cambie la asignación de modelos o se
> incorpore una herramienta/agente nuevo.
