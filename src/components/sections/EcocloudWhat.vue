<!-- EcocloudWhat.vue — Zona 2. "¿Que es?": intro centrada + panel de diagrama
     de arquitectura debajo. El panel reusa el riel de 2 columnas ya validado
     (flex-wrap + basis + min-w) en vez del grafo de flechas curvas del
     mockup, que no se puede replicar sin el asset real -ver decision:5:4-:
     columna izquierda = tarjeta servidor + 2 cajas de region; columna derecha
     = "Web Services" + 6 pildoras de servicio sobre un riel vertical simple
     (border-l), no lineas curvas individuales por pildora. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('ecoCloud.what.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('ecoCloud.what.body') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('ecoCloud.what.cta') }}
      </NuxtLink>
    </div>

    <div class="mx-auto mt-12 w-full max-w-6xl rounded-3xl bg-primary-soft p-6 lg-2:p-12">
      <article class="sc-article flex-wrap items-stretch gap-8">
        <!-- Servidor + regiones -->
        <div class="sc-section flex min-w-[26rem] basis-[32rem] flex-col gap-4">
          <div class="flex items-center gap-3 rounded-2xl bg-bg-second p-5">
            <img src="/logos/tesseract.svg" alt="" aria-hidden="true" class="h-6 w-auto object-contain">
            <span class="font-secondary font-bold text-deep-ink">{{ t('ecoCloud.what.diagram.serverTitle') }}</span>
          </div>

          <div
            v-for="n in 2"
            :key="n"
            class="rounded-2xl border border-line bg-bg-second/60 p-5"
          >
            <div class="flex items-center justify-around gap-4 text-center">
              <div class="flex flex-col items-center gap-2">
                <Icon icon="mdi:database-outline" width="28" height="28" class="text-brand-violet" />
                <span class="text-sm font-medium text-text">{{ t('ecoCloud.what.diagram.databases') }}</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <Icon icon="mdi:server-security" width="28" height="28" class="text-primary" />
                <span class="text-sm font-medium text-text">{{ t('ecoCloud.what.diagram.hsm') }}</span>
              </div>
            </div>
            <p class="mt-3 text-center text-xs font-medium text-ink-3">{{ t('ecoCloud.what.diagram.region') }}</p>
          </div>
        </div>

        <!-- Web Services + pildoras -->
        <div class="sc-section flex min-w-[26rem] basis-[32rem] flex-col">
          <p class="text-sm font-bold text-primary">{{ t('ecoCloud.what.diagram.webServices') }}</p>

          <div class="mt-4 flex flex-col gap-3 border-l-2 border-primary/40 pl-6">
            <div
              v-for="service in services"
              :key="service.label"
              class="flex items-center gap-3 rounded-full bg-bg-second px-5 py-3"
            >
              <Icon :icon="service.icon" width="22" height="22" class="shrink-0 text-brand-violet" />
              <span class="text-sm font-medium text-text">{{ service.label }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface ServiceText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Orden fijo, el mismo del mockup.
const icons = [
  'mdi:two-factor-authentication',
  'mdi:safe-square-outline',
  'mdi:fingerprint',
  'mdi:monitor-eye',
  'mdi:key-chain-variant',
  'mdi:puzzle-outline',
]
const texts = useLocalizedItems<ServiceText>('ecoCloud.what.diagram.services', icons.length, ['label'])
const services = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
