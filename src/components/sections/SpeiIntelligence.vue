<!-- SpeiIntelligence.vue — Zona 7. CTA y tres cards; cada card lleva su
     ilustracion DENTRO, no como pieza hermana — la card es la unidad.
     PLACEHOLDER: las ilustraciones salen de public/images del home hasta tener
     el arte propio de SPEI. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.intelligence.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('spei.intelligence.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
        {{ t('spei.intelligence.cta') }}
      </NuxtLink>
    </div>

    <article class="sc-article mx-auto mt-12 w-full max-w-6xl flex-wrap items-stretch gap-6">
      <section
        v-for="item in items"
        :key="item.title"
        class="sc-section flex min-w-[26rem] grow basis-80 flex-col rounded-2xl border border-line-3 bg-bg-second p-7"
      >
        <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ item.title }}</h3>
        <p class="mt-3 text-sm font-medium text-ink-3">{{ item.description }}</p>

        <figure class="sc-figure mt-6 overflow-hidden rounded-xl">
          <img
            :src="item.image"
            alt=""
            aria-hidden="true"
            class="aspect-[4/3] w-full object-cover"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
interface IntelligenceText {
  title: string
  description: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const images = [
  '/images/industries/gobierno.webp',
  '/images/industries/banca.webp',
  '/images/industries/fintech.webp',
]
const texts = useLocalizedItems<IntelligenceText>('spei.intelligence.items', images.length, ['title', 'description'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, image: images[i] })))
</script>
