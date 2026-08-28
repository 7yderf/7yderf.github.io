<!-- HsmcsFeatures.vue — Zona 3. "Lo que obtienes": lista de 5 modulos, una fila
     full-width por modulo (icono + titulo + descripcion + link).

     Iconos reales (Fredy 2026-08-28, icono-lo-que-obtienes/): cada PNG ya
     trae su propio fondo de color redondeado -no la baldosa violeta/naranja
     que el placeholder armaba con Icon (iconify) encima de un div de color.
     Se quito ese wrapper: el <img> se pone directo, sin baldosa adicional.

     Efecto "tarjetas apiladas": cada fila ya no es un bloque de color
     alterno (decision:2:19 original), es una tarjeta con OTRA tarjeta
     asomando detras -offset abajo-derecha, mismo radio, un tono mas
     apagado- confirmado contra la referencia real. Sin asset de referencia
     pixel-exacto para el offset -se ajusto por ojo (0.5rem) y se deja para
     ajuste fino si Fredy lo pide tras revisar.

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

    <div class="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-8">
      <div v-for="item in items" :key="item.title" class="relative">
        <!-- Tarjeta fantasma: misma forma, corrida abajo-derecha, un tono mas
             apagado -asoma detras de la tarjeta real, no interactua. -->
        <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-surface-3" aria-hidden="true" />

        <div class="sc-section relative flex w-full flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-bg-second to-surface-2 p-8 text-center min-[769px]:flex-row min-[769px]:items-start min-[769px]:text-left">
          <img :src="item.icon" alt="" aria-hidden="true" class="h-16 w-16 shrink-0 object-contain">
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
    </div>
  </section>
</template>

<script setup lang="ts">
interface FeatureText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Orden fijo, el mismo del mockup (Monitoreo, Key Manager, KeyScan, KeyOS,
// Bus Criptografico) -1.png..5.png en assets/Cripto As a Service_HSMCS/
// icono-lo-que-obtienes/, mapeo confirmado contra la referencia.
const icons = [
  '/images/hsmcs/lo-que-obtienes/1.png',
  '/images/hsmcs/lo-que-obtienes/2.png',
  '/images/hsmcs/lo-que-obtienes/3.png',
  '/images/hsmcs/lo-que-obtienes/4.png',
  '/images/hsmcs/lo-que-obtienes/5.png',
]
const texts = useLocalizedItems<FeatureText>('hsmcs.features.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
