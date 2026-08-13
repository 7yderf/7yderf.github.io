<!-- CaasAreas.vue — Zona 6. Carrusel de superposicion: la pieza central se ve
     mas grande y al frente, y las vecinas quedan escaladas y por detras en vez
     de desaparecer en los extremos.

     NO hace falta componente propio. El efecto sale de tres piezas de la
     libreria que el proyecto ya usa:
       1. slides centrados, para que siempre haya una pieza en el eje;
       2. separacion NEGATIVA entre piezas, que es lo que las hace solaparse —
          con separacion cero el escalado abre huecos en vez de superponer;
       3. escala y plano de apilado gobernados por la clase que la libreria
          pone en la pieza activa.
     La tercera es la que exige que estos estilos NO lleven scope: la libreria
     mueve las piezas a su propio arbol y el atributo de scoping no las alcanza.
     Las flechas se pintan por ::part, que es la superficie que el componente
     expone; alcanzarlas de otro modo seria depender de su marcado interno.

     El rotulo vive dentro de cada pieza y solo se muestra en la activa: asi
     acompaña a su imagen al desplazarse, en vez de ser un texto suelto que
     habria que sincronizar por indice. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold bg-gradient-to-r from-accent to-brand-violet bg-clip-text text-transparent">
      {{ t('caas.areas.title') }}
    </h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('caas.areas.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.areas.cta') }}
      </NuxtLink>
    </div>

    <div class="mx-auto mt-12 w-full max-w-6xl">
      <!-- Los parametros de una sola palabra van BINDEADOS: la libreria define
           una propiedad por parametro y el framework asigna propiedad —no
           atributo— cuando el nombre existe en el elemento, saltandose la
           coercion que si aplica la ruta de atributos. -->
      <swiper-container
        class="areas-swiper block"
        slides-per-view="auto"
        centered-slides="true"
        space-between="-64"
        :loop="true"
        :speed="600"
        :navigation="true"
        :keyboard="true"
      >
        <swiper-slide v-for="area in areas" :key="area.title">
          <figure class="sc-figure areas-card overflow-hidden">
            <img
              :src="area.image"
              :alt="area.title"
              class="block w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </figure>

          <figcaption class="areas-caption mt-6 text-center">
            <span class="block font-secondary text-3xl font-bold text-deep-ink">{{ area.title }}</span>
            <span class="mt-2 block text-xl text-text">{{ area.first }}</span>
            <span class="block text-xl text-text">{{ area.second }}</span>
          </figcaption>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AreaText {
  title: string
  first: string
  second: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const images = [
  '/images/caas/areas/1.webp',
  '/images/caas/areas/2.webp',
  '/images/caas/areas/3.webp',
  '/images/caas/areas/4.webp',
  '/images/caas/areas/5.webp',
]
const texts = useLocalizedItems<AreaText>('caas.areas.items', images.length, ['title', 'first', 'second'])
const areas = computed(() => texts.value.map((text, i) => ({ ...text, image: images[i] })))
</script>

<!-- Sin scope: la libreria reubica las piezas en su propio arbol y el atributo
     de scoping no alcanza a los descendientes que mueve. -->
<style>
.areas-swiper swiper-slide {
  width: 54%;
  position: relative;
  z-index: 1;
  scale: 0.82;
  transition:
    scale 500ms cubic-bezier(0.2, 0, 0, 1),
    filter 500ms cubic-bezier(0.2, 0, 0, 1);
  /* Las vecinas se van al fondo tambien en color, no solo en tamaño */
  filter: brightness(0.92);
}

.areas-swiper swiper-slide.swiper-slide-active {
  z-index: 3;
  scale: 1;
  filter: none;
}

/* El radio grande y desigual es parte del lenguaje de la referencia */
.areas-card {
  border-radius: 12rem 12rem 12rem 12rem / 8rem 8rem 8rem 8rem;
}

/* Solo el rotulo de la pieza activa se lee; los de las vecinas quedarian
   partidos por el solape. */
.areas-caption {
  opacity: 0;
  transition: opacity 400ms cubic-bezier(0.2, 0, 0, 1);
}

.areas-swiper swiper-slide.swiper-slide-active .areas-caption {
  opacity: 1;
}

/* Flechas: superficie expuesta por el componente, no su marcado interno. */
.areas-swiper::part(button-prev),
.areas-swiper::part(button-next) {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 9999px;
  background-color: var(--color-primary-soft);
  color: var(--color-brand-violet);
  --swiper-navigation-size: 1.8rem;
}

@media (prefers-reduced-motion: reduce) {
  .areas-swiper swiper-slide,
  .areas-caption {
    transition: none;
  }
}
</style>
