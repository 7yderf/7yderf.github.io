<!-- contact.vue — Ruta /contact. Fase 1: seccion unica (ContactSection), mismo patron
     que index.vue: pagina delgada, meta via t(), contenido en components/sections. -->
<template>
  <div>
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.meta.title'),
  description: () => t('contact.meta.description'),
})
</script>
