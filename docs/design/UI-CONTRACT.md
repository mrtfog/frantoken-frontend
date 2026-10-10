# Contrato de implementación visual

Este documento gobierna las pantallas nuevas y los cambios de UI de FranToken. [Design](../research/DESIGN.md) conserva observaciones de una referencia externa; sus mediciones y recomendaciones anteriores sobre SVG o bibliotecas no son automáticamente decisiones de marca. Si esas recomendaciones difieren, prevalece este contrato. Para límites de código, consultá [Code Architecture](../architecture/CODE-ARCHITECTURE.md).

## Componentes comunes y controles

- Antes de crear navbar, pie, banner, logo, tarjeta o control, buscá su equivalente en `src/components/common/` y `src/components/ui/`. La cabecera, el pie y el banner se implementan una vez y se importan en cada pantalla; configurá contenido o estado por props cuando sea necesario, preservando el mismo diseño base.
- Los controles atómicos reutilizables viven en `src/components/ui/`: `button.tsx` (acciones y enlaces con apariencia de botón), `input.tsx`, `select.tsx`, `textarea.tsx`, `skeleton.tsx` y los que realmente hagan falta. Las variantes existentes usan `clsx` para componer clases Tailwind. Elegí semántica correcta: enlace para navegación, botón para acción.
- Si un componente compartido **ya existe** y una pantalla necesita cambiar su apariencia, comportamiento o API, **preguntale al usuario antes de modificarlo**. Presentá el caso concreto y opciones breves: variante con `clsx`, nuevo componente o ajuste del diseño común. No dupliques el control ni cambies una primitiva que afecta otras páginas mientras esperás la elección. Podés avanzar con el resto de la pantalla.
- Usá iconos de `lucide-react` con tamaños, trazo y significado coherentes. No pegues SVG anónimos ni copies iconos de sitios de referencia. Un logo o ilustración SVG propia solo se acepta si su procedencia, licencia y uso de marca están claros; no la uses para reemplazar iconos comunes de la biblioteca.

## Estados de carga

- **Cada pantalla tiene skeleton** que refleje sus bloques principales. En App Router, agregá `loading.tsx` al segmento cuando corresponda y reutilizá el skeleton de la feature para zonas con carga parcial. Reservá dimensiones cercanas al contenido final para evitar saltos de layout.
- Si la pantalla usa datos mockeados y no hay fetching real, simulá una carga breve y determinista en un servicio de demo, mostrá el skeleton y marcá la información como ficticia. No llames API inexistentes ni presentes el temporizador como integración funcional. Si ya existe fetching real, el skeleton debe responder a ese estado; **no agregues demora artificial**.
- Skeletons accesibles: `aria-busy` en la región, un anuncio de estado breve y formas decorativas fuera del árbol accesible. Respetá movimiento reducido; el contenido esencial siempre termina visible aunque se desactive la animación.

## Estilo y movimiento

Aplicá [las reglas de Tailwind y Motion](../architecture/CODE-ARCHITECTURE.md#estilos-y-movimiento-de-la-ui). El movimiento acompaña jerarquía e interacción; no es la única forma de entender costos, riesgos, disponibilidad o acciones. Revisá móvil, escritorio, teclado y movimiento reducido antes de cerrar una pantalla.

En Tailwind v4, las utilidades se generan dentro de capas CSS. No pongas reglas globales sin capa como `a { color: inherit; }` sobre controles que usan `text-*`: pueden prevalecer sobre el color de la variante. Los resets globales necesarios van en `@layer base`; verificá contraste real en cada superficie.
