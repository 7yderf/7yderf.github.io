<!-- infraestructura-spei.vue — Ruta /infraestructura-spei. Mismo patron que
     index.vue y hardware-criptografico.vue: pagina delgada que compone las
     zonas full-width en orden, con la meta via t(). El header y el footer los
     pone el layout default. -->
<template>
  <div>
    <SpeiHero />
    <SpeiRisks />
    <SpeiEvolve />
    <SpeiStages />
    <SpeiOperate />
    <SpeiWhy />
    <SpeiIntelligence />
    <SpeiStats />
    <SpeiShared />
    <SpeiFaq />
    <SpeiFinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('spei.meta.title'),
  description: () => t('spei.meta.description'),
})
</script>
