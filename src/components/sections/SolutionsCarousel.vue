<!-- SolutionsCarousel.vue — usa Swiper Element (swiper-container). Los items "upcoming"
     se muestran atenuados, igual que en el diseño de referencia (landing.jpg). -->
<template>
  <section class="sc-section w-full px-4 py-8 text-center lg:px-8 lg-2:py-16">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">
      {{ t('carousel.titlePre') }} <span class="text-primary">{{ t('carousel.titleHighlight') }}</span>
    </h2>

    <div class="relative mx-auto mt-12 w-full max-w-5xl ">
      <!-- init="false": la libreria se autoinicializa en cuanto queda definida, y
           eso ocurre antes de que Vue hidrate. Con recorrido circular duplica
           piezas en el marcado que entrego el servidor, Vue encuentra mas nodos
           de los que espera y los revierte, destruyendo lo que la libreria monto.
           El sintoma es enganoso: arrastrar sigue funcionando —sus oyentes estan
           en el contenedor, que sobrevive— y las flechas no, porque las suyas
           quedaron en nodos reconstruidos. El arranque va abajo, ya hidratado. -->
      <swiper-container
        ref="swiperEl"
        class="block"
        init="false"
        slides-per-view="3"
        space-between="16"
        navigation="true"
        loop="true"
        centered-slides="true"
      >
        <swiper-slide v-for="item in allItems" :key="item.label">
          <div class="flex flex-col items-center gap-3 py-2 pt-16">
            <div class="carousel-media flex h-32 w-32 items-center justify-center rounded-full bg-primary-soft">
              <img :src="item.img" :alt="item.label" class="h-36 w-36 object-contain" >
            </div>
            <span class="font-secondary text-sm font-semibold text-deep-ink">{{ item.label }}</span>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CarouselText {
  label: string
}

const { t } = useI18n()

// Imagenes por institucion (public/instituciones), mapeadas a su etiqueta
const activeImages = ['/instituciones/fintech.webp', '/instituciones/banca.webp', '/instituciones/aseguradoras.webp']
const upcomingImages = ['/instituciones/gobierno.webp', '/instituciones/ecommerce.webp', '/instituciones/salud.webp']

const activeTexts = useLocalizedItems<CarouselText>('carousel.active', activeImages.length, ['label'])
const upcomingTexts = useLocalizedItems<CarouselText>('carousel.upcoming', upcomingImages.length, ['label'])

const allItems = computed(() => [
  ...activeTexts.value.map((text, i) => ({ ...text, img: activeImages[i], upcoming: false })),
  ...upcomingTexts.value.map((text, i) => ({ ...text, img: upcomingImages[i], upcoming: true })),
])

// Arranque manual, ya hidratado. whenDefined evita depender del orden en que
// corra el plugin que registra el componente.
type SwiperContainer = HTMLElement & { initialize?: () => void }
const swiperEl = ref<SwiperContainer | null>(null)

onMounted(async () => {
  await customElements.whenDefined('swiper-container')
  await nextTick()
  swiperEl.value?.initialize?.()
})
</script>

<!-- Sin scope: Swiper clona los slides del loop; la clase .swiper-slide-active
     (que Swiper aplica al slide central por centered-slides) engancha directo. -->
<style>
.carousel-media {
  transition: transform 0.4s ease;
  will-change: transform;
}

/* El item central (activo) "respira": flota + leve zoom, fino y organico */
.swiper-slide-active .carousel-media {
  animation: carousel-breathe 3s ease-in-out infinite;
}

@keyframes carousel-breathe {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .swiper-slide-active .carousel-media {
    animation: none;
  }
}
</style>
