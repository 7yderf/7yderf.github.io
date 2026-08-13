<!-- CaasAreas.vue — Zona 6. Carrusel de superposicion: la pieza central se ve
     mas grande y al frente, y las vecinas quedan escaladas y por detras en vez
     de desaparecer en los extremos.

     SOLO EN CLIENTE. La libreria reescribe el DOM que recibe —agrega clases,
     estilos en linea y, con recorrido circular, clona piezas— y la hidratacion
     compara el HTML del servidor contra el arbol que el framework generaria.
     Un componente que muta su propio DOM no puede hidratarse: el servidor
     entrega nodos que el cliente nunca produjo. Renderizarlo solo en cliente
     elimina la comparacion en vez de intentar reconciliarla.

     El efecto NO se arma a mano con escala y separacion negativa: la libreria
     trae uno pensado para esto, que resuelve la aritmetica de profundidad,
     acercamiento y plano de apilado a la vez y se mantiene coherente a
     cualquier ancho. Hacerlo a mano exigia una separacion negativa en pixeles
     fija contra un ancho de pieza porcentual, y esa mezcla se desajusta en
     cuanto cambia el contenedor.

     Los parametros del efecto van en forma compuesta con guiones, que es la
     unica que pasa por la coercion de atributos; los de una sola palabra irian
     crudos como cadena. -->
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
      <ClientOnly>
        <swiper-container
          class="areas-swiper block"
          effect="coverflow"
          slides-per-view="auto"
          centered-slides="true"
          coverflow-effect-rotate="0"
          coverflow-effect-depth="220"
          coverflow-effect-modifier="1.8"
          coverflow-effect-stretch="-40"
          coverflow-effect-scale="0.66"
          coverflow-effect-slide-shadows="false"
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

        <!-- Reserva de alto mientras el carrusel no existe en servidor, para que
             la pagina no salte al montarse. -->
        <template #fallback>
          <div class="h-[42rem] w-full" aria-hidden="true" />
        </template>
      </ClientOnly>
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
  width: 48%;
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

/* Flechas: superficie expuesta por el componente, no su marcado interno.
   Se acercan al centro con el desplazamiento lateral que la propia libreria
   expone, para que caigan sobre el borde de la pieza activa. */
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
  .areas-caption {
    transition: none;
  }
}
</style>
