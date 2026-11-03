# Harness de diseño y contenido de FranToken

## MVP implementado

La implementación se ejecuta con la [guía local](architecture/ACADEMIC-MVP-RUNBOOK.md). Consultar [verificación y límites](testing/ACADEMIC-MVP.md). El coordinador vigente es Express, con JWT y persistencia SQL; la wallet firma vínculo, términos y cobro.

## Prioridad actual: MVP académico

Consultar primero el [alcance aprobado](business/MVP-ACADEMICO.md) y el [recorrido de frontend](architecture/MVP-ACADEMICO.md). Describen compra con pago simulado, emisión C4, publicación de solicitudes y cobro mensual implementados en Hardhat local. Prevalecen para la demo sobre los bloqueos de operación real y las especificaciones inmobiliarias anteriores. Cualquier usuario puede invertir y presentar franquicias con perfil completo; el creador gestiona las propias y el superadmin admite/publica y ejecuta repartos. Consultar [gestión de franquicias](architecture/FRANCHISE-MANAGEMENT.md).

Este índice orienta el trabajo sobre la web propia. [Business Logic](business/BUSINESS-LOGIC.md) describe el modelo de FranToken aportado para el proyecto y sus [decisiones pendientes](business/DECISIONS.md). Los documentos de `spec/` son propuestas anteriores basadas en inmuebles; deben adaptarse a franquicias antes de implementarse. Los de `research/` registran referencias externas y sus límites. La home actual es una implementación en prueba; no convierte propuestas en ofertas aprobadas.

Actualización de negocio del 2026-11-01: [DTE de proyecto y token](business/LIFECYCLES.md), [implementación y brechas](business/IMPLEMENTATION-STATUS.md) y [fuentes originales con precedencia](business/source/README.md). Precio fijo: **USD 10 por token + fees de transacción blockchain**.

## Mapa de fuentes

| Necesidad | Fuente de autoridad | Consultar también |
|---|---|---|
| Arquitectura de código, nombres y límites entre capas | [Code Architecture](architecture/CODE-ARCHITECTURE.md) | [Skill de arquitectura](../.agents/skills/frantoken-code-architecture/SKILL.md) |
| Componentes compartidos, iconos, variantes y skeletons | [UI Contract](design/UI-CONTRACT.md) | [Code Architecture](architecture/CODE-ARCHITECTURE.md) |
| Modelo, actores, flujo de fondos y C1–C4 | [Business Logic](business/BUSINESS-LOGIC.md) | [Decisiones del negocio](business/DECISIONS.md) |
| Relación con el otro proyecto Solidity | [Contexto importado](context/solidity-import/README.md) | [Reconciliación backend](DECISIONS-BACKEND.md), [Project](PROJECT.md) |
| Rutas, navegación y recorridos | [Information Architecture](spec/INFORMATION-ARCHITECTURE.md) | [Page Blueprints](spec/PAGE-BLUEPRINTS.md) |
| Entidades, campos, procedencia y publicación | [Content Model](spec/CONTENT-MODEL.md) | [Decisiones pendientes](DECISIONS.md) |
| Secciones, contenido mínimo y estados de página | [Page Blueprints](spec/PAGE-BLUEPRINTS.md) | [Information Architecture](spec/INFORMATION-ARCHITECTURE.md) |
| Traducción de necesidades de contenido a componentes | [Adaptation Matrix](spec/ADAPTATION-MATRIX.md) | [Content Audit](research/CONTENT-AUDIT.md), [Design](research/DESIGN.md) |
| Sistema visual y tokens | [Design](research/DESIGN.md), [design-tokens.css](../src/assets/css/design-tokens.css) | [Evidence](research/EVIDENCE.md) |
| Estructura observada de Lofty | [Content Audit](research/CONTENT-AUDIT.md) | [Adaptation Matrix](spec/ADAPTATION-MATRIX.md) |
| Mediciones y límites de la referencia LangChain | [Evidence](research/EVIDENCE.md) | [Design](research/DESIGN.md) |

Leé [AGENTS.md](../AGENTS.md) para la precedencia y el flujo de trabajo del agente. El skill [frantoken-web](../.agents/skills/frantoken-web/SKILL.md) guía tareas de diseño y contenido; los skills de terceros en `.agents/skills/` se usan por especialidad. El manual recibido se conserva en [business/source/](business/source/FranToken-manual-consulta-v2.md) como procedencia y consulta detallada. Las instrucciones recibidas para un proyecto de ChatGPT se archivan allí, pero no gobiernan este repositorio. Para Next.js, la documentación de la versión instalada en `node_modules/next/dist/docs/` es obligatoria antes de escribir código.

## Estado de evidencia y publicación

Los IDs `L0–L8` identifican páginas observadas de Lofty, `R00–R17` rutas propuestas, y `E`/`A` evidencia visual y assets inventariados. `BUS-*` sigue parámetros del modelo y `WEB-*` decisiones de publicación y rediseño web; los `D01–D14` del manual recibido son IDs históricos distintos. Se deben conservar las etiquetas **observado**, **medido**, **inferido** y **propuesto**. Una afirmación pública sobre FranToken requiere información y aprobación propias; los bloqueos se siguen en [decisiones de negocio](business/DECISIONS.md) y [decisiones web](DECISIONS.md).

El repositorio no contiene `URL-MAP.md`, el ZIP citado por Design ni sus capturas `evidence/home-1440.png`, `home-768.png` y `home-390.png`. Las referencias históricas a esos artefactos permanecen en los documentos originales para conservar trazabilidad, pero no deben tratarse como archivos disponibles ni reconstruirse por inferencia. Tampoco existe el directorio `references/` mencionado en la versión previa de Page Blueprints; su referencia técnica ahora apunta a las ubicaciones reales.
