<!-- under-construction.vue — Ruta /under-construction. Mismo patron que contact.vue:
     pagina delgada, meta via t(), contenido en components/sections. -->
<template>
  <div class="p-4">
    <UnderConstructionSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('underConstruction.meta.title'),
  description: () => t('underConstruction.meta.description'),
})
</script>
