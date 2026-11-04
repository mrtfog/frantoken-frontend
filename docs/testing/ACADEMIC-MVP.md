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

## Actualización 2026-11-03 — Conectividad blockchain y wallet

`npm run test:mvp` pasa **21 escenarios**. La ampliación prueba red correcta, cambio de red, agregado seguido de cambio, rechazo 4001, solicitud pendiente -32002, método no soportado y wallet que no cambia realmente de red. Se comprueban 503 de módulo deshabilitado, manifiesto ausente y RPC caído, lectura disponible con escrituras deshabilitadas, y resumen que conserva solicitudes sin convertir saldos desconocidos en cero. Los casos de wallet usan un proveedor EIP-1193 de prueba; las operaciones del recorrido principal siguen ejecutándose con SQL y EVM reales en memoria.

Tipos, arquitectura, Biome del alcance, build de backend y scripts, y build del frontend con Webpack pasan. La comprobación operativa local por TCP también respondió 200 en health, catálogo e inversión, con chain ID 31337 y cuatro proyectos. Se inició Hardhat local, se generó el manifiesto académico y se vinculó el catálogo a la base existente; antes se verificaron cero compras y cero proyectos con contratos. No se ejecutaron compras ni se editaron perfiles de usuarios en esa base. Esta comprobación no sustituye una prueba de compra contra el servidor SQL local.

Pendiente: revisión visual y conexión mediante una extensión real. El nodo de desarrollo debe permanecer activo; se conserva la advertencia del runbook sobre pérdida de estado al reiniciar Hardhat.

## Actualización 2026-11-03 — Gestión de franquicias y superadmin

`npm run test:mvp` pasa **31 escenarios**. Los diez nuevos verifican alta explícita/idempotente del superadmin sin promoción ni cambio de contraseña, rechazo del admin legado, aislamiento por propietario, corrección y revisión con versiones, congelamiento durante publicación interrumpida, propuestas/correcciones/observaciones, ejecución exclusiva con recuperación tras fallo, continuidad de SQL sin RPC, cierre terminal y migración repetida sin pérdida. Las pruebas usan repositorios/servicios reales del frontend, Express/JWT, SQLite y EVM Hardhat en memoria; no sustituyen una prueba concurrente con varios procesos escritores.

Pasan tipos, Biome del alcance, arquitectura y build de producción del frontend con Webpack, build del backend y tipos de scripts. Se aplicó la migración aditiva en la MariaDB local comprobando que se conservaran los recuentos de usuarios, perfiles, compras, solicitudes y proyectos. Se creó la cuenta interna acordada y se comprobó login y lecturas privadas por HTTP. La contraseña queda únicamente en configuración local ignorada.

Chromium automatizado verificó bloqueo de acceso anónimo, login real del superadmin y listados reales de admisión. Con respuestas de API controladas (sin escribir franquicias existentes) verificó corrección/reenvío con versión, carga parcial sin blockchain, inicio operativo, propuesta/observación/corrección/ejecución con versiones e importes exactos y cancelación del cierre. Revisión visual en escritorio y móvil de 390 px, sin desbordamiento horizontal ni errores JavaScript; se comprobó foco por teclado y ejecución con movimiento reducido. No hubo extensión de wallet real ni compras/distribuciones en los datos del usuario.

Pendiente: ejecutar la migración contra PostgreSQL y validar el recorrido con una extensión real. Los contratos no cambiaron en esta entrega; se ejercitan en la suite integrada. El alcance sigue siendo Hardhat y activos de prueba.
