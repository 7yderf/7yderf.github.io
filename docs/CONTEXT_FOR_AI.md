# Contexto para la IA — Estructura Visual (sc-*)

> Este documento contiene las reglas, filosofia y convenciones del sistema de clases
> semanticas `sc-*` usado en este proyecto para interpretar disenos.
> Leelo COMPLETO antes de construir una pagina o seccion nueva.
>
> Adaptado del metodo `pipeline-html` (`refactor-secure-center/pipeline-html/docs`).
> La metodologia y el CSS son identicos — lo unico que cambia es la capa de
> implementacion: aqui vive dentro de componentes `.vue` (Nuxt), no en HTML suelto.

---

## Filosofia

### La Idea Central

Las etiquetas semanticas de HTML tienen significado inherente: `<header>` es una cabecera, `<article>` agrupa contenido, `<section>` es una unidad de contenido. Este sistema traduce ese significado semantico en clases CSS (`sc-*`) para que el mismo vocabulario estructural funcione en cualquier contexto — incluyendo un `<template>` de Vue, donde es facil terminar con "div soup".

### Sistema de Dos Capas

```
Capa 1: clases sc-*   → QUE es el elemento (rol estructural)
Capa 2: Tailwind       → COMO se ve en este contexto (propiedades visuales)
```

Estas capas no compiten. `sc-*` provee el esqueleto. Tailwind provee la piel.

### Por Que Existe Esto

Al interpretar un diseno (captura, wireframe, Figma), el primer paso es descomponerlo en zonas estructurales. El vocabulario `sc-*` da una forma estandar de nombrar esas zonas. En lugar de "un div con flex que contiene otros dos divs", dices "un sc-article con dos sc-sections". Esto hace que el template Vue sea:

1. **Legible** — sabes QUE es cada elemento sin leer las clases de Tailwind
2. **Consistente** — el mismo vocabulario en cada pagina y cada seccion
3. **Limpio** — sin wrappers innecesarios, sin div soup
4. **Componentizable** — mapea directamente a subcomponentes cuando una zona crece

---

## El Sistema de Clases sc-*

### Catalogo

| Clase | Rol estructural | CSS (minimo) |
|---|---|---|
| `sc-header` | Cabecera de pagina / zona hero | `display: flex; width: 100%;` |
| `sc-footer` | Pie de pagina | `display: flex; width: 100%;` |
| `sc-nav` | Contenedor de navegacion | `display: flex;` |
| `sc-main` | Area de contenido principal | `display: flex; flex-grow: 1;` |
| `sc-aside` | Panel complementario / sidebar | `flex-grow: 1;` |
| `sc-article` | Agrupador de contenido (sostiene hijos) | `display: flex; flex-grow: 1;` |
| `sc-section` | Unidad de contenido (bloque atomico) | `flex-grow: 1;` |
| `sc-figure` | Contenedor de media | `width: 100%;` |

Estas reglas ya estan cargadas globalmente en este proyecto — ver [Donde vive el CSS](#donde-vive-el-css-en-este-proyecto).

### Reglas

1. **Las clases sc-* contienen SOLO CSS estructural.** Sin colores, sin espaciado, sin bordes, sin alturas, sin direcciones. Eso va en Tailwind.

2. **sc-article AGRUPA. sc-section ES.** Si contiene multiples hijos, es un article. Si es un bloque de contenido individual, es un section.

3. **El anidamiento sigue logica semantica:**
   - `sc-section` dentro de `sc-article` (card en una fila) — SI
   - `sc-section` directo en body/main (zona full-width) — SI
   - `sc-article` dentro de `sc-section` (fila dentro de una zona) — SI
   - `sc-article` dentro de `sc-article` — EVITAR a menos que este claramente justificado

4. **La direccion NO es parte de la clase.** Un `sc-article` puede ser `flex-row` o `flex-col` — eso es trabajo de Tailwind, no de la clase.

5. **El ancho/alto NO es parte de la clase** (excepto `width: 100%` para header/footer que siempre son full-width). Anchos especificos como `w-1/2`, `w-[70%]` van en Tailwind.

---

## Protocolo de Interpretacion de Diseno

Cuando se recibe un diseno (captura, wireframe, mockup):

### Paso 1: Identificar zonas
Descomponer el diseno en zonas estructurales. Preguntar: cuales son los bloques principales de esta pagina o seccion?

### Paso 2: Asignar roles
Cada zona recibe una clase sc-* segun lo que ES:
- Barra full-width arriba? → `sc-header`
- Area de contenido principal? → `sc-main` (o `sc-section` si son secciones full-width apiladas, el caso tipico de una landing)
- Sidebar? → `sc-aside`
- Grupo de cards/columnas? → `sc-article`
- Card/bloque individual? → `sc-section`
- Imagen con caption? → `sc-figure`

### Paso 3: Agregar Tailwind
Direccion, espaciado, colores, tamanos, bordes — todo Tailwind (tokens definidos en `src/assets/tailwind.css`).

### Paso 4: Validar limpieza
- Es necesario cada elemento? Eliminar wrappers innecesarios.
- Tiene cada elemento un rol claro? Si no, reconsiderar.
- La seccion crecio demasiado? Extraerla a su propio componente en `src/components/sections/`.

---

## Convenciones de Trabajo en Nuxt

### Donde vive el CSS en este proyecto

Las clases `sc-*` estan definidas en `src/assets/scss/style.scss` (dentro de `@layer base`), que se carga globalmente vía el arreglo `css: []` de `nuxt.config.ts`. **No requieren ningun import por componente** — igual que Tailwind, estan disponibles en cualquier `.vue` del proyecto desde el primer render.

### Donde construir con sc-*

- **Secciones de landing** (hero, features, testimonios, CTA, footer): componentes en `src/components/sections/`, compuestos luego en `src/pages/index.vue` u otras paginas.
- **Layout de pagina** (header/nav/footer persistentes): `src/layouts/default.vue`.
- **Paginas completas**: `src/pages/*.vue`.

No existe el concepto de "carpeta de prueba" de `pipeline-html` (subcarpeta + `index.html` con Tailwind CDN) — en Nuxt cada `.vue` ya tiene Tailwind y `sc-*` disponibles sin configuracion adicional. Para prototipar un diseno nuevo, crealo directamente como componente de seccion o pagina; si no se aprueba, se borra el archivo.

### Para Imagenes e Iconos

- Placeholders durante prototipado: servicios de stock (picsum.photos, placehold.co), igual que en `pipeline-html`.
- Iconos de produccion: `@iconify/vue` (`<Icon icon="mdi:...">`), ya instalado y usado por el sistema de inputs (`src/components/inputs/`).

---

## Como Convive sc-* con el Resto del Stack

- **No reemplaza componentes Vue.** Una seccion puede seguir siendo un componente (`HeroSection.vue`) que internamente usa `sc-header`/`sc-article`/`sc-section` en su `<template>`.
- **No es un sistema de tokens.** Los tokens de color/tipografia/sombra viven aparte, en `src/assets/tailwind.css` (`@theme`) y `src/assets/scss/style.scss` (`:root`). `sc-*` es puramente sobre ROLES de layout, nunca sobre apariencia.
- **No sustituye Pinia, vee-validate ni los composables.** Esos gobiernan datos y logica; `sc-*` gobierna unicamente la estructura visual dentro del `<template>`.

---

## Conexion con Otros Proyectos

| Proyecto | Relacion |
|---|---|
| `refactor-secure-center/pipeline-html/` | Origen de esta metodologia (clases `sc-*` + protocolo de interpretacion de diseno). Documentacion fuente en `docs/`. |
| `tesseract-proyects/tesseracto-front/` | Origen de la capa visual base de este proyecto (tokens Tailwind, SCSS global, sistema de inputs) — de ahi tambien llegaron las reglas `sc-*`, ya presentes en `style.scss` antes de este documento. |
