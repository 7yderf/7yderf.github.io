<!-- AlliancesCarousel.vue — marquesina infinita en CSS puro (misma tecnica que
     LogosStrip.vue): dos grupos identicos + translateX(-50%) en loop, sin pausas
     entre "slides" como hacia el autoplay de Swiper. Dos filas independientes. -->
<template>
  <section class="sc-section w-full px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      <span class="font-normal">{{ t('alliances.titlePre') }}</span><br>
      <span class="font-bold">{{ t('alliances.titleHighlight') }}</span>
    </h2>

    <div class="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-4">
      <div class="alliances-marquee">
        <div class="alliances-marquee__track">
          <div class="alliances-marquee__group">
            <img
              v-for="logo in row1"
              :key="logo.alt"
              :src="logo.src"
              :alt="logo.alt"
              class="alliances-marquee__logo h-54 w-54 object-contain"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="alliances-marquee__group" aria-hidden="true">
            <img
              v-for="logo in row1"
              :key="`dup-${logo.alt}`"
              :src="logo.src"
              alt=""
              class="alliances-marquee__logo h-54 w-54 object-contain"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>

      <div class="alliances-marquee">
        <div class="alliances-marquee__track alliances-marquee__track--reverse">
          <div class="alliances-marquee__group">
            <img
              v-for="logo in row2"
              :key="logo.alt"
              :src="logo.src"
              :alt="logo.alt"
              class="alliances-marquee__logo h-54 w-54 object-contain"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="alliances-marquee__group" aria-hidden="true">
            <img
              v-for="logo in row2"
              :key="`dup-${logo.alt}`"
              :src="logo.src"
              alt=""
              class="alliances-marquee__logo h-54 w-54 object-contain"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Logos de alianzas (public/images/alianzas), en el orden en que aparecen.
// Los PNG ya incluyen el tile gris + el logo — no llevan tratamiento adicional.
const row1 = [
  { src: '/images/alianzas/invex.png', alt: 'Invex' },
  { src: '/images/alianzas/kapital.png', alt: 'Kapital Bank' },
  { src: '/images/alianzas/banorte.png', alt: 'Grupo Financiero Banorte' },
  { src: '/images/alianzas/prosa.png', alt: 'PROSA' },
  { src: '/images/alianzas/scotiabank.png', alt: 'Scotiabank' },
]
const row2 = [
  { src: '/images/alianzas/nissan.png', alt: 'Nissan' },
  { src: '/images/alianzas/tec-monterrey.png', alt: 'Tecnológico de Monterrey' },
  { src: '/images/alianzas/tsys.png', alt: 'TSYS' },
  { src: '/images/alianzas/libertad.png', alt: 'Libertad Servicios Financieros' },
  { src: '/images/alianzas/dr-security.png', alt: 'DR Security' },
]
</script>

<style scoped>
.alliances-marquee {
  overflow: hidden;
  /* Degradado en ambos extremos, igual que LogosStrip.vue */
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
}

.alliances-marquee__track {
  display: flex;
  width: max-content;
  animation: alliances-scroll 36s linear infinite;
}

/* Fila de abajo: mismo recorrido, sentido invertido */
.alliances-marquee__track--reverse {
  animation-direction: reverse;
}

.alliances-marquee:hover .alliances-marquee__track {
  animation-play-state: paused;
}

.alliances-marquee__group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.alliances-marquee__logo {
  /* El espacio viaja con el logo (no flex-gap) para un loop exacto */
  margin-right: 1.6rem;
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 200ms ease;
}

.alliances-marquee__logo:hover {
  opacity: 1;
}

@keyframes alliances-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .alliances-marquee__track {
    animation: none;
  }
}
</style>
