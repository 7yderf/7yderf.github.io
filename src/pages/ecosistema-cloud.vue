<!-- ecosistema-cloud.vue — Ruta /ecosistema-cloud. Mismo patron que las otras
     vistas: pagina delgada que compone las zonas full-width en orden, con la
     meta via t(). El header y el footer los pone el layout default.

     Destino real del CTA "Aun no tienes HSM" de CaasPaths.vue (ver decision:5:2). -->
<template>
  <div>
    <EcocloudHero />
    <EcocloudWhat />
    <EcocloudCapabilities />
    <EcocloudWho />
    <EcocloudFinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('ecoCloud.meta.title'),
  description: () => t('ecoCloud.meta.description'),
})
</script>
