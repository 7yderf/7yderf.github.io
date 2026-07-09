<!-- index.vue — Landing "Conecta". Fase 1: estructura + tokens default + iconos
     como placeholder de imagenes/ilustraciones (ver assets/landing.jpg). -->
<template>
  <div>
    <Hero />
    <LogosStrip :title="t('partners.title')" :logos="partnerLogos" />
    <SolutionFinder />
    <FeatureCards />
    <ProcessCta />
    <StrategicServices />
    <SolutionsCarousel />
    <StatsSection />
    <LogosStrip :title="t('trustedBy.title')" :logos="trustedLogos" />
    <BlogGrid />
    <FinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})

const partnerLogos = useLocalizedStrings('partners.logos', 5)
const trustedLogos = useLocalizedStrings('trustedBy.logos', 6)
</script>
