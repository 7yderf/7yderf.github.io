<!-- CaasPaths.vue — Zona 2. Dos caminos lado a lado, cada uno una card con su
     lista y su CTA. El filete superior separa esta banda del hero: la frontera
     la declara siempre la seccion que sigue.

     Cada renglon de la lista es una fila flexible a proposito: el reset global
     centra los elementos de lista por debajo de 768 px con maxima prioridad, y
     al ser contenedor flexible ese centrado ya no mueve nada. -->
<template>
  <section class="sc-section w-full border-t border-line px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('caas.paths.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('caas.paths.subtitle') }}</p>

    <article class="sc-article mx-auto mt-12 w-full max-w-6xl flex-wrap items-stretch gap-8">
      <section
        v-for="path in paths"
        :key="path.title"
        class="sc-section flex min-w-[28rem] grow basis-96 flex-col items-start rounded-3xl p-10"
        :class="path.surface"
      >
        <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ path.title }}</h3>

        <ul class="mt-6 flex flex-col gap-3">
          <li v-for="item in path.items" :key="item.label" class="flex items-start gap-3">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-ink" aria-hidden="true" />
            <span class="text-base font-medium text-text">{{ item.label }}</span>
          </li>
        </ul>

        <NuxtLink
          :to="localePath(path.href)"
          class="mt-auto flex items-center gap-2 pt-8 text-xs font-bold text-deep-ink hover:underline"
        >
          {{ path.cta }} →
        </NuxtLink>
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

const startItems = useLocalizedItems<PathItem>('caas.paths.startItems', 2, ['label'])
const ownItems = useLocalizedItems<PathItem>('caas.paths.ownItems', 2, ['label'])

// El camino de quien ya tiene HSM se distingue por la superficie lavanda de
// marca; el otro usa el gris neutro de pagina. href apunta a la vista de
// campaña real de cada camino (ver decision:5:2): "Aun no tienes HSM" ->
// Ecosistema Cloud, "Ya tienes HSM" -> HSM Control Security.
const paths = computed(() => [
  {
    title: t('caas.paths.startTitle'),
    cta: t('caas.paths.startCta'),
    surface: 'bg-bg',
    items: startItems.value,
    href: '/ecosistema-cloud',
  },
  {
    title: t('caas.paths.ownTitle'),
    cta: t('caas.paths.ownCta'),
    surface: 'bg-brand-violet-soft',
    items: ownItems.value,
    href: '/hsm-control-security',
  },
])
</script>
