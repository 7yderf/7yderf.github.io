<!-- LogosStrip.vue — marquesina infinita de logos (CSS puro). Loop sin costura:
     dos grupos idénticos + translateX(-50%); el espacio viaja con cada logo
     (margin, no flex-gap) para que el punto de empalme sea exacto. Degradado en
     los extremos vía mask-image. -->
<template>
  <section class="sc-section w-full px-4 py-14 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">{{ title }}</h2>

    <div class="logos-marquee mx-auto mt-10 w-full max-w-5xl">
      <div class="logos-marquee__track">
        <div class="logos-marquee__group">
          <img
            v-for="logo in logos"
            :key="logo.src"
            :src="logo.src"
            :alt="logo.alt"
            class="logos-marquee__logo"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="logos-marquee__group" aria-hidden="true">
          <img
            v-for="logo in logos"
            :key="`dup-${logo.src}`"
            :src="logo.src"
            alt=""
            class="logos-marquee__logo"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Logo {
  src: string
  alt: string
}

defineProps<{
  title: string
  logos: Logo[]
}>()
</script>

<style scoped>
.logos-marquee {
  overflow: hidden;
  /* Degradado en ambos extremos: el primer y el último logo se difuminan */
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
}

.logos-marquee__track {
  display: flex;
  width: max-content;
  animation: logos-scroll 32s linear infinite;
}

/* Pausa el desplazamiento al pasar el cursor */
.logos-marquee:hover .logos-marquee__track {
  animation-play-state: paused;
}

.logos-marquee__group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.logos-marquee__logo {
  height: 3.2rem;
  width: auto;
  /* El espacio viaja con el logo (no flex-gap) para un loop exacto */
  margin-right: 6rem;
  flex-shrink: 0;
  object-fit: contain;
  /* Silueta gris monocromo: unifica los colores mezclados de los SVG y hace
     visible el logo blanco (utimaco) sobre fondo claro */
  filter: brightness(0);
  opacity: 0.42;
  transition: opacity 200ms ease;
}

.logos-marquee:hover .logos-marquee__logo {
  opacity: 0.55;
}

@keyframes logos-scroll {
  to {
    transform: translateX(-50%);
  }
}

/* Accesibilidad: sin desplazamiento si el usuario prefiere menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .logos-marquee__track {
    animation: none;
  }
}
</style>
