<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      {{ t('features.titlePre') }} <span class="text-primary">{{ t('features.titleHighlight') }}</span>
    </h2>
    <p class="mx-auto mt-4 text-center">{{ t('features.subtitle') }}</p>

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
          class="sc-article flex-wrap items-center gap-8 rounded-3xl border border-line-3 bg-bg-second p-6 shadow-[0_18px_44px_-12px_rgba(91,63,224,0.16)] md:gap-12 md:p-10"
          :class="i % 2 === 1 ? 'flex-row-reverse' : ''"
        >
          <div class="aspect-[4/3] min-w-[260px] shrink-0 grow basis-80 overflow-hidden rounded-2xl bg-primary-soft">
            <video
              :src="item.video"
              class="h-full w-full scale-105 object-cover"
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
            <a
              href="#"
              class="mt-5 inline-flex items-center gap-1.5 font-secondary text-base font-bold hover:underline"
              :class="i === 1 ? 'text-accent' : 'text-primary'"
            >
              {{ item.link }} →
            </a>
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

// Videos por card, en orden de aparicion (public/videos)
const videos = ['/videos/candado.mp4', '/videos/terminal.mp4', '/videos/cloud.mp4']
const texts = useLocalizedItems<FeatureText>('features.items', videos.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, video: videos[i] })))
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
