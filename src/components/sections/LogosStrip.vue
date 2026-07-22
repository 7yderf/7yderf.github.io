<!-- LogosStrip.vue — marquesina infinita de logos (CSS puro). Loop sin costura:
     dos grupos idénticos + translateX(-50%); el espacio viaja con cada logo
     (margin, no flex-gap) para que el punto de empalme sea exacto. Degradado en
     los extremos vía mask-image. -->
<template>
  <section :id="id" class="sc-section w-full scroll-mt-24 py-7 text-center lg:px-8 lg-2:py-14">
    <h2 class="mx-auto text-center text-deep-ink">
      <slot name="title">{{ title }}</slot>
    </h2>

    <div class="mt-8 w-full border-y border-line py-5 lg-2:py-10">
      <div class="logos-marquee mx-auto w-full max-w-5xl">
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
    </div>
  </section>
</template>

<script setup lang="ts">
interface Logo {
  src: string
  alt: string
}

defineProps<{
  id?: string
  title?: string
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
