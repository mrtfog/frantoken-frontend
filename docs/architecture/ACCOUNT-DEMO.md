# Cuenta y franquicias: prototipo local

Estado: propuesta técnica de demostración. No hay Supabase ni backend conectados.

## Contratos que se reemplazan al integrar

| Capacidad | Contrato actual | Implementación demo | Posible destino en Supabase |
|---|---|---|---|
| Sesión | `SessionRepository` | `localStorage`, acceso por formato de campos | Supabase Auth y listener de cambios de sesión |
| Perfil | `AccountRepository.getProfile/saveProfile` | `localStorage` por email demo | Tabla de perfiles ligada a `auth.users.id` |
| Tenencias y actividad | `AccountRepository.getHoldings` | Array fijo ficticio | Vistas o consultas autorizadas de posiciones y movimientos conciliados |
| Solicitudes y borrador | `AccountRepository.getApplications/saveApplication/getDraft/saveDraft/clearDraft` | `localStorage` por email demo | Tablas de solicitudes y borradores con propiedad por usuario |

Los servicios validan el formato y transforman el formulario en un registro de solicitud. Las rutas consumen contenedores; las vistas no acceden a almacenamiento. El reemplazo de datos se concentra en los repositorios y en la configuración del proveedor de sesión.

## Antes de conectar datos reales

- Sustituir el ID demo (email) por el UUID de Auth y establecer protección de rutas y autorización en servidor; la guardia cliente actual solo controla la experiencia visual.
- Definir esquema, políticas RLS, auditoría, retención y roles para perfiles, solicitudes, posiciones y actividad. Una fila de compra debe venir de un proceso de pago/emisión conciliado, nunca de la UI.
- Definir el estado de solicitud y el circuito de revisión; “Borrador demo enviado” no representa una entrega real.
- Vincular campos económicos a moneda, período, fuente y documentos verificables. Las cifras históricas capturadas son declaraciones del solicitante.
- Resolver las decisiones `BUS-*` y `WEB-*` pertinentes antes de activar compras, ofertas, distribuciones o apertura.
