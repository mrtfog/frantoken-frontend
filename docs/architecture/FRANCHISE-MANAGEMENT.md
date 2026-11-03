# Gestión de franquicias

Implementado el 2026-11-03 desde `develop` en `feat/franchise-management`, según el plan autorizado. El alcance académico conserva Hardhat local, pago simulado y emisión inicial. No incorpora mercado secundario.

## Recorridos

| Pantalla | Actor y comportamiento |
|---|---|
| `/mi-cuenta/solicitudes` | El creador consulta estados y accede al detalle o gestión publicada. |
| `/mi-cuenta/solicitudes/[id]` | El creador o superadmin consulta datos, observaciones e historial y corrige antes de publicar. Guardar reenvía a revisión e invalida aprobación. |
| `/mi-cuenta/franquicias` | Directorio propio; el superadmin ve todas, incluidos proyectos ilustrativos sin creador. |
| `/mi-cuenta/franquicias/[projectId]` | Datos admitidos, saldos de cadena, inicio/cierre operativo, propuestas, distribuciones e historial. |
| `/administracion` | Solo superadmin: revisión y habilitación de perfiles. |
| `/administracion/franquicias` | Solo superadmin: admisión/publicación, gestión global y revisión de repartos. |

Los enlaces internos se filtran por sesión; Express vuelve a resolver al usuario desde SQL y autoriza cada recurso. El rol legado `admin` no concede acceso interno. El creador se determina por la solicitud asociada al proyecto, sin un rol global nuevo. Cambiar IDs o botones no habilita otras franquicias.

## Estados y datos

La solicitud y cada propuesta llevan `version`. Una revisión desactualizada falla con 409. Al reservar una publicación se congelan los datos; el reintento conserva símbolo y cupo. El detalle de solicitud mantiene observaciones anteriores en su historial privado.

El creador inicia operación o cierra definitivamente su franquicia. El cierre requiere confirmación y conserva ingresos anteriores. En operación puede proponer mes e importe; proponer no distribuye fondos. El superadmin observa o ejecuta el contenido almacenado. Una propuesta en ejecución bloquea correcciones y permite reintentar la conciliación. La UI separa propuesta, ejecución y cobro individual firmado por el inversor.

Si blockchain falla, el panel conserva metadatos e historial SQL, muestra cantidades desconocidas como `—` y deshabilita nuevas operaciones. No usa los contadores SQL como balances de cadena ni confirma emisiones simuladas solo en base de datos. Importes de reparto: texto decimal validado, seis decimales mUSDC; cantidades mínimas se formatean con `BigInt`, sin redondeo mediante `number`.

## Organización

`features/franchises` contiene tipos/esquemas, constantes, utilidades, servicios, repositorios, contenedores y vistas. Las rutas Next solo componen pantallas y metadatos privados. Los repositorios llaman a Express; los servicios validan formularios. Los contenedores coordinan sesión, estado, actualización y errores. Las vistas reutilizan shell, controles, iconos Lucide, skeletons y Motion con movimiento reducido.

El panel de inversión se limita a compra y cobro. Las operaciones internas ya no se mezclan con acciones de wallet. El superadmin web utiliza los firmantes técnicos del servidor: no necesita importar claves administrativas en el navegador.

Para preparar otro entorno, ejecutar en backend `npm run db:migrate:franchises`, configurar `SUPERADMIN_EMAIL` y una contraseña privada en `SUPERADMIN_PASSWORD`, y ejecutar `npm run superadmin:create`. La creación es idempotente, rechaza un correo de otro rol y conserva la contraseña de una cuenta interna existente. Las credenciales no se versionan.

Ver [evidencia y límites de pruebas](../testing/ACADEMIC-MVP.md) y [decisión aprobada](../business/MVP-ACADEMICO.md).
