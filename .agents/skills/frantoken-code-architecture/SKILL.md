---
name: frantoken-code-architecture
description: Implement or review code structure, feature boundaries, file naming, container/presentational components, and shared modules in the FranToken Next.js frontend.
---

# Arquitectura de código FranToken

Usá [Code Architecture](../../../docs/architecture/CODE-ARCHITECTURE.md) como contrato de organización de código y [AGENTS.md](../../../AGENTS.md) para la precedencia del proyecto. Aplicá este skill al crear, mover o revisar módulos de `src/`; para contenido y diseño de la web, combiná con [frantoken-web](../frantoken-web/SKILL.md). Consultá [Business Logic](../../../docs/business/BUSINESS-LOGIC.md) cuando una regla de negocio afecte el código.

Ubicá la implementación en la feature que la necesita. Mantené la ruta Next.js fina, la vista presentacional basada en props, los casos de uso en servicios y el acceso externo detrás de repositorios/adapters. Elevá a `core/` solo lo compartido de verdad. No crees capas o archivos vacíos para completar un árbol teórico. Respetá la aclaración del usuario: “HTMX” significa JSX/HTML presentacional sin lógica, no la dependencia HTMX.

Aplicá las reglas de sufijos y de nombres React del documento de arquitectura. Usá barrels explícitos solo en carpetas compartidas; nunca en `features/`. Preservá los nombres especiales de Next.js. Antes de escribir código Next, consultá la guía pertinente en `node_modules/next/dist/docs/`. Verificá las convenciones mecánicas con `node scripts/check-architecture.mjs` y revisá manualmente límites de dependencias y lógica de presentación.
