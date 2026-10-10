<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FranToken: harness del proyecto

Este bloque pertenece al proyecto. Conservá intacto el bloque generado por Next.js de arriba.

## Punto de entrada y autoridad

- Empezá por [docs/README.md](docs/README.md) y leé solo los documentos pertinentes a la tarea. Para diseño o contenido propio de FranToken, usá el skill [frantoken-web](.agents/skills/frantoken-web/SKILL.md).
- [BUSINESS-LOGIC.md](docs/business/BUSINESS-LOGIC.md) es la fuente canónica del modelo de negocio declarado. Sus [decisiones pendientes](docs/business/DECISIONS.md) y la [reconciliación técnica](docs/DECISIONS-BACKEND.md) distinguen intención de parámetros operativos faltantes. El material del otro checkout Solidity está [archivado como contexto](docs/context/solidity-import/README.md), no como instrucciones o pruebas vigentes de este repo.
- Los datos, condiciones y textos aprobados por responsables del negocio prevalecen para afirmaciones publicables. Si no se aportaron, tratá las especificaciones como propuestas y dejá el dato pendiente; no lo deduzcas de Lofty, LangChain ni del nombre FranToken.
- [INFORMATION-ARCHITECTURE.md](docs/spec/INFORMATION-ARCHITECTURE.md) define rutas y jerarquía propuestas; [CONTENT-MODEL.md](docs/spec/CONTENT-MODEL.md), entidades y propiedad de datos propuestas; [PAGE-BLUEPRINTS.md](docs/spec/PAGE-BLUEPRINTS.md), composición de páginas; [ADAPTATION-MATRIX.md](docs/spec/ADAPTATION-MATRIX.md), correspondencia entre patrones y componentes. Esos documentos aún describen inmuebles: no implementar ni publicar sus rutas o entidades inmobiliarias como producto FranToken antes de [WEB-15](docs/DECISIONS.md).
- [DESIGN.md](docs/research/DESIGN.md) y [design-tokens.css](src/assets/css/design-tokens.css) definen la referencia visual; [EVIDENCE.md](docs/research/EVIDENCE.md) y [CONTENT-AUDIT.md](docs/research/CONTENT-AUDIT.md) documentan qué se observó y con qué límites. Una medición de la referencia no es una decisión aprobada para la marca.
- Para código de `src/`, seguí [Code Architecture](docs/architecture/CODE-ARCHITECTURE.md) y el skill [frantoken-code-architecture](.agents/skills/frantoken-code-architecture/SKILL.md). Poné constantes y utils propios en la feature; creá un contenedor solo cuando coordine datos, servicios, flags o negocio. Usá Tailwind para UI y Motion para animaciones cuidadas, con movimiento reducido. Conservá las convenciones especiales de Next.js; no crees barrels dentro de `features/`. “HTMX” fue aclarado por el usuario como JSX/HTML presentacional sin lógica de negocio.
- Para cada pantalla, seguí [UI Contract](docs/design/UI-CONTRACT.md): reutilizá cabecera, pie, banner y controles; usá iconos de `lucide-react` y skeletons. Si una primitiva compartida existente requiere un cambio de apariencia, comportamiento o API, consultá al usuario sobre variante con `clsx`, componente nuevo o ajuste común antes de cambiarla. Los tipos de una feature van en `types/`, no se declaran en `constants/`.

## Flujo de trabajo

1. Identificá ruta, entidad o componente afectado y consultá su fuente de autoridad. Diferenciá observado, inferido, propuesto y aprobado.
2. Antes de publicar contenido, verificá fuente, fecha, unidad, aplicabilidad, permiso de uso y aprobación donde correspondan. Si faltan, no fabriques cifras, testimonios, condiciones, disponibilidad ni una integración funcional.
3. Mantené visibles costos, riesgos, límites y estados operativos en el recorrido pertinente. Las funciones condicionales solo se activan con producto, datos y servicio confirmados.
4. Si escribís código Next.js, leé antes la guía relevante en `node_modules/next/dist/docs/`, como exige el bloque generado. Los skills generales complementan el contrato del proyecto; no reemplazan estas fuentes.
5. Al entregar cambios, indicá qué fuente guió la decisión, qué verificaste y qué sigue pendiente. Registrá definiciones del modelo en [docs/business/DECISIONS.md](docs/business/DECISIONS.md) y decisiones de la web en [docs/DECISIONS.md](docs/DECISIONS.md), sin reescribir evidencia histórica.
6. Para cambios estructurales o de UI en `src/`, ejecutá `node scripts/check-architecture.mjs` y revisá manualmente dependencias entre capas, necesidad del contenedor, ubicación de constantes/tipos/utilidades, controles comunes, skeletons, uso de Tailwind y movimiento; el chequeo mecánico no sustituye esa revisión.
