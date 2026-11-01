# Verificación del MVP académico

Fecha: 2026-11-01. Alcance: ramas `feat/academic-mvp`, creadas desde `develop` local de frontend y blockchain. La actualización remota no pudo verificarse por DNS de GitHub.

| Comprobación | Resultado y alcance |
|---|---|
| Suite blockchain `npm test` | **57 pasan**: suite general previa y seis casos nuevos de MVP (emisión/roles, requisitos, transferencias, períodos/fondos, prorrata/compra posterior/cobro y cierre). |
| `node scripts/test-academic-integration.cjs` | **Ocho escenarios pasan** con cliente wallet, handler Next y contratos reales desplegados en Hardhat en memoria: compra/términos, recuperación, autorización, operación/distribución, reclamo, firmas/origen y cierre. |
| `node node_modules/typescript/bin/tsc --noEmit` | Pasa con chequeo estricto de tipos. |
| `node scripts/check-architecture.mjs` | Pasa; revisados límites de feature, contenedor/presentación, servicios/repositorios, tipos y componentes reutilizados. |
| Biome sobre archivos modificados | Pasa. No se reformatearon archivos ajenos. |
| `node node_modules/next/dist/bin/next build --webpack` | Pasa, incluido chequeo de tipos y generación de páginas; `/api/mvp` dinámica y `/administracion` incluida. |
| Nodo TCP y navegador con extensión | **No ejecutado**: el entorno rechaza escuchar en 127.0.0.1:8545 con EPERM. Sin revisión visual móvil/escritorio/teclado ni firma por extensión real. |
| Operación externa o dinero real | No ejecutada; fuera del alcance académico. |

La prueba integrada reemplaza el transporte HTTP/JSON-RPC por un puente en memoria hacia la EVM de Hardhat; mantiene validación, firmas, roles, bytecode y lógica real de los contratos. El mock de wallet usa firmas de las cuentas locales mediante eth_sign, sin claves persistidas. No es un test del proveedor bancario ni del render visual.

Se usa ethers 6.17.0, la versión ya presente en el repositorio blockchain. Se conservaron los dos documentos del lockfile pnpm y se agregaron sus entradas con los hashes de integridad del lockfile blockchain. La instalación pnpm no pudo reejecutarse en este entorno por restricciones de escritura/red/verificación del gestor; se usó el paquete instalado en blockchain mediante un enlace local no versionado para validar tipos, build e integración. Debe verificarse `pnpm install --frozen-lockfile` en un entorno con acceso al registro antes de considerar verificada la instalación desde cero.

Los ejemplos son datos académicos: no acreditan acuerdos con las marcas, identidad real, cobro en USD, paridad de mUSDC, funcionamiento de una franquicia o rentabilidad. La guía de ejecución detalla cuentas de prueba y responsables del gas.
