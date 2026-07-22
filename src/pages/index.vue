<!-- index.vue — Landing "Conecta". Fase 1: estructura + tokens default + iconos
     como placeholder de imagenes/ilustraciones (ver assets/landing.jpg). -->
<template>
  <div>
    <Hero />
    <LogosStrip id="fabricantes" :logos="manufacturerLogos">
      <template #title>
        <span class="font-normal">{{ t('partners.titlePre') }}</span> <span class="font-bold">{{ t('partners.titleHighlight') }}</span>
      </template>
    </LogosStrip>
    <!-- <SolutionFinder /> -->
    <FeatureCards />
    <IndustriesGrid />
    <ProcessCta />
    <!-- <SolutionsCarousel /> -->
    <StatsSection />
    <AlliancesCarousel />
    <NewsletterBanner />
    <FinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})

// Scroll suave a la seccion del hash del nav (#soluciones, #fabricantes...).
// Cubre tanto llegar desde otra pagina (mount) como clickear el nav ya
// estando en el home (el hash cambia pero el componente no se remonta).
function scrollToHash() {
  if (!route.hash) return
  nextTick(() => {
    document.querySelector(route.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
onMounted(scrollToHash)
watch(() => route.hash, scrollToHash)

// Logos de fabricantes (public/logos). Silueta monocroma aplicada en LogosStrip.
const manufacturerLogos = [
  { src: '/logos/thales.svg', alt: 'Thales' },
  { src: '/logos/imperva.svg', alt: 'Imperva' },
  { src: '/logos/entrust.svg', alt: 'Entrust' },
  { src: '/logos/utimaco.svg', alt: 'Utimaco' },
  { src: '/logos/tesseract.svg', alt: 'Tesseract' },
  { src: '/logos/google-cloud.svg', alt: 'Google Cloud' },
  { src: '/logos/hermes.svg', alt: 'Hermes' },
]
</script>
