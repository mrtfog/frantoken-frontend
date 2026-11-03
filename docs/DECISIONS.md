# Registro de decisiones web pendientes

## WEB-MVP-02 — Implementación local autorizada

- Estado: implementada en `feat/academic-mvp` desde `develop`, 2026-11-01.
- Evidencia: instrucción posterior del usuario de implementar frontend y blockchain en ramas nuevas desde develop; no solicita cambios en el backend separado.
- Decisión técnica: `/api/mvp` como coordinador local de compra simulada con firma de wallet, sin integrar bancos ni compartir claves de usuario. `/administracion` exige la wallet del owner para las acciones privilegiadas. El saldo y los movimientos se consultan en cadena.
- El acceso por email conserva la navegación demo; no es credencial de autorización económica. La firma acredita el control de wallet para cada acción. El build mantiene chequeo de tipos por la API de TypeScript 5, mediante la opción documentada `experimental.useTypeScriptCli: false`.
- Detalle y límites: [guía](architecture/ACADEMIC-MVP-RUNBOOK.md) y [evidencia](testing/ACADEMIC-MVP.md).

## WEB-MVP-01 — Alcance académico confirmado

- Estado: **APROBADO para documentación y alcance del MVP; implementación pendiente**.
- Responsable de la definición: usuario del proyecto. Fecha: 2026-11-01.
- Evidencia: confirmación explícita transcrita en [MVP académico](business/MVP-ACADEMICO.md#fuente-autoridad-y-límites).
- Decisión: recorrido catálogo → compra simulada a USD 10 → emisión C4 → operación manual → distribución mensual manual → reclamo, sin transferencias, en Hardhat local y con activo de pago de prueba.
- Aplicación web: [recorrido y criterios de frontend](architecture/MVP-ACADEMICO.md).

WEB-04, WEB-05, WEB-06 y WEB-10 tienen las definiciones anteriores aprobadas para la demostración. Sus datos y aprobaciones para oferta real siguen pendientes. Las descripciones de prototipos que siguen son antecedentes de implementación, no restricciones que reabran esta confirmación ni afirmaciones de compra ya funcional.

Este registro sigue los bloqueos de publicación enumerados en [Information Architecture](spec/INFORMATION-ARCHITECTURE.md#información-del-negocio-pendiente--bloqueo-de-publicación). Esos bloqueos fueron redactados para una web de inmuebles; el [modelo de negocio vigente](business/BUSINESS-LOGIC.md) exige adaptarlos a franquicias. Los IDs `WEB-*` son distintos de los `BUS-*` de [decisiones de negocio](business/DECISIONS.md). No concede aprobaciones. Una decisión se marca **confirmada** solo con responsable, fecha y enlace a evidencia o aprobación; las condiciones sensibles requieren la revisión competente definida por el negocio.

| ID | Decisión a confirmar | Estado | Responsable / evidencia |
|---|---|---|---|
| WEB-01 | Identidad, entidad legal, jurisdicciones y contacto | Pendiente | — |
| WEB-02 | Naturaleza del producto, derechos, roles y límites para copy público | Parcial: secuencia y actores declarados; derechos y condiciones pendientes | [Business Logic](business/BUSINESS-LOGIC.md) |
| WEB-03 | Público, elegibilidad y requisitos de verificación | Pendiente | — |
| WEB-04 | Catálogo de proyectos de franquicia y emisiones, estados, disponibilidad y origen de datos | Pendiente | — |
| WEB-05 | Precio, costos, distribución, impuestos y documentos por emisión | Pendiente | — |
| WEB-06 | Mecanismo y límites de salida o negociación, si existe | Pendiente | — |
| WEB-07 | Métricas, metodología, fuentes, períodos y frescura | Pendiente | — |
| WEB-08 | Operadora, fiduciario y demás responsables; derechos de medios y acceso a documentos | Pendiente | — |
| WEB-09 | Riesgos, conflictos, incidencias y revisión | Pendiente | — |
| WEB-10 | Registro, acceso, continuidad de contexto y servicios reales | Pendiente | — |
| WEB-11 | Soporte, plazos confirmados, formularios y retención de datos | Pendiente | — |
| WEB-12 | Testimonios, logos, atribuciones y evidencia autorizada | Pendiente | — |
| WEB-13 | Destino de la antigua ruta de propietarios de inmuebles; no activarla por analogía | Pendiente | — |
| WEB-14 | Licencias tipográficas, assets propios, textos, traducciones y política de accesibilidad y movimiento | Pendiente | — |
| WEB-15 | Adaptar rutas, entidades, filtros, fichas, CTA y documentos de `spec/` desde inmuebles a franquicias y emisiones | Pendiente | [Business Logic](business/BUSINESS-LOGIC.md) |

Las funciones opcionales de mercado, escenarios y comparación quedan condicionadas por las decisiones aplicables de producto, datos y metodología en WEB-02, WEB-06 y WEB-07; su activación se especifica en [Information Architecture](spec/INFORMATION-ARCHITECTURE.md) y [Page Blueprints](spec/PAGE-BLUEPRINTS.md), sujetos a WEB-15.

## Propuesta implementada en la homepage

La homepage de esta iteración usa una identidad visual editorial propia, textos conceptuales sobre el modelo declarado y navegación por secciones. Es una **propuesta de diseño y contenido**, no una confirmación de WEB-01, WEB-02, WEB-14 o WEB-15. No presenta proyectos, precios, rentabilidades, disponibilidad, registro ni captación. Antes de publicar una oferta o afirmar operaciones reales, siguen pendientes las aprobaciones y fuentes indicadas arriba y en [las decisiones del negocio](business/DECISIONS.md).

La refactorización de la homepage aplica el [UI Contract](design/UI-CONTRACT.md): reutiliza las piezas comunes, distribuye los estilos con Tailwind, limita los componentes cliente a animaciones e interacción y mantiene un skeleton de ruta. Es un cambio de implementación; no confirma datos ni condiciones de negocio pendientes.

## Prototipo de marketplace

La primera iteración de `/marketplace` mostraba seis proyectos ficticios con valores de token ilustrativos. El 25-10-2026, por pedido del usuario, se reemplazaron por cuatro **marcas reales que publican programas de franquicia**: McDonald's, Burger King, Havanna y Pizza Hut. Sus fichas en `/marketplace/[slug]` son simulaciones editoriales de posibles unidades, no franquicias tokenizadas existentes. Búsqueda y filtros operan sobre datos locales. La sección de marcas muestra referencias, sin atribuirles confianza, alianza o autorización a FranToken. No se confirmaron compañías colaboradoras. Los iconos de McDonald's, Burger King y Pizza Hut se cargan desde [Simple Icons](https://simpleicons.org/); Havanna queda sin logo hasta contar con un asset autorizado, pues sus términos no acreditan permiso para reproducirlo.

Cada ficha separa información de la empresa y de su formato de franquicia, un gráfico de ROI neto **anualizado** con números inventados para probar la visualización, variables por zona, riesgos, estado de oferta y fuente oficial. El CTA «Comprar token · demo» lleva a un formulario de registro simulado: no crea una cuenta, cobra, reserva ni emite. Las rutas `/ingresar` y `/registro` solo demuestran la interfaz y no envían datos. Precio, derechos, emisor, documentos, disponibilidad y métricas reales permanecen sin definir. WEB-04, WEB-05, WEB-07, WEB-10, WEB-12 y WEB-15 siguen pendientes para publicar un catálogo o una oferta real.

En el ajuste posterior se quitaron los monogramas superpuestos, se agregaron enlaces de acceso al navbar compartido y el gráfico se implementó con Recharts 3.10.1, usando animación que respeta movimiento reducido. Los cinco valores siguen siendo exclusivamente anualizados e inventados para esta demo.

Fuentes consultadas el 25-10-2026 para verificar únicamente que las marcas publican información de franquicias: [McDonald's](https://corporate.mcdonalds.com/corpmcd/franchising-overview/global-franchising.html), [Burger King](https://franchising.bk.com/), [Havanna](https://havanna.com.ar/atencion-al-cliente/franquicias) y [Pizza Hut](https://franchise.pizzahut.com/). La [restricción de Havanna sobre el uso de sus logos](https://tienda.havanna.com.ar/terminos-y-condiciones/) no autoriza su reproducción en este prototipo.

## Prototipo de cuenta y solicitud de franquicia

Las rutas `/ingresar`, `/mi-cuenta`, `/mi-cuenta/tokens`, `/mi-cuenta/configuracion` y `/abrir-franquicia` implementan un recorrido **dummy** solicitado por el usuario. El acceso acepta un email válido y una contraseña de al menos ocho caracteres; no autentica identidades ni guarda la contraseña. La sesión, el perfil, los borradores y las solicitudes se guardan en `localStorage` del navegador. El historial de compras de tokens es fijo y ficticio. El formulario de tres etapas recopila identidad de la franquicia, costo estimado, historial declarado, fuente, operadora prevista y descripción; su envío solo crea un registro local. Todos los estados y montos se etiquetan como demo y las rutas llevan `noindex`.

La implementación propone contratos de repositorio para reemplazar el almacenamiento local por Supabase, sin declarar aprobados el registro, la oferta, la compra, la apertura ni el tratamiento real de datos. WEB-02–WEB-11 y WEB-15, según correspondan, siguen pendientes. Antes de habilitar usuarios y operaciones reales hacen falta autenticación y autorización de servidor, reglas de acceso a datos, protección de rutas, política de datos, entidades y condiciones de producto aprobadas. La [nota de integración](architecture/ACCOUNT-DEMO.md) detalla los puntos de reemplazo.

Para cada confirmación futura, registrar aquí la decisión concreta, su alcance, responsable, fecha, enlace a la fuente y documentos `spec/` afectados. Si una decisión cambia, conservar el enlace a la versión anterior y señalar qué contenido necesita revisión.

## MVP-2026-11-02 — Integración única Express y publicación de solicitudes

Estado: implementado dentro del alcance académico solicitado. Instrucción vigente del usuario: realizar los cambios necesarios en las ramas actuales; backend en rama nueva desde develop. Complementa el alcance aprobado y sustituye la decisión técnica anterior del gateway Next para esta demo.

Express autentica JWT, comprueba perfil/aprobación y vincula wallets por desafío firmado. Admin y verificador usan firmantes distintos del manifiesto. La misma cuenta puede invertir y solicitar franquicias; no se agrega un rol excluyente. Perfil en SQL, sin documentación personal en cadena.

La publicación necesita token+C4 para que una solicitud aprobada pueda comprarse y cobrar. Se elige una fábrica local con clave de proyecto idempotente y deployers separados por tamaño de bytecode. Se conserva C3 firmado de prueba. No se agrega cálculo de campañas, caja, ROI ni estructura jurídica real. Precio 1000 centavos USD; ingresos mUSDC seis decimales.

La migración es aditiva; el seed no genera compras/repartos. Los endpoints alternativos de escritura quedan 410. Reintentos se concilian con eventos y claves únicas; no hay fallback que confirme derechos solo en base de datos. La cola del MVP presupone un proceso escritor. Reiniciar Hardhat exige una base de prueba nueva para una nueva presentación, sin borrado automático.

Evidencia: 58 tests de contratos y 14 escenarios integrados con SQL y EVM reales en memoria. Límites: sin prueba visual/TCP ni ejecución contra servidor MySQL/PostgreSQL; no se prueba uso con valor real. [Flujo vigente](business/MVP-ACADEMICO.md).

## WEB-2026-11-02 — Acceso y registro con contenido de producto

Estado: implementado por pedido del usuario. `/ingresar` y `/registro` comparten la composición visual del anterior `AuthDemo.tsx`, con cabecera, banner, pie y controles existentes. Se reemplazan los textos de demostración de los formularios y sus metadatos por indicaciones de acceso y creación de cuenta, y se agregan enlaces entre ambos recorridos.

El contenedor de autenticación coordina React Hook Form y la sesión existente. El registro valida nombre visible (2–120 caracteres), correo y contraseña (8–200 caracteres), conserva los errores del backend y redirige a completar el perfil tras la creación de cuenta. La integración usa `SessionRepository` y el endpoint Express `/api/auth/register` cuando `NEXT_PUBLIC_API_URL` está configurada, según el [flujo vigente](architecture/MVP-ACADEMICO.md). La actualización editorial no cambia el alcance académico ni las condiciones de inversión.

## WEB-2026-11-03 — Persistencia conjunta de perfil y usuario

Estado: implementado por pedido del usuario. `Profile.container.tsx` coordina carga, validación, guardado y errores; `Profile.tsx` presenta los controles y estados. La validación compartida entre formulario y servicio coincide con los límites del backend, normaliza CUIL y espacios, y rechaza fechas inexistentes o futuras con mensajes por campo.

PUT `/api/account/profile` persiste perfil, nombre visible del usuario y revisión en una transacción Express/SQL y devuelve `{profile,session}`. El repositorio actualiza la caché y los suscriptores de sesión; el formulario usa los valores confirmados. Se elimina la segunda escritura desde esta pantalla a `/api/auth/display-name`, evitando guardados parciales. La carga depende del ID de usuario, por lo que actualizar la sesión no vuelve a cargar el formulario. En la vista previa sin API se conserva persistencia local, identificada explícitamente en pantalla.

Fuentes: contrato implementado de Express y [flujo vigente del MVP](architecture/MVP-ACADEMICO.md). Evidencia: [verificación de perfil y sesión](testing/ACADEMIC-MVP.md#actualización-2026-11-03--perfil-y-sesión); no cambia el modelo de negocio ni la revisión manual.

## WEB-2026-11-03 — Red local y separación del resumen de cuenta

Estado: implementado a partir de los errores informados por el usuario. El entorno observado tenía blockchain deshabilitada, ningún nodo en 8545 y ningún manifiesto académico. Se inició el nodo Hardhat en loopback, se desplegaron los contratos y se importó el catálogo en SQL después de verificar que no había compras ni proyectos con contratos. La configuración operativa queda en `.env.local`, ignorado por Git. Las comprobaciones HTTP de catálogo e inversión respondieron 200 con cuatro proyectos y chain ID 31337.

`/mi-cuenta` vuelve a usar el resumen de cuenta; consulta solicitudes y tenencias de manera independiente. Una caída de cadena deja saldos no disponibles y permite ver las solicitudes que sí pudieron consultarse. `/mi-cuenta/tokens` conserva el panel de tokens e ingresos.

La conexión de wallet solicita cambio a Hardhat local y, ante red desconocida, agregado seguido de selección. Verifica la red antes de solicitar cuentas o firma, maneja rechazo y solicitud pendiente, e impide conectar mientras el snapshot no está disponible. Cambiar de cuenta o red elimina la conexión activa; una wallet vinculada en SQL no se presenta como conectada en el navegador. La consulta del snapshot no depende de esa conexión activa, evitando recargas que la restablezcan incorrectamente.

Fuentes: [flujo del MVP](architecture/MVP-ACADEMICO.md), implementación y [gestión oficial de redes de MetaMask](https://docs.metamask.io/metamask-connect/evm/guides/manage-networks/). Evidencia y límites en [verificación de conectividad](testing/ACADEMIC-MVP.md#actualización-2026-11-03--conectividad-blockchain-y-wallet).
