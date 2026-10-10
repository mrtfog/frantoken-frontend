# Arquitectura de código del frontend

Esta es la referencia para código nuevo y refactors del frontend Next.js. Describe límites y convenciones; no confirma servicios, repositorios, contratos ni emisiones implementadas. El dominio de franquicias se toma de [Business Logic](../business/BUSINESS-LOGIC.md) y sus decisiones abiertas. Las especificaciones web inmobiliarias anteriores siguen sujetas a [WEB-15](../DECISIONS.md).

## Estructura y responsabilidades

```text
src/
  app/                         rutas y convenciones de Next.js; composición mínima
  components/ui/               controles visuales reutilizables, sin reglas de negocio
  components/common/           cabecera, pie, banner y otras piezas compartidas de página
  core/                        código compartido por más de una feature
    adapters/                  conversión entre contratos externos y modelos internos
    constants/                 constantes compartidas
    hooks/                     hooks reutilizables de interfaz
    models/                    tipos y modelos compartidos, si existen
    repositories/              contratos o implementaciones compartidos, si existen
    services/                  casos de uso compartidos, si existen
    types/                     tipos compartidos, si existen
    utils/                     funciones puras compartidas
  features/<nombre>/           módulo vertical de una capacidad real
    components/                contenedores y vistas presentacionales
    adapters/                  mappers propios de la feature, si hacen falta
    constants/                 datos y configuración estática propios de la feature
    hooks/                     hooks propios de la feature, si hacen falta
    models/                    modelos propios de la feature, si hacen falta
    repositories/              puertos e implementaciones de acceso a datos
    services/                  lógica de negocio y casos de uso de la feature
    types/                     tipos de la feature, si hacen falta
    utils/                     funciones puras propias de la feature
```

El árbol muestra ubicaciones posibles, no carpetas que haya que crear por adelantado. Colocá una pieza en la feature que la usa; movela a `core/` solo si hay reutilización real y un contrato estable. En particular, listas editoriales, opciones, configuraciones y valores estáticos de una pantalla van en `features/<nombre>/constants/`; declaraciones `type` e `interface`, en `features/<nombre>/types/`; transformaciones puras propias, en `features/<nombre>/utils/`. Una constante puede **importar** un tipo, pero no declararlo. Si un valor solo aclara una línea de JSX, puede permanecer local; extraé bloques de datos y reglas que dificultan leer el componente. No uses el contenedor como depósito de constantes ni el componente como depósito de utilidades. `src/app/` conecta una ruta con su feature y conserva las API de Next.js. `src/components/ui/` contiene primitivas visuales reutilizables; `src/components/common/`, piezas de página compartidas. Ninguna consulta datos ni conoce reglas de FranToken. No uses `src/lib/` como cajón alternativo a estas capas.

## Dependencias y flujo

1. La ruta de `app/` importa directamente la vista de una feature, o su contenedor cuando exista. No exportes la feature entera mediante un barrel.
2. Creá un contenedor **solo si tiene trabajo real**: fetching, filtrado/ordenamiento o transformación de datos dinámicos, coordinación de servicios/hooks, flags o decisiones de negocio. Cálculos como `visibleProjects` y el estado de filtros pertenecen al contenedor; la vista recibe resultados y callbacks. Si trabaja con datos seguros del servidor, mantenelo como Server Component; agregá una frontera cliente solo donde haya estado, eventos o API del navegador.
3. La vista presentacional recibe props cuando hagan falta, compone JSX/HTML semántico con utilidades Tailwind y muestra estados provistos por el contenedor. Puede leer constantes estáticas de su propia feature y manejar interacción puramente visual local, como menú, pestañas o animaciones. No llama repositorios, servicios ni `fetch`, ni decide reglas de negocio. Un callback recibido por props puede conectar un evento visual con el contenedor; la vista no implementa el efecto de negocio.
4. Un servicio implementa un caso de uso y reglas de dominio. Depende de contratos de repositorio y modelos; no de React, JSX ni componentes. No convierte DTOs externos en la vista.
5. Un repositorio encapsula acceso a API, almacenamiento o proveedor externo. Un adapter transforma datos del backend en modelos del frontend y viceversa en el límite del repositorio. Las formas de respuesta externas no deben filtrarse a servicios o vistas.

Dirección permitida cuando hay lógica: `app → feature/container → service → repository contract`; la implementación del repositorio usa adapters y clientes externos. Para una vista estática o solo interactiva en la UI: `app → feature/view`, con constantes y utilidades propias cuando hagan falta. `core/` no importa desde `features/`, y una feature no importa componentes internos de otra. Si dos features comparten una capacidad genuina, extraé el contrato mínimo a `core/`. No agregues integraciones o reglas a partir de los documentos Solidity archivados sin contrato/API real y decisión vigente.

### Container / presentacional

Para una pantalla `Homepage` sin fetching ni decisiones de negocio, creá **solo `Homepage.tsx`** e importalo desde `app/page.tsx`. Si después necesita esa coordinación, agregá `Homepage.container.tsx`; no crees un contenedor que solo devuelve `<Homepage />`, pasa constantes o renombra props. La vista muestra contenido y estados; puede mantener estado efímero de presentación y configurar Motion. Esta convención **no exige la librería HTMX**: “solo con HTMX” fue aclarado para este proyecto como JSX/HTML presentacional sin lógica de negocio. Evitá `use client` por defecto; si necesita eventos o hooks de Motion, mové la frontera cliente al fragmento mínimo compatible con React/Next. Un contenedor cliente no convierte automáticamente sus hijos en archivos que deban declarar `use client`.

Ejemplo de organización, sin crear archivos que la pantalla no necesite:

```text
src/app/page.tsx                              → importa Homepage directamente
src/features/home/components/Homepage.tsx     → UI y estado visual local
src/features/home/constants/homepage.constants.ts → listas editoriales estáticas
src/features/home/utils/formatStage.util.ts   → transformación pura, si existe
```

## Estilos y movimiento de la UI

- Usá **Tailwind CSS** para composición, responsive, tipografía, colores, estados y animaciones utilitarias. Preferí clases en el JSX y tokens reutilizables; no agregues CSS Modules, hojas CSS de componentes, selectores de sección en `globals.css`, ni estilos inline para resolver el diseño habitual. No uses `@apply` para esconder una página entera detrás de nombres de clase propios.
- `src/app/globals.css` es el punto de entrada de Tailwind v4 (`@import "tailwindcss"`) y el lugar para tokens compartidos (`@theme` o variables CSS consumidas por clases Tailwind), fuentes, reset/base global mínimo y, si Tailwind no alcanza, un `@keyframes` global justificado. Un token no debe confundirse con una clase de componente. Documentá por qué cualquier regla CSS fuera de ese alcance es imprescindible. `src/assets/css/design-tokens.css` es una referencia histórica medida/inferida; no la importes automáticamente como tema aprobado de FranToken.
- Toda UI nueva o modificada debe usar la dependencia instalada `motion` (`motion/react`) en al menos una transición o interacción relevante. Definí una intención de movimiento acorde a [Design](../research/DESIGN.md): una entrada o transición principal bien coreografiada, microinteracciones útiles y ritmo coherente con la marca. Tailwind cubre estados simples complementarios. Evitá animación decorativa repetida que distraiga, salto de layout y efectos que tapen información. En pantallas de inversión, costos, riesgos y acciones siguen legibles sin movimiento.
- Respetá `prefers-reduced-motion`: Motion puede usar `MotionConfig reducedMotion="user"` y `useReducedMotion`; agregá `motion-reduce:*` a transiciones Tailwind que lo requieran. Nunca hagas que una animación sea el único modo de revelar contenido. No conviertas toda una ruta en Client Component solo para animar un detalle: aislá el fragmento interactivo.
- En la revisión de UI, comprobá al menos móvil y escritorio, teclado, foco visible, contenido con movimiento reducido y ausencia de regresiones de layout. La calidad del movimiento se evalúa visualmente; un checker de nombres no puede certificarla.

## Nombres de archivos y exports

- Archivos de código ordinario: `nombreCamelCase.tipo.ts` o `.tsx`. Tipos habituales: `.hook`, `.util`, `.constants`, `.model`, `.repository`, `.service`, `.adapter`, `.type`, `.schema`. Elegí `.tsx` solo cuando el archivo contiene JSX.
- En `features/<nombre>/constants/`, usá nombres como `homepage.constants.ts` o `provincesOptions.constants.ts`; en `utils/`, `formatStage.util.ts`. Importalos por ruta directa, sin barrel de feature. Si una constante contiene JSX, usá `.tsx`.
- Definí contratos y aliases TypeScript en `features/<nombre>/types/*.type.ts` o `core/types/*.type.ts` cuando sean compartidos. `constants/` contiene valores, aunque puedan estar anotados con tipos importados. No declares `type` o `interface` dentro de `*.constants.ts(x)`.
- Componentes de feature y otros componentes no pertenecientes a `components/ui`: `UpperCamelCase.tsx`; contenedores `UpperCamelCase.container.tsx`. El identificador React también va en UpperCamelCase. Ejemplos: `Homepage.tsx`, `Homepage.container.tsx`.
- Primitivas de `src/components/ui/`: nombre en minúsculas o camelCase, por ejemplo `button.tsx`. Exportá el componente React con identificador UpperCamelCase, por ejemplo `Button`.
- Excepciones obligatorias de Next.js en `src/app/`: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, archivos de metadata y otras convenciones documentadas por la versión instalada. No renombres estos archivos para forzar un sufijo propio.
- `index.ts` se reserva para barrels de carpetas compartidas como `src/components/ui/`, `src/core/adapters/` y `src/core/constants/`. Exportá símbolos explícitos; evitá `export *` indiscriminado y ciclos. **No hay `index.ts` ni `index.tsx` en `src/features/`, incluidas sus subcarpetas.** Importá directamente desde el archivo de la feature.
- Archivos de prueba, configuración y generación siguen la convención de su herramienta; no fuerces sufijos de producción sobre ellos.

## Criterios de diseño

- **SOLID:** una responsabilidad clara por módulo; contratos de repositorio definidos por el consumidor cuando permiten sustituir la fuente de datos; dependencias hacia interfaces en los casos de uso. Evitá herencias e interfaces vacías por anticipación.
- **DRY:** extraé conocimiento repetido, no solo líneas parecidas. Dos vistas similares pueden seguir separadas si expresan reglas distintas.
- **KISS:** elegí el flujo más simple que preserva límites, tipos y estados de error claros. No agregues capas delegadoras sin comportamiento.
- **YAGNI:** no crees services, repositories, adapters, providers, hooks o carpetas hasta que una feature real los necesite.

## Estado de la home de prueba

La home ya importa `Homepage.tsx` directamente y ubica sus listas estáticas en `home/constants/`. `src/app/globals.css` todavía contiene selectores de secciones y componentes; al revisar esa UI, convertí esas reglas a utilidades Tailwind y conservá allí solo tokens y base global. La pantalla usa `motion/react`, pero la revisión debe comprobar la calidad del ritmo, el movimiento reducido y si la frontera cliente puede ser más pequeña. Esta nota describe el estado de prueba, no autoriza a publicar su contenido como oferta. Para iconos, componentes comunes, variantes y skeletons, seguí [UI Contract](../design/UI-CONTRACT.md).

Antes de escribir código Next.js, leé la guía pertinente en `node_modules/next/dist/docs/` como exige [AGENTS.md](../../AGENTS.md). Para revisar nombres, barrels y ubicación de CSS, ejecutá `node scripts/check-architecture.mjs`. Además corré el chequeo de tipos y Biome que correspondan al cambio. El script verifica solo convenciones mecánicas; necesidad del contenedor, ubicación de datos, flujo de dependencias, uso real de Tailwind y calidad del movimiento requieren revisión de código.
