<!-- SpeiRisks.vue — Zona 2. Cuatro riesgos en fila + CTA centrado.
     Riel responsive de IndustriesGrid: flex-wrap + grow + basis.
     El filete superior separa esta banda del hero, como en la referencia. -->
<template>
  <section class="sc-section w-full border-t border-line px-4 py-8 lg:px-8 lg-2:py-16">
    <article class="sc-article mx-auto w-full max-w-6xl flex-wrap items-start gap-8">
      <div
        v-for="risk in risks"
        :key="risk.label"
        class="sc-section flex min-w-[18rem] grow basis-56 flex-col items-center gap-4 px-4"
      >
        <img
          :src="risk.icon"
          alt=""
          aria-hidden="true"
          class="h-9 w-9 object-contain"
          loading="lazy"
          decoding="async"
        >
        <p class="max-w-xs text-center text-lg font-medium text-text">{{ risk.label }}</p>
      </div>
    </article>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-12 flex w-full justify-center">
      <!-- Radio base del boton: la referencia no usa pildora en esta vista. -->
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('spei.risks.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
interface RiskText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/riesgos — el numero es el orden de aparicion. El origen los
// nombraba Vector, Vector-1, Vector-2 y Vector-3, que no dice nada del orden;
// se verifico el contenido de cada uno antes de mapearlos.
const icons = [
  '/images/riesgos/1.png',
  '/images/riesgos/2.png',
  '/images/riesgos/3.png',
  '/images/riesgos/4.png',
]
const texts = useLocalizedItems<RiskText>('spei.risks.items', icons.length, ['label'])
const risks = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
