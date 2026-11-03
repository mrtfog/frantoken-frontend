# Flujo de frontend del MVP

Actualizado: 2026-11-02. [Alcance aprobado](../business/MVP-ACADEMICO.md), [ejecución](ACADEMIC-MVP-RUNBOOK.md), [pruebas](../testing/ACADEMIC-MVP.md).

| Pantalla | Fuente y acción |
|---|---|
| `/registro`, `/ingresar` | SessionRepository → Express JWT; GET session valida la sesión guardada; 401 elimina token/caché. |
| `/mi-cuenta/configuracion` | AccountRepository → SQL; documentación mínima y aviso de revisión manual. |
| `/mi-cuenta` | Resumen de tenencias y solicitudes consultadas independientemente; un fallo de cadena no oculta las solicitudes ni se representa como saldo cero. |
| `/marketplace`, `/marketplace/[slug]` | Proyectos de Express, incluido cada nuevo proyecto publicado. Precio/disponibilidad/estado y panel de compra. |
| `/mi-cuenta/tokens` | GET account/investment; balances, ingresos y eventos de cadena. Wallet firma cobro. |
| Abrir franquicia | Formulario básico de dos pasos, borrador y envío; sin historial obligatorio. ID/estado devueltos por Express. |
| `/mi-cuenta/solicitudes` | Listado propio de estados/notas y enlace al proyecto publicado. |
| `/administracion` | Rol admin de sesión; revisión privada de perfiles, aprobación/observación/publicación, inicio/cierre y reparto mensual. Express revalida permisos. |

Capas: vistas presentacionales reutilizan controles/skeletons y Motion con movimiento reducido; contenedores coordinan sesión/estados; servicios validan operaciones; repositorios acceden a API y wallet. El catálogo de detalle se resuelve dinámicamente, sin lista estática de slugs. `NEXT_PUBLIC_API_URL` es el origen de Express (sin `/api`). Vacío permite vista previa, no inversión operativa.

La wallet firma únicamente prueba de vínculo, aceptación C4 y reclamo. El pago simulado, verificador y admin técnico están en Express. `/api/mvp` devuelve 410; no hay segundo coordinador Next ni claves de servidor en la UI.

Una referencia pendiente se guarda por despliegue/proyecto/wallet; el botón de recuperación reusa la cantidad, incluso si el cupo quedó agotado. Los estados confirmado/error se muestran tras respuesta. Un error de red no se presenta como compra emitida; se conserva la referencia para recuperar.

Las solicitudes usan el ID de SQL. El costo estimado, la marca declarada y los datos del perfil no prueban acuerdos comerciales. El formulario no determina cupo, retorno ni apertura real. Un mismo usuario puede invertir y presentar solicitudes.
