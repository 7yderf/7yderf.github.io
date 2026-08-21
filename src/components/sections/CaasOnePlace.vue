<!-- CaasOnePlace.vue — Zona 4. Tres modulos, arreglo de escritorio (fila) y
     carrusel movil (CaasOnePlaceCarousel) por debajo de 1072px -mismo umbral
     donde el flex-wrap implicito ya se rompia. La card en si (CaasOnePlaceCard)
     vive en su propio componente para que ambos arreglos rendericen la misma
     pieza -mismo estado apagado/encendido, mismas pastillas- sin duplicar
     markup ni estilos que puedan divergir.

     El nombre del modulo va en negrita dentro del propio texto traducible,
     marcado con dobles asteriscos y partido en segmentos alternos. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('caas.onePlace.title') }}</h2>
    <p class="mx-auto mt-4 max-w-3xl text-center text-ink-3">{{ t('caas.onePlace.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.onePlace.cta') }}
      </NuxtLink>
    </div>

    <div class="hidden min-[1072px]:block">
      <article class="sc-article mx-auto mt-12 w-full max-w-6xl flex-wrap items-stretch gap-6">
        <div v-for="card in cards" :key="card.title" class="min-w-[26rem] grow basis-80">
          <CaasOnePlaceCard :card="card" />
        </div>
      </article>
    </div>

    <div class="mt-12 min-[1072px]:hidden">
      <CaasOnePlaceCarousel :cards="cards" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Cantidad de pastillas por card. useLocalizedItems solo resuelve un nivel de
// indice; el anidado se arma con las mismas rutas t() indexadas que usa ese
// composable (tm() volcaria el AST compilado).
const pillsPerCard = [6, 5, 2]

// href por card, mismo criterio que CaasPaths.vue (ver decision:5:2/5:5): el
// contenido de las 2 primeras cards es -verificado item por item- el mismo
// que las 2 paginas nuevas. "Auth" no tiene vista de campaña propia todavia,
// su link se queda en contacto.
const hrefs = ['/ecosistema-cloud', '/hsm-control-security', '/contact']

const cards = computed(() =>
  pillsPerCard.map((count, i) => ({
    title: t(`caas.onePlace.cards.${i}.title`),
    subtitle: t(`caas.onePlace.cards.${i}.subtitle`),
    link: t(`caas.onePlace.cards.${i}.link`),
    href: hrefs[i],
    items: Array.from({ length: count }, (_, j) =>
      t(`caas.onePlace.cards.${i}.items.${j}`).split('**'),
    ),
  })),
)
</script>
