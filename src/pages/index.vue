<!-- index.vue — Landing "Conecta". Fase 1: estructura + tokens default + iconos
     como placeholder de imagenes/ilustraciones (ver assets/landing.jpg). -->
<template>
  <div>
    <Hero />
    <LogosStrip :logos="manufacturerLogos">
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

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})

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
