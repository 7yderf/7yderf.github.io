<!-- hardware-criptografico.vue — Ruta /hardware-criptografico. Mismo patron que
     index.vue: pagina delgada que compone las zonas full-width en orden, con la
     meta via t(). El header y el footer los pone el layout default. -->
<template>
  <div>
    <HsmHero />
    <HsmPains />
    <HsmDataLocation />
    <HsmOrgMosaic />
    <HsmTechDiagram />
    <HsmUseCases />
    <HsmBeyond />
    <HsmSteps />
    <HsmSupport />
    <HsmFaq />
    <HsmFinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('hsm.meta.title'),
  description: () => t('hsm.meta.description'),
})
</script>
