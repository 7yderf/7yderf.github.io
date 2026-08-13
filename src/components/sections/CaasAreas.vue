<!-- CaasAreas.vue — Zona 6. Carrusel de areas.

     PRIMERA ACTIVIDAD: que se vean las cinco. La configuracion es exactamente la
     del carrusel de la vista SPEI, sin añadidos. La superposicion del diseño
     —pieza central mas grande y vecinas al fondo— es una segunda actividad y no
     esta aqui: se agrega encima cuando esta base funcione. -->
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
      <!-- centered-slides va como ATRIBUTO, no como propiedad enlazada: getParams
           lee primero las propiedades y despues los atributos, y solo el camino
           del atributo pasa por el conversor que interpreta el texto. Mismo
           camino que slides-per-view, ya probado aqui.
           Precondicion del modo circular, verificada y no asumida: el total de
           piezas debe ser >= visibles + grupo + 1 cuando se centra. Son 5 piezas
           contra 2 visibles + 1 + 1 = 4 en el corte mas ancho, y menos exigente
           en los angostos. -->
      <swiper-container
        class="areas-swiper block"
        slides-per-view="auto"
        space-between="32"
        centered-slides="true"
        :loop="true"
        :keyboard="true"
        :speed="600"
        :navigation="true"
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

          <figcaption class="mt-6 text-center">
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
/* Con slides-per-view="auto" el ancho de la pieza lo decide este CSS, y con el
   los cortes son los del proyecto. Mismo mecanismo que el carrusel de SPEI. */
.areas-swiper swiper-slide {
  height: auto;
  width: 86%;
}

@media screen and (min-width: 768px) {
  .areas-swiper swiper-slide {
    width: 58%;
  }
}

@media screen and (min-width: 1200px) {
  .areas-swiper swiper-slide {
    width: 46%;
  }
}

/* El radio grande y desigual es parte del lenguaje de la referencia */
.areas-card {
  border-radius: 12rem 12rem 12rem 12rem / 8rem 8rem 8rem 8rem;
}

/* DESVIACION 1 sobre la linea base: navegadores laterales.
   Se pintan por ::part, que es la superficie que el componente expone; llegar a
   ellos por su marcado interno seria depender de un detalle privado suyo. */
.areas-swiper {
  --swiper-navigation-size: 1.6rem;
}

.areas-swiper::part(button-prev),
.areas-swiper::part(button-next) {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 9999px;
  background-color: var(--color-primary-soft);
  color: var(--color-brand-violet);
}
</style>
