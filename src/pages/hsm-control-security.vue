<!-- hsm-control-security.vue — Ruta /hsm-control-security. Mismo patron que las
     otras vistas: pagina delgada que compone las zonas full-width en orden,
     con la meta via t(). El header y el footer los pone el layout default.

     Destino real del CTA "Ya tienes HSM" de CaasPaths.vue (ver decision:5:2). -->
<template>
  <div>
    <HsmcsHero />
    <HsmcsWhat />
    <HsmcsFeatures />
    <HsmcsWho />
    <HsmcsFinalCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('hsmcs.meta.title'),
  description: () => t('hsmcs.meta.description'),
})
</script>
