# Verificación del MVP integrado

Fecha: 2026-11-02. Frontend/blockchain conservan `feat/academic-mvp`. Backend `feat/mvp-integracion-completa`, nueva desde `develop` fd67b09. Alcance académico, sin activos reales.

| Comprobación ejecutada | Resultado |
|---|---|
| Blockchain `npm test` | **58 pasan**: suite general, seis casos del token académico y uno de fábrica. Incluye prorrata entre dos titulares, emisión posterior sin ingresos anteriores, cobro único, cierre, permisos y transferencias bloqueadas. |
| Backend `npm run test:mvp` | **14 escenarios pasan** con clientes frontend, Express/JWT, Sequelize/SQL real y contratos reales en Hardhat. Incluye creación/publicación de solicitud nueva, compra/reparto/cobro en sus contratos, referencias duplicadas simultáneas, respuesta perdida, escala seis decimales y migración repetida preservando filas. |
| Backend `npm run build` y `npm run typecheck:scripts` | Pasan tipos estrictos de servicios/controladores/modelos y scripts de migración/importación. |
| Frontend `node node_modules/typescript/bin/tsc --noEmit` | Pasa. |
| Frontend `node scripts/check-architecture.mjs` | Pasa; nombres, capas, tipos, controles reutilizados y skeletons. |
| Biome sobre los archivos JS/TS/JSON modificados | Pasa. No se modifican primitivas de UI compartidas ni se reformatean fuentes ajenas al alcance. |
| Frontend `node node_modules/next/dist/bin/next build --webpack` | Pasa, incluido TypeScript y páginas; detalle de proyecto dinámico y Mis solicitudes incluidos. |
| Frontend `node scripts/test-academic-integration.cjs` | Entrada al mismo runner integrado del backend; exige los tres checkouts hermanos/dependencias y Node 24. |
| Servidor MySQL/PostgreSQL / migración de datos existentes real | **No ejecutado**: la persistencia se comprobó con SQLite real; Docker/socket no disponible. No se tocó la base del usuario. |
| Navegador con extensión / transporte TCP | **No ejecutado**: sandbox restringe sockets. Falta prueba visual y firma mediante extensión real. |
| Fondos externos / proveedor bancario | No ejecutado; fuera de alcance. |

## Runner y cobertura

El runner usa `node:sqlite` de Node 24 mediante un adaptador exclusivo del test al dialecto SQLite de Sequelize. No simula modelos ni transacciones SQL. Invoca clientes reales de sesión/perfil/solicitud/inversión/admin, Express con parsers, JWT, permisos y validadores, y EVM Hardhat con bytecode real. Sustituye únicamente transporte de sockets por puentes en memoria y driver sqlite3 por node:sqlite. El watchdog falla si el flujo no termina; una promesa sin resolver no puede producir un falso éxito.

Los 14 escenarios verifican: registro/sesión/403; requisitos de documentación; persistencia y fecha inválida; solicitud sin historial con ID del servidor; vínculo firmado sin aprobación automática; aprobación admin en registry; términos y compra/precio; recuperación sin doble emisión; estado y mes/importe único; claim firmado sin doble pago; publicación idempotente y catálogo sin datos personales; compra/reparto/cobro de nueva franquicia y referencia simultánea; migración repetida; revocación al editar identidad y eliminación de sesión inválida.

El test no certifica MySQL/PostgreSQL: enum, ALTER e índices deben comprobarse en el dialecto usado antes de aplicar la migración a una base compartida. Tampoco mide render, accesibilidad visual o funcionamiento de una extensión. La cadena/base de prueba se crean aisladas; no se leen claves ni datos reales.

Se conservan la versión ethers y las dependencias/lockfiles existentes. En este entorno ethers del frontend se resuelve mediante un enlace local no versionado al paquete instalado en blockchain. No se verificó instalación limpia desde el registro: `pnpm install --frozen-lockfile` debe comprobarse en un entorno con acceso antes de afirmar reproducibilidad de instalación. La configuración `experimental.useTypeScriptCli:false` ya presente evita la limitación de subprocess del sandbox y conserva la comprobación TypeScript del build.

La guía de ejecución identifica cuentas de prueba y responsables del gas. mUSDC no acredita paridad USD ni retorno; no se probó cumplimiento jurídico ni operación de producción.

## Actualización 2026-11-03 — Perfil y sesión

`npm run test:mvp` del backend pasa **18 escenarios** con clientes de frontend, Express/JWT, SQL SQLite y Hardhat reales en memoria. Se amplía la cobertura anterior para verificar normalización y límites iguales entre frontend y backend, persistencia del nombre en `User`, devolución del perfil confirmado, caché y notificación de sesión, preservación de revisión al cambiar teléfono/preferencias y revocación al cambiar identidad. También se fuerza un error de guardado de usuario para comprobar rollback tanto de un perfil existente como de su creación inicial; el error no modifica la sesión cacheada.

Se conservan los límites del runner: no valida transporte TCP, extensión de wallet, render visual ni un servidor MySQL/PostgreSQL. No se modificó la base de datos del usuario.
