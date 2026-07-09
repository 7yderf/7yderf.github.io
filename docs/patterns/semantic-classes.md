# Patron: Clases Semanticas (sc-*)

> Catalogo completo de las clases estructurales, convenciones de uso y ejemplos de composicion.
> Los ejemplos usan sintaxis HTML — dentro de un componente Vue (`.vue`), se colocan igual
> dentro del bloque `<template>`. Las clases ya estan disponibles globalmente en todo el
> proyecto (definidas en `src/assets/scss/style.scss`, sin import por componente).

---

## Catalogo de Clases

### Bloques de Nivel Pagina

#### sc-header
**Rol:** Cabecera de pagina. Contiene branding, navegacion, y/o contenido hero.
**CSS:** `display: flex; width: 100%;`
**Siempre:** Full width. Vive en `src/layouts/default.vue` o al inicio de una pagina.
**Tailwind tipico:** `flex-col`, `items-center`, `justify-between`, `h-[120px]`, `bg-[...]`

```html
<header class="sc-header flex-col items-center bg-slate-900 py-4">
  <nav class="sc-nav ...">...</nav>
  <div class="px-12 py-16">
    <h1>Titulo hero</h1>
  </div>
</header>
```

#### sc-footer
**Rol:** Pie de pagina. Contiene copyright, links secundarios, redes sociales.
**CSS:** `display: flex; width: 100%;`
**Siempre:** Full width. Vive en `src/layouts/default.vue`.
**Tailwind tipico:** `flex-col`, `items-center`, `justify-between`, `py-8`, `bg-[...]`

```html
<footer class="sc-footer flex-col bg-slate-900 text-white py-8 px-12">
  <div class="flex w-full justify-between">...</div>
</footer>
```

#### sc-nav
**Rol:** Contenedor de navegacion.
**CSS:** `display: flex;`
**Siempre:** Dentro de sc-header o sc-footer.
**Tailwind tipico:** `flex-row`, `items-center`, `justify-between`, `w-full`, `gap-6`

```html
<nav class="sc-nav flex-row w-full items-center justify-between px-12">
  <div class="font-bold">Logo</div>
  <ul class="gap-6 items-center">
    <li><a href="#">Enlace</a></li>
  </ul>
</nav>
```

Nota: `sc-nav ul` tiene `display: flex; width: 100%;` en el CSS base.

---

### Areas de Contenido

#### sc-main
**Rol:** Area de contenido principal de la pagina.
**CSS:** `display: flex; flex-grow: 1;`
**Uso:** Cuando la pagina tiene sidebar (main + aside). En una landing tipica (secciones full-width apiladas), `sc-main` puede no ser necesario — las secciones van directo en la pagina.
**Tailwind tipico:** `w-[70%]`, `flex-wrap`, `p-8`

```html
<main class="sc-main w-[70%] flex-wrap p-8">
  <article class="sc-article ...">...</article>
</main>
```

#### sc-aside
**Rol:** Panel complementario / sidebar.
**CSS:** `flex-grow: 1;`
**Uso:** Acompana a sc-main. Si no hay sidebar, no se usa.
**Tailwind tipico:** `w-[30%]`, `p-8`

```html
<aside class="sc-aside w-[30%] p-8 bg-gray-50">
  <section class="sc-section ...">...</section>
</aside>
```

---

### Estructura de Contenido

#### sc-article
**Rol:** AGRUPA contenido. Contiene multiples hijos.
**CSS:** `display: flex; flex-grow: 1;`
**Piensa:** "Esto sostiene cosas juntas."
**Usar cuando:** Una fila de cards, un layout de dos columnas, un grupo de secciones relacionadas.
**Tailwind tipico:** `flex-row`, `flex-col`, `gap-4`, `w-full`, `items-center`

```html
<!-- Fila de cards -->
<article class="sc-article flex-row w-full gap-4">
  <section class="sc-section ...">Card 1</section>
  <section class="sc-section ...">Card 2</section>
  <section class="sc-section ...">Card 3</section>
</article>

<!-- Layout de dos columnas -->
<article class="sc-article flex-row w-full items-center">
  <section class="sc-section w-1/2 ...">Texto</section>
  <section class="sc-section w-1/2 ...">Imagen</section>
</article>
```

#### sc-section
**Rol:** ES contenido. La unidad atomica.
**CSS:** `flex-grow: 1;`
**Piensa:** "Esto es una cosa."
**Usar cuando:** Un card, un bloque de texto, un bloque de imagen, una zona tematica de pagina.
**Tailwind tipico:** `w-full`, `w-1/2`, `p-6`, `bg-white`, `border`, `rounded-lg`

```html
<!-- Como zona de pagina (full-width) -->
<section class="sc-section w-full bg-white px-12 py-16 text-center border-0">
  <h2>Titulo de Seccion</h2>
  <article class="sc-article flex-row gap-4">
    <section class="sc-section ...">Card</section>
    <section class="sc-section ...">Card</section>
  </article>
</section>

<!-- Como card dentro de un article -->
<section class="sc-section bg-white border rounded-lg p-6">
  <h3>Titulo del Card</h3>
  <p>Contenido del card</p>
</section>
```

#### sc-figure
**Rol:** Contenedor de media (imagen + caption opcional).
**CSS:** `width: 100%;`
**Tailwind tipico:** `rounded-lg`, `overflow-hidden`, `shadow-md` (o el token `shadow-flat`/`shadow-card` de este proyecto)

```html
<figure class="sc-figure rounded-lg overflow-hidden shadow-flat">
  <img src="..." alt="..." />
  <figcaption class="p-2 text-xs text-ink-3">Descripcion</figcaption>
</figure>
```

---

## Convencion de Anidamiento

### Zonas de pagina (secciones full-width apiladas — caso tipico de landing)

```
body
  ├── header.sc-header          (cabecera de pagina — src/layouts/default.vue)
  ├── section.sc-section        (zona 1 — full width — src/components/sections/*)
  │     └── article.sc-article  (agrupa hijos)
  │           ├── section.sc-section  (hijo 1)
  │           └── section.sc-section  (hijo 2)
  ├── section.sc-section        (zona 2 — full width)
  ├── section.sc-section        (zona 3 — full width)
  └── footer.sc-footer          (pie de pagina — src/layouts/default.vue)
```

### Layout de dashboard (main + sidebar)

```
body
  ├── header.sc-header
  ├── main.sc-main              (area principal ~70%)
  │     ├── article.sc-article  (grupo de contenido)
  │     │     ├── section.sc-section
  │     │     └── section.sc-section
  │     └── article.sc-article
  ├── aside.sc-aside            (sidebar ~30%)
  │     └── section.sc-section
  └── footer.sc-footer
```

### Reglas de anidamiento

| Padre | Hijo | Permitido? |
|---|---|---|
| body/pagina | sc-header, sc-section, sc-main, sc-aside, sc-footer | SI |
| sc-main | sc-article | SI |
| sc-aside | sc-section | SI |
| sc-article | sc-section | SI (caso de uso principal) |
| sc-section | sc-article | SI (zona con hijos agrupados) |
| sc-section | sc-figure | SI |
| sc-article | sc-article | EVITAR (a menos que este claramente justificado) |

---

## Ejemplos de Composicion

### Dos columnas: texto + imagen

```html
<article class="sc-article flex-row w-full items-center px-12 py-16">
  <section class="sc-section w-1/2 p-8">
    <h2>Titulo</h2>
    <p>Texto descriptivo...</p>
  </section>
  <section class="sc-section w-1/2 p-8">
    <figure class="sc-figure rounded-lg overflow-hidden">
      <img src="..." alt="..." />
    </figure>
  </section>
</article>
```

### Fila de N cards iguales

```html
<section class="sc-section w-full px-12 py-16 text-center">
  <h2>Titulo de Seccion</h2>
  <article class="sc-article flex-row w-full gap-4 mt-8">
    <section class="sc-section bg-white border rounded-lg p-6">Card 1</section>
    <section class="sc-section bg-white border rounded-lg p-6">Card 2</section>
    <section class="sc-section bg-white border rounded-lg p-6">Card 3</section>
  </article>
</section>
```

### Banner full-width / CTA

```html
<section class="sc-section w-full bg-primary px-12 py-16 text-center text-deep-ink">
  <h2>Llamada a la Accion</h2>
  <p>Descripcion</p>
  <div class="flex gap-4 justify-center mt-8">
    <a href="#" class="btn-primary">Boton 1</a>
    <a href="#" class="btn-secondary">Boton 2</a>
  </div>
</section>
```

### Seccion completa como componente Vue

Ejemplo de como una zona de landing se ve dentro de un SFC real de este proyecto:

```vue
<!-- src/components/sections/FeaturesSection.vue -->
<template>
  <section class="sc-section w-full bg-bg-second px-12 py-16 text-center">
    <h2>{{ t('features.title') }}</h2>
    <article class="sc-article flex-col gap-4 mt-8 md:flex-row">
      <section
        v-for="feature in features"
        :key="feature.id"
        class="sc-section rounded-lg border border-line bg-bg-second p-6 shadow-flat"
      >
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const features = [/* ... */]
</script>
```

---

## Uso en este Proyecto

- Las secciones de la landing (hero, features, galeria, formulario, footer) se construyen como componentes en `src/components/sections/`, usando `sc-*` para el layout y los tokens Tailwind del proyecto (`bg-primary`, `text-ink-3`, `shadow-card`, etc.) para la piel.
- El header y footer persistentes viven en `src/layouts/default.vue`.
- No hay carpeta de "disenos de prueba": para prototipar, se crea directamente el componente o la pagina; si no se aprueba, se elimina el archivo.
