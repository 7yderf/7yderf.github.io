<!-- EcocloudCapabilities.vue — Zona 3. "¿Que puedes hacer?": 5 items icono+texto
     sin card ni fondo, reacomodo por ancho disponible (flex-wrap+basis, no
     grid con posiciones fijas -mismo criterio que decision:3:22 sobre por
     que grid no es la eleccion correcta para reacomodo progresivo-). En el
     mockup caen 3+2, pero eso es el resultado del ancho disponible en ese
     corte, no una regla de "3 por fila" que haya que forzar.

     PLACEHOLDER: iconos de linea via Iconify (mdi) en vez de los propios del
     mockup, que no existen como asset todavia. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('ecoCloud.capabilities.title') }}</h2>

    <article class="sc-article mx-auto mt-12 w-full max-w-4xl flex-wrap justify-center gap-x-12 gap-y-10 text-center">
      <div
        v-for="item in items"
        :key="item.label"
        class="sc-section flex min-w-[16rem] max-w-[20rem] basis-56 flex-col items-center"
      >
        <Icon :icon="item.icon" width="40" height="40" class="text-brand-violet" />
        <p class="mt-4 text-base font-medium text-text">{{ item.label }}</p>
      </div>
    </article>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-10 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('ecoCloud.capabilities.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface CapabilityText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Orden fijo, el mismo del mockup.
const icons = [
  'mdi:key-outline',
  'mdi:arrow-collapse-all',
  'mdi:export-variant',
  'mdi:file-lock-outline',
  'mdi:card-plus-outline',
]
const texts = useLocalizedItems<CapabilityText>('ecoCloud.capabilities.items', icons.length, ['label'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
