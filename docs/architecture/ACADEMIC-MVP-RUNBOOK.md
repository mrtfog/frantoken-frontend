# Ejecutar el MVP académico local

La rama `feat/academic-mvp` parte de `develop` e incorpora las definiciones aprobadas. El recorrido usa contratos reales en Hardhat con pago de compra simulado y token de pago de prueba. No requiere cambios en el repositorio backend: el coordinador local vive en las rutas de servidor Next.js, no en el navegador.

## Preparación

Se requieren los repositorios `frantoken-frontend` y `FranToken_Blockchain` como carpetas hermanas, Node compatible con sus manifiestos, las dependencias instaladas y una wallet EVM del navegador. El manifiesto generado solo contiene direcciones y referencias públicas; nunca contiene claves. El frontend agrega `ethers` 6.17.0 para comunicarse con la wallet y el nodo.

1. En blockchain, ejecutar `npm run node` y mantenerlo abierto. Escucha en `http://127.0.0.1:8545`; usar únicamente Hardhat local, chain ID **31337**.
2. En otra terminal de blockchain, ejecutar `npm run deploy:academic`. Compila y despliega cuatro proyectos ilustrativos vinculados a los slugs del catálogo, C3 firmado, C4 como controlador exclusivo y un token de pago de prueba. Escribe `deployments/academic-local.json`, ignorado por Git.
3. En frontend, copiar `.env.academic.example` a `.env.local` o definir `MVP_ENABLED=true` en el entorno. Ajustar `MVP_MANIFEST_PATH` si las carpetas no son hermanas. Ejecutar `pnpm dev`.
4. Configurar la wallet en Hardhat local, chain ID 31337, RPC `http://127.0.0.1:8545`, moneda ETH de prueba. Usar exclusivamente cuentas desechables de Hardhat, nunca wallets con fondos reales.

El despliegue usa las cuentas locales por posición: **0 administra**, 1 representa el vehículo de prueba, 2 firma C3 como plataforma y **3 verifica pagos simulados**. El resto sirve como inversores de prueba. La consola de Hardhat provee sus cuentas públicas de demostración; no copiar esas claves a este repositorio ni reutilizarlas en otras redes. Todas las cuentas locales reciben habilitación demo; una wallet externa necesita ETH de prueba y habilitación manual por administrador.

Cada proyecto se publica con 1.000 tokens enteros disponibles como dato ficticio del fixture, a USD 10 de referencia por unidad. El administrador recibe 1.000.000 mUSDC de prueba para fondear distribuciones. Son parámetros de la presentación en `scripts/deploy-academic.js`, sin representar condiciones comerciales. C3 conserva el cálculo ilustrativo del 0,5 % y no cobra dinero real.

## Demostración paso a paso

1. Ingresar desde `/ingresar` con email de prueba y una contraseña ficticia de ocho caracteres. Este acceso mantiene la navegación demo; la autorización de las operaciones depende de la firma de wallet, no de localStorage.
2. Abrir una ficha desde `/marketplace`, conectar una wallet inversora, revisar precio/estado/disponibilidad y aceptar los términos en C4 mediante la wallet.
3. Elegir cantidad y confirmar el pago simulado. La wallet firma la solicitud; el servidor comprueba origen, despliegue, vencimiento y payload y usa el verificador local para llamar C4. El principal es N × USD 10; no hay débito bancario ni cobro de mUSDC por la compra.
4. Consultar saldo y compra confirmada en la ficha o `/mi-cuenta/tokens`. Conservar el hash visible como comprobante técnico de prueba.
5. En `/administracion`, conectar la cuenta 0. Iniciar operación de la franquicia. Seleccionar un mes e importe positivo de mUSDC, con hasta seis decimales, y fondear/distribuir. Los meses pueden simularse; no hay cron ni cierre contable automático.
6. Volver a la wallet inversora, reconectar y actualizar. Reclamar el saldo disponible; el inversor firma y recibe mUSDC de prueba. Puede agregar el contrato `paymentToken` del manifiesto a su wallet para verlo allí.
7. Repetir con otro mes o con una segunda wallet. Una compra posterior no recibe ingresos ya asignados. El mismo mes no se acredita dos veces y las transferencias entre inversores revierten on-chain.
8. Cerrar una franquicia desde administración: cesan compras/distribuciones nuevas, pero los ingresos anteriores siguen disponibles para reclamo. El cierre es irreversible en esa instancia y no liquida un fideicomiso real.

El saldo y los movimientos se leen de contratos/eventos, sin mezclar tenencias fijas históricas de la cuenta demo. El gas se informa por separado en ETH de prueba: el usuario paga aceptación/reclamo con su cuenta local; la cuenta verificadora paga la emisión. El administrador paga fondeo/aprobación y distribución.

## Fallas, reintentos y límites

- Se persiste en el navegador la referencia de compra antes del envío. Si se pierde la respuesta, reintentar **la misma cantidad** recupera el evento C4 sin doble emisión. Un payload diferente con igual referencia se rechaza.
- Si la wallet rechaza la firma o falta un requisito, corregirlo y reintentar la compra pendiente. No borrar su referencia para resolver un resultado incierto: consultar primero la cadena.
- Una distribución usa franquicia/período único on-chain. Ante respuesta perdida, actualizar el historial; volver a enviarla no vuelve a acreditar ese mes.
- La wallet solicita firma para cada acción. Cambiar cuenta o red obliga a reconectar. Las acciones de administración verifican la wallet 0 en el servidor y los roles del contrato.
- Pausar el token académico bloquea emisión, distribución y reclamo. Transferir está siempre deshabilitado; pausar C4 bloquea suscripciones. Los controles heredados de congelamiento conservan ingresos, pero impiden reclamarlos hasta resolver la restricción. No hay UI de pausa/recuperación en este MVP.
- Si se reinicia Hardhat sin persistencia, se pierde la cadena de prueba: volver a desplegar y actualizar la página. El nuevo `deploymentId` invalida firmas y referencias de la demo anterior. No reutilizar un manifiesto de otra red.
- El API requiere `MVP_ENABLED=true`, RPC loopback y chain ID 31337. Las solicitudes de escritura requieren origen local coincidente y firma válida. No publicar este gateway ni exponer un nodo con cuentas desbloqueadas en Internet.
- Los períodos admiten YYYY-MM entre 2000-01 y 9999-12 para simular meses. El importe se asigna según saldos al ejecutar, sin prorratear por días. El contrato puede retener residuales inferiores a la unidad mínima de cobro; el saldo exacto se calcula en unidades enteras, sin `number` monetario.

## Verificación

- Blockchain: `npm test` (suite previa y casos del token académico).
- Frontend: `node node_modules/typescript/bin/tsc --noEmit`, `node scripts/check-architecture.mjs` y Biome sobre archivos modificados.
- Integración: `node scripts/test-academic-integration.cjs` desde frontend, con las dependencias de ambos repositorios instaladas. Ejecuta cliente wallet → handler Next → contratos reales en Hardhat en memoria, sustituyendo únicamente transporte TCP y marcador server-only de Next para el runner. No necesita abrir puertos, no modifica un despliegue existente ni requiere claves reales.

La prueba integrada no reemplaza una revisión visual con extensión de wallet en navegador. Consultar [evidencia y límites](../testing/ACADEMIC-MVP.md) para los resultados de esta implementación.
