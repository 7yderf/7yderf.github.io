<template>
  <section id="soluciones" class="sc-section w-full scroll-mt-24 px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      <span class="font-normal">{{ t('features.titlePre') }}</span><br>
      <span class="font-bold">{{ t('features.titleHighlight') }}</span>
    </h2>

    <div
      class="cards-stack mx-auto mt-12 w-full max-w-5xl text-left"
      :style="{ '--count': items.length }"
    >
      <div
        v-for="(item, i) in items"
        :key="item.title"
        class="cards-stack__slot"
        :style="{ '--i': i, zIndex: i + 1 }"
      >
        <article
          class="sc-article flex-wrap items-center gap-8 rounded-3xl border border-line-3 p-5 shadow-[0_18px_44px_-12px_rgba(91,63,224,0.16)] md:gap-12 lg-2:p-10"
          :class="i % 2 === 1 ? 'flex-row-reverse' : ''"
          :style="{ background: item.gradient }"
        >
          <div class="aspect-[4/3] min-w-[260px] shrink-0 grow basis-80 overflow-hidden rounded-2xl">
            <video
              :src="item.video"
              class="mix-blend-multiply h-full w-full scale-105 object-cover"
              autoplay
              loop
              muted
              playsinline
              preload="auto"
              aria-hidden="true"
            ></video>
          </div>
          <div class="sc-section min-w-[260px] basis-96">
            <h3 class="font-secondary text-[4.4rem] font-bold leading-tight text-deep-ink">{{ item.title }}</h3>
            <p class="mt-3 max-w-md text-ink-3">{{ item.description }}</p>
            <NuxtLink
              :to="localePath('/contact')"
              class="btn-custom mt-5"
              :style="{ '--btn-color': item.button, '--btn-text': 'var(--text-color)' }"
            >
              {{ item.link }} →
            </NuxtLink>
          </div>
        </article>
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

// Videos por card (public/videos), uno dedicado por card en orden de aparicion.
const videos = [
  '/videos/pagos.mp4',
  '/videos/criptografia.mp4',
  '/videos/nube-hibrida.mp4',
  '/videos/servicios-administrados.mp4',
  '/videos/cumplimiento.mp4',
]

// Gradiente de fondo + color de botón por card, en orden de aparición (Figma).
const cardStyles = [
  { gradient: 'linear-gradient(180deg, #A9DCFB 0%, #FDFDFF 100%)', button: '#92CDF1' },
  { gradient: 'linear-gradient(180deg, #DFCEFF 0%, #FDFDFF 100%)', button: '#D9C6FF' },
  { gradient: 'linear-gradient(180deg, #FFCDAA 0%, #FFF2E8 100%)', button: '#FFB37C' },
  { gradient: 'linear-gradient(180deg, #FFFAF7 0%, #FFFDF9 100%)', button: '#EEE0D8' },
  { gradient: 'linear-gradient(180deg, #E1BBE1 0%, #FFF6FF 100%)', button: '#D9ADD9' },
]

const texts = useLocalizedItems<FeatureText>('features.items', cardStyles.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({
  ...text,
  video: videos[i],
  gradient: cardStyles[i].gradient,
  button: cardStyles[i].button,
})))
</script>

<style scoped>
/* Efecto "stacking cards": cada slot da el riel de scroll; todas las cards se
   fijan a la MISMA linea (top) y el escalonado se logra con padding-top creciente.
   Al ser slots de altura uniforme, el stack completo sale junto al final. */
.cards-stack {
  /* ── Tunables ── */
  --slot-h: 44rem;       /* alto del riel de cada card (>= alto card + escalonado) */
  --stack-top: 9.6rem;   /* donde se fijan (debajo del nav sticky) */
  --stack-step: 4.5rem;  /* cuanto asoma cada card anterior (~su 20%) */

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(var(--count), var(--slot-h));
  gap: 2rem;
  /* Hold final: el stack se sostiene un poco antes de salir como bloque */
  padding-bottom: calc(var(--count) * var(--stack-step));
}

.cards-stack__slot {
  position: sticky;
  top: var(--stack-top);
  padding-top: calc(var(--i) * var(--stack-step));
}

/* Movil: las cards apiladas en vertical son mas altas → riel mayor */
@media (max-width: 768px) {
  .cards-stack {
    --slot-h: 70rem;
    --stack-step: 3.5rem;
  }
}

/* Accesibilidad: sin apilado si el usuario prefiere menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .cards-stack {
    grid-template-rows: none;
    grid-auto-rows: auto;
    padding-bottom: 0;
  }
  .cards-stack__slot {
    position: static;
    padding-top: 0;
  }
}
</style>
