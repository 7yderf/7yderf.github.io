<!-- HsmcsFeatures.vue — Zona 3. "Lo que obtienes": lista de 5 modulos, una fila
     full-width por modulo (icono + titulo + descripcion + link), fondo
     alterno para separarlas sin necesitar borde -mismo criterio de
     decision:2:19, la frontera la da el color, no una linea-.

     PLACEHOLDER: el mockup usa icono 3D propio por modulo (recurso que no
     existe todavia). Se usa Icon (iconify, ya dependencia del proyecto) sobre
     una baldosa de color alternando los 2 tokens de marca -violeta/naranja-
     en vez de inventar un color nuevo.

     min-[769px]: y NO md: en flex-row/items-start/text-left -mismo defecto
     que HsmSupport.vue/SpeiOperate.vue/EcocloudHero.vue documentan: el
     reset global (style.scss) es max-width:768px (768 incluido) y el md: de
     Tailwind es min-width:768px (768 TAMBIEN incluido), asi que con md:
     ambos rangos se pisan exactamente en 768px. flex-row va con el mismo
     corte que items-start/text-left -son el mismo cambio de mobile a
     desktop, no tres independientes- para que la fila y el texto cambien
     de layout en el mismo pixel. Corregido al verificar los acuerdos de
     responsive del proyecto en toda la web (Fredy, 2026-08-27). -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('hsmcs.features.title') }}</h2>

    <div class="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-4">
      <div
        v-for="(item, i) in items"
        :key="item.title"
        class="sc-section flex w-full flex-col items-center gap-6 rounded-3xl p-8 text-center min-[769px]:flex-row min-[769px]:items-start min-[769px]:text-left"
        :class="i % 2 === 0 ? 'bg-surface-2' : 'bg-bg-second'"
      >
        <div
          class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
          :class="i % 2 === 0 ? 'bg-brand-violet' : 'bg-primary'"
        >
          <Icon :icon="item.icon" width="32" height="32" class="text-text-invert" />
        </div>
        <div class="flex flex-col items-center min-[769px]:items-start">
          <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ item.title }}</h3>
          <p class="mt-3 max-w-2xl text-ink-3">{{ item.description }}</p>
          <NuxtLink
            :to="localePath('/contact')"
            class="mt-4 flex items-center gap-2 text-xs font-bold text-deep-ink hover:underline"
          >
            {{ item.link }} →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface FeatureText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Orden fijo, el mismo del mockup (Monitoreo, Key Manager, KeyScan, KeyOS,
// Bus Criptografico).
const icons = [
  'mdi:monitor-eye',
  'mdi:key-variant',
  'mdi:magnify-scan',
  'mdi:cloud-sync-outline',
  'mdi:swap-horizontal-bold',
]
const texts = useLocalizedItems<FeatureText>('hsmcs.features.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
