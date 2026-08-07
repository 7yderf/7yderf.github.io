<!-- HsmPains.vue — Zona 2. Tres dolores del cliente en fila + CTA centrado.
     Mismo riel responsive que IndustriesGrid: flex-wrap + grow + basis. -->
<template>
  <section class="sc-section w-full px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-5xl flex-wrap items-start gap-8">
      <div
        v-for="pain in pains"
        :key="pain.label"
        class="sc-section flex min-w-[20rem] grow basis-64 flex-col items-center gap-4 px-4 text-center"
      >
        <img
          :src="pain.icon"
          alt=""
          aria-hidden="true"
          class="h-10 w-10 object-contain"
          loading="lazy"
          decoding="async"
        >
        <p class="max-w-xs text-center text-sm font-medium text-ink-3">{{ pain.label }}</p>
      </div>
    </article>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-12 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
        {{ t('hsm.pains.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PainText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/dolores — el numero es el orden de aparicion, igual que en el
// resto de los sets de esta vista.
const icons = [
  '/images/dolores/1.png',
  '/images/dolores/2.png',
  '/images/dolores/3.png',
]
const texts = useLocalizedItems<PainText>('hsm.pains.items', icons.length, ['label'])
const pains = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
