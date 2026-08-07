<!-- SpeiEvolve.vue — Zona 3. Dos caminos lado a lado, cada uno una card con su
     lista de capacidades y su CTA. Las dos columnas colapsan por ancho
     disponible, no por breakpoint.

     Cada <li> es un flex row (vineta + texto) a proposito: el reset global
     centra li por debajo de 768px con !important, y al ser flex ese
     text-align ya no mueve nada — la posicion la gobierna el flex, no la
     alineacion de texto. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.evolve.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('spei.evolve.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 w-full max-w-5xl flex-wrap items-stretch gap-6">
      <section
        v-for="path in paths"
        :key="path.title"
        class="sc-section flex min-w-[28rem] grow basis-96 flex-col rounded-2xl p-8"
        :class="path.surface"
      >
        <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ path.title }}</h3>

        <ul class="mt-6 flex flex-col gap-3">
          <li v-for="item in path.items" :key="item.label" class="flex items-start gap-3">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span class="text-sm font-medium text-ink-3">{{ item.label }}</span>
          </li>
        </ul>

        <div class="mt-8 flex justify-start">
          <NuxtLink
            :to="localePath('/contact')"
            class="btn-custom"
            :style="{ '--btn-color': 'var(--color-primary)' }"
          >
            {{ path.cta }} →
          </NuxtLink>
        </div>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
interface PathItem {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const startItems = useLocalizedItems<PathItem>('spei.evolve.startItems', 5, ['label'])
const directItems = useLocalizedItems<PathItem>('spei.evolve.directItems', 5, ['label'])

// El camino "ya soy participante" se distingue por la superficie azul, que es
// el unico token nuevo de esta vista (--color-info-soft).
const paths = computed(() => [
  {
    title: t('spei.evolve.startTitle'),
    cta: t('spei.evolve.startCta'),
    surface: 'bg-surface-2',
    items: startItems.value,
  },
  {
    title: t('spei.evolve.directTitle'),
    cta: t('spei.evolve.directCta'),
    surface: 'bg-info-soft',
    items: directItems.value,
  },
])
</script>
