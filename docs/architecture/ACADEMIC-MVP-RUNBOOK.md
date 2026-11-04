# Ejecutar el MVP integrado

Actualizado: 2026-11-03. Se necesitan **los tres repositorios hermanos**: `frantoken-frontend`, `FranToken-Backend` y `FranToken_Blockchain`, sus dependencias instaladas, una base MySQL/PostgreSQL y una wallet EVM. El coordinador es Express; Next no usa claves administrativas. Solo Hardhat local y activos de prueba.

## Preparación

1. Blockchain: `npm run node` en una terminal y `npm run deploy:academic` en otra. Genera `deployments/academic-local.json` (ignorado por Git), cuatro proyectos ilustrativos, C3 firmado, C4, registry, mUSDC y la fábrica para solicitudes nuevas. El manifiesto contiene direcciones públicas, no claves.
2. Backend: copiar `.env.example` a `.env`, configurar SQL, `JWT_SECRET` y `CORS_ORIGIN=http://localhost:3000`. Mantener `DB_SYNC=false`; ejecutar `npm run db:migrate:mvp` para crear tablas/añadir campos sin borrar filas. Sobre una base existente, respaldarla antes. La migración de gestión se comprobó en MariaDB local conservando los recuentos existentes.
3. En el entorno **local del backend**, definir:

   ```dotenv
   BLOCKCHAIN_ENABLED=true
   BLOCKCHAIN_ALLOW_WRITES=true
   BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
   BLOCKCHAIN_CHAIN_ID=31337
   BLOCKCHAIN_MANIFEST_PATH=../FranToken_Blockchain/deployments/academic-local.json
   BLOCKCHAIN_USE_LOCAL_ACCOUNTS=true
   ```

   Las cuentas desbloqueadas solo se aceptan con RPC loopback y opt-in explícito. Alternativamente, `BLOCKCHAIN_ADMIN_PRIVATE_KEY` y `BLOCKCHAIN_VERIFIER_PRIVATE_KEY` deben corresponder a las direcciones distintas del manifiesto; solo en servidor. No reutilizar claves de Hardhat en otras redes.
4. Backend: `npm run mvp:import` vincula los cuatro proyectos de muestra con los contratos. No crea compras, ingresos ni tenencias; no reabre franquicias. Conserva la cuenta demo legada, que ya no tiene acceso interno. Ejecutar `npm run db:migrate:franchises`, configurar `SUPERADMIN_EMAIL`/`SUPERADMIN_PASSWORD` en el entorno privado y ejecutar `npm run superadmin:create` para preparar una cuenta interna nueva; no se promueven cuentas existentes. No se autoaprueba documentación. Ejecutar `npm run dev` en otra terminal; `GET http://localhost:4000/api/health` comprueba disponibilidad HTTP.
5. Frontend: copiar `.env.example` a `.env.local` o configurar `NEXT_PUBLIC_API_URL=http://localhost:4000`, sin `/api` al final. Ejecutar `pnpm dev`. Si esa variable queda vacía solo hay vista previa con datos locales; compra/publicación requieren Express.
6. Wallet: red local 31337, RPC `http://127.0.0.1:8545`, ETH de prueba. Importar solo una cuenta pública desechable del nodo. Las posiciones son: cuenta 0 admin técnico/fondeador; 1 vehículo C3; 2 plataforma C3; 3 verificador; 4+ usuarios. Las cuentas locales están preinscritas en registry como fixture; Express igualmente exige aprobación manual del perfil para comprar. No exponer el nodo desbloqueado a Internet.

Cada fixture tiene 1000 tokens enteros a USD 10. El admin técnico recibe mUSDC de prueba para repartir. Son parámetros ilustrativos, sin alianza con marcas ni ofertas reales. Las claves nunca van al repositorio ni al navegador como configuración de servidor.

## Presentación

1. `/registro`: crear una cuenta de usuario; `/mi-cuenta/configuracion`: completar documentación ficticia y domicilio. Si esa ruta cambia, usar el enlace «Mi perfil» en la cuenta.
2. Desde una ficha en `/marketplace`, vincular la wallet: desafío de Express firmado por el usuario. En otra sesión de navegador, ingresar como superadmin en `/administracion`, revisar el perfil y aprobar la habilitación. No es necesario conectar la wallet 0 para que el admin web ordene operaciones; el backend firma con sus cuentas técnicas.
3. Usuario: aceptar términos en la wallet, ingresar cantidad y confirmar pago simulado. El backend usa JWT y la wallet vinculada; C4 emite y devuelve hash. No hay débito USD ni transferencia de mUSDC al comprar.
4. `/mi-cuenta/tokens` muestra balances e ingresos desde cadena. Ante respuesta perdida, usar «Recuperar compra pendiente»; no borrar referencias ni cambiar la cantidad para resolver un resultado incierto.
5. Creador o superadmin: abrir `/mi-cuenta/franquicias/[projectId]`, iniciar operación y proponer mes `YYYY-MM` e importe mUSDC con hasta seis decimales. El superadmin observa o ejecuta la propuesta almacenada; la cuenta técnica fondea/distribuye. El reintento recupera el resultado sin duplicarlo.
6. Usuario: actualizar y cobrar. La wallet del titular firma `claimRevenue`, recibe mUSDC y cambia disponible/cobrado. Aceptación y cobro consumen gas de esa wallet; emisión consume gas del verificador; fondeo/reparto, del admin técnico.
7. El mismo usuario puede ir a «Abrir una franquicia», completar la solicitud básica sin tres ejercicios históricos y verla en `/mi-cuenta/solicitudes`. La confirmación muestra el ID real y el estado.
8. Superadmin en `/administracion/franquicias`: aprobar/observar con nota; publicar una solicitud aprobada con símbolo y cupo entero. Se crea token+C4 y aparece automáticamente en el catálogo, comprable con el mismo flujo. La inversión estimada no calcula el cupo. Una publicación pendiente admite reintento con los mismos parámetros.
9. El creador puede corregir/reenviar desde el detalle de su solicitud hasta comenzar la publicación. Cada cambio invalida la aprobación previa. Cerrar desde la gestión de franquicia detiene nuevas compras/repartos; conserva cobro de ingresos anteriores. El cierre no se revierte ni liquida un vehículo real.

## Reintentos, datos y reinicios

- SQL guarda compras/repartos y cadena guarda balances/eventos. `pending` significa resultado no confirmado, no fracaso demostrado. No editar esas filas para aparentar una emisión/cobro.
- Editar identidad/domicilio revoca aprobación para nuevas compras. El admin vuelve a revisar; tokens e ingresos existentes permanecen. No se permite cambiar la wallet cuando hay compras pendientes/confirmadas.
- El seed conserva filas existentes y no reabre proyectos. Cambiar manifiesto importa los fixtures, no migra tokens, derechos, usuarios ni solicitudes de una cadena anterior.
- **Reiniciar Hardhat pierde la cadena.** Para una presentación nueva, redesplegar y usar una base de prueba nueva, volver a migrar/importar y reiniciar backend/frontend. No mezclar compras/distribuciones de otro despliegue con los contratos nuevos ni borrar automáticamente datos existentes. El `deploymentId` cambia las referencias de compras del navegador; por sí solo no migra SQL.
- No hay banco, scheduler ni índice histórico externo. Las consultas de eventos desde `fromBlock` son suficientes para la cadena pequeña de la demo. No ejecutar múltiples procesos escritores como configuración de este MVP.
- Los endpoints antiguos de escritura `/api/blockchain/*` y `/api/mvp` están retirados (410). No usarlos para habilitar wallets, emitir o repartir.

## Verificación

Backend: `npm run build`, `npm run typecheck:scripts` y `npm run test:mvp`. Blockchain: `npm test`. Frontend: `pnpm typecheck`, `node scripts/check-architecture.mjs`, `pnpm lint` sobre el alcance y `pnpm build`. Para el runner integrado se requiere **Node 24** por `node:sqlite`; llama los clientes reales de frontend, Express/JWT, Sequelize/SQL y contratos Hardhat en memoria, sin abrir puertos. El mismo test se invoca desde frontend con `node scripts/test-academic-integration.cjs`.

Ver evidencia y limitaciones en el documento de pruebas del frontend. Se verificaron login/listados por HTTP y navegador en escritorio/móvil; las escrituras de la prueba visual usaron respuestas controladas. Falta comprobar una extensión real y PostgreSQL. No se usan fondos reales.

Consultar [gestión de franquicias y permisos](FRANCHISE-MANAGEMENT.md) para rutas, versiones, migración y acceso interno.
