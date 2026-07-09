# Principios de Estructura Visual

> Los principios que rigen la construccion de interfaces con el sistema `sc-*` en este proyecto.
> Son independientes de framework — se definieron trabajando HTML vanilla en `pipeline-html`
> y aplican igual dentro de un `<template>` de Vue.

---

## Principio 1: La Semantica como Vocabulario

Las etiquetas semanticas de HTML (`header`, `article`, `section`, `aside`, `footer`, `figure`, `nav`) tienen significado inherente. Ese significado se traslada a clases CSS (`sc-*`) para que funcione en cualquier contexto, incluyendo un `<template>` de Vue donde es facil terminar con divs anonimos.

**Regla:** Cada elemento de layout tiene un nombre que describe su ROL, no su apariencia.

**Por que funciona:** Cuando lees `sc-article`, sabes que agrupa contenido. No necesitas leer 8 clases de Tailwind para entender la estructura de la seccion.

---

## Principio 2: Separacion Esqueleto / Piel

El esqueleto (estructura, roles, comportamiento flex) vive en las clases `sc-*` (`src/assets/scss/style.scss`).
La piel (colores, espaciado, bordes, tamanos, direcciones) vive en Tailwind (`src/assets/tailwind.css`).

**Regla:** Las clases `sc-*` NUNCA contienen propiedades visuales. Tailwind NUNCA define roles estructurales.

**Por que funciona:** No hay conflictos. Las capas son aditivas. Puedes cambiar toda la apariencia de una seccion sin tocar su estructura, y viceversa.

---

## Principio 3: Agrupador vs Unidad

Hay exactamente dos roles de contenido:
- **Agrupador** (`sc-article`): sostiene multiples hijos juntos
- **Unidad** (`sc-section`): es una pieza atomica de contenido

**Regla:** Si contiene multiples hijos que son piezas independientes, es un agrupador. Si es una pieza en si misma, es una unidad.

**Por que funciona:** Elimina la ambiguedad de "que es este div". Todo elemento es o un agrupador o una unidad. No hay termino medio.

---

## Principio 4: Limpieza sobre Conveniencia

Un template limpio (pocos elementos, cada uno con rol claro) es mas valioso que un template que "funciona" con wrappers innecesarios.

**Regla:** Si un elemento solo existe para envolver otros sin razon estructural, eliminalo.

**Por que funciona:** Un `<template>` limpio se lee rapido, se extrae a subcomponente sin friccion, y no genera deuda tecnica.

---

## Principio 5: Direccion y Tamano son Variaciones, no Roles

Un `sc-article` puede ser horizontal o vertical. Un `sc-section` puede ocupar 30% o 70%. Esas son variaciones del mismo rol, no roles diferentes.

**Regla:** La direccion (`flex-row`, `flex-col`) y el tamano (`w-1/2`, `w-[70%]`) van SIEMPRE en Tailwind, nunca en la clase `sc-*`.

**Por que funciona:** El mismo `sc-article` sirve para una fila de cards Y para una columna de secciones. No necesitas `sc-article-row` y `sc-article-col` — es el mismo rol con diferente presentacion.

---

## Principio 6: Interpretar Antes de Construir

Ante un diseno, el primer paso es descomponerlo en zonas estructurales ANTES de escribir una sola linea de template.

**Regla:** Identifica zonas → asigna roles (sc-*) → despues agrega la piel (Tailwind).

**Por que funciona:** Si empiezas por la apariencia, terminas con divs anonimos estilizados. Si empiezas por la estructura, terminas con un `<template>` legible al que le agregas estilo.

---

## Metodologia vs. Implementacion en este Proyecto

| Principio | Metodologia (agnostica de framework) | Implementacion en frt-cnct-web (Nuxt/Vue) |
|---|---|---|
| Vocabulario | Clases `sc-*` en tags HTML | Clases `sc-*` en el `<template>` de un `.vue` (SFC) |
| Esqueleto/Piel | CSS + Tailwind | `style.scss` (`@layer base`) + Tailwind v4 (`tailwind.css`) |
| Agrupador/Unidad | `sc-article` / `sc-section` | Mismo — sin componentes wrapper dedicados, son clases sobre las etiquetas semanticas nativas |
| Limpieza | Pocos tags | Pocos elementos por `<template>`; secciones grandes se extraen a `src/components/sections/` |
| Direccion/Tamano | Tailwind en el tag | Igual, con posibilidad de exponerlo como prop si el componente lo necesita |

---

## Relacion con la Arquitectura del Proyecto

Estos principios rigen unicamente la ESTRUCTURA VISUAL dentro del `<template>`. No se solapan con:

- **Pinia** (`src/stores/`) — estado de la aplicacion.
- **Composables** (`src/composables/`) — logica reutilizable (alertas, etc.).
- **vee-validate + yup** (`src/components/inputs/`) — validacion de formularios.
- **@tanstack/vue-query** — data fetching.

`sc-*` nunca debe usarse para expresar estado o logica — es puramente un vocabulario de layout. Si una decision de estructura depende de datos (ej. "mostrar sc-aside solo si hay usuario logueado"), esa condicion vive en el `<script setup>` del componente; `sc-*` solo describe el rol del elemento una vez que se renderiza.
