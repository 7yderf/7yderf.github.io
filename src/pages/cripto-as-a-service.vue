<!-- cripto-as-a-service.vue — Ruta /cripto-as-a-service. Mismo patron que las
     otras vistas: pagina delgada que compone las zonas full-width en orden, con
     la meta via t(). El header y el footer los pone el layout default. -->
<template>
  <div>
    <CaasHero />
    <CaasPaths />
    <CaasScattered />
    <CaasOnePlace />
    <CaasAdapts />
    <CaasAreas />
    <CaasPostQuantum />
    <CaasCompliance />
    <CaasStart />
    <CaasFaq />
    <CaasFinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('caas.meta.title'),
  description: () => t('caas.meta.description'),
})
</script>
