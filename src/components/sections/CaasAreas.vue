<!-- CaasAreas.vue — Zona 6. Carrusel de superposicion: la pieza central se ve
     mas grande y al frente y las vecinas quedan escaladas y por detras.

     La configuracion es la MISMA que la del carrusel de la vista SPEI, que ya
     funciona, con dos añadidos que usan mecanismos ya probados ahi: un atributo
     con guiones para centrar las piezas y un booleano bindeado para las flechas.

     NO va envuelto para render solo en cliente. Con esa envoltura la libreria se
     monta despues y, como el ancho de cada pieza lo toma del CSS, llegaba a
     medir antes de que ese CSS existiera: asignaba las clases de estado pero no
     calculaba ninguna medida, y las piezas quedaban sin ancho ni posicion.

     La superposicion la gobierna el bloque de estilos de abajo sobre las clases
     de estado que la libreria expone, no un efecto tridimensional suyo. -->
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
      <swiper-container
        class="areas-swiper block"
        slides-per-view="auto"
        space-between="0"
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
/* El default es VISIBLE y a tamaño pleno; las reglas de estado solo quitan. Asi
   una pieza sin clase queda visible en vez de desaparecer. */
.areas-swiper swiper-slide {
  width: 46%;
  z-index: 1;
  transition:
    transform 500ms cubic-bezier(0.2, 0, 0, 1),
    opacity 500ms cubic-bezier(0.2, 0, 0, 1);
}

/* Las vecinas se encogen y se acercan hasta quedar tapadas casi del todo por la
   activa. El acercamiento va en porcentaje del ancho de la propia pieza, no en
   pixeles, para que se sostenga a cualquier ancho de contenedor. */
.areas-swiper swiper-slide.swiper-slide-prev {
  transform: translateX(55%) scale(0.62);
}

.areas-swiper swiper-slide.swiper-slide-next {
  transform: translateX(-55%) scale(0.62);
}

/* Planos de apilado todos POSITIVOS: uno negativo pintaria la pieza detras del
   fondo de su contexto y desapareceria en vez de quedar atras. */
.areas-swiper swiper-slide.swiper-slide-active {
  z-index: 3;
  transform: scale(1);
}

.areas-swiper swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
  opacity: 0;
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

/* Flechas: superficie expuesta por el componente, no su marcado interno */
.areas-swiper {
  --swiper-navigation-sides-offset: 8%;
  --swiper-navigation-size: 1.6rem;
}

.areas-swiper::part(button-prev),
.areas-swiper::part(button-next) {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background-color: var(--color-primary-soft);
  color: var(--color-brand-violet);
}

@media (prefers-reduced-motion: reduce) {
  .areas-swiper swiper-slide,
  .areas-caption {
    transition: none;
  }
}
</style>
