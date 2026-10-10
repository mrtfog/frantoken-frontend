# Arquitectura de código del frontend

Esta es la referencia para código nuevo y refactors del frontend Next.js. Describe límites y convenciones; no confirma servicios, repositorios, contratos ni emisiones implementadas. El dominio de franquicias se toma de [Business Logic](../business/BUSINESS-LOGIC.md) y sus decisiones abiertas. Las especificaciones web inmobiliarias anteriores siguen sujetas a [WEB-15](../DECISIONS.md).

## Estructura y responsabilidades

```text
src/
  app/                         rutas y convenciones de Next.js; composición mínima
  components/ui/               controles visuales reutilizables, sin reglas de negocio
  core/                        código compartido por más de una feature
    adapters/                  conversión entre contratos externos y modelos internos
    constants/                 constantes compartidas
    hooks/                     hooks reutilizables de interfaz
    models/                    tipos y modelos compartidos, si existen
    repositories/              contratos o implementaciones compartidos, si existen
    services/                  casos de uso compartidos, si existen
    utils/                     funciones puras compartidas
  features/<nombre>/           módulo vertical de una capacidad real
    components/                contenedores y vistas presentacionales
    adapters/                  mappers propios de la feature, si hacen falta
    hooks/                     hooks propios de la feature, si hacen falta
    models/                    modelos propios de la feature, si hacen falta
    repositories/              puertos e implementaciones de acceso a datos
    services/                  lógica de negocio y casos de uso de la feature
```

El árbol muestra ubicaciones posibles, no carpetas que haya que crear por adelantado. Colocá una pieza en la feature que la usa; movela a `core/` solo si hay reutilización real y un contrato estable. `src/app/` conecta una ruta con su feature y conserva las API de Next.js. `src/components/ui/` contiene primitivas visuales reutilizables; no consulta datos ni conoce reglas de FranToken. No uses `src/lib/` como cajón alternativo a estas capas.

## Dependencias y flujo

1. La ruta de `app/` importa directamente el contenedor de una feature. No exportes la feature entera mediante un barrel.
2. El contenedor prepara datos y acciones para la vista. Puede coordinar un hook o un servicio. Para datos seguros del servidor, mantené el contenedor como Server Component; agregá una frontera cliente solo donde haya estado, eventos o API del navegador.
3. La vista presentacional recibe props, compone JSX/HTML semántico y estilos, y muestra estados provistos por el contenedor. No llama repositorios, servicios ni `fetch`, ni decide reglas de negocio. Un callback recibido por props puede conectar un evento visual con el contenedor; la vista no implementa el efecto.
4. Un servicio implementa un caso de uso y reglas de dominio. Depende de contratos de repositorio y modelos; no de React, JSX ni componentes. No convierte DTOs externos en la vista.
5. Un repositorio encapsula acceso a API, almacenamiento o proveedor externo. Un adapter transforma datos del backend en modelos del frontend y viceversa en el límite del repositorio. Las formas de respuesta externas no deben filtrarse a servicios o vistas.

Dirección permitida: `app → feature/container → service → repository contract`; la implementación del repositorio usa adapters y clientes externos. `core/` no importa desde `features/`, y una feature no importa componentes internos de otra. Si dos features comparten una capacidad genuina, extraé el contrato mínimo a `core/`. No agregues integraciones o reglas a partir de los documentos Solidity archivados sin contrato/API real y decisión vigente.

### Container / presentacional

Para una pantalla `Homepage`, usá `Homepage.container.tsx` para coordinación y `Homepage.tsx` para render. La vista es una función de sus props: contenido, estado y callbacks visuales. Esta convención **no exige la librería HTMX**: “solo con HTMX” fue aclarado para este proyecto como JSX/HTML presentacional sin lógica. Evitá `use client` en la vista por defecto; si necesita eventos, mové la frontera cliente al fragmento mínimo compatible con React/Next. Un contenedor cliente no convierte automáticamente sus hijos en archivos que deban declarar `use client`.

## Nombres de archivos y exports

- Archivos de código ordinario: `nombreCamelCase.tipo.ts` o `.tsx`. Tipos habituales: `.hook`, `.util`, `.constants`, `.model`, `.repository`, `.service`, `.adapter`, `.type`, `.schema`. Elegí `.tsx` solo cuando el archivo contiene JSX.
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

Antes de escribir código Next.js, leé la guía pertinente en `node_modules/next/dist/docs/` como exige [AGENTS.md](../../AGENTS.md). Para revisar nombres y barrels, ejecutá `node scripts/check-architecture.mjs`. Además corré el chequeo de tipos y Biome que correspondan al cambio. El script verifica solo convenciones mecánicas; el flujo de dependencias y la pureza de la vista requieren revisión de código.
