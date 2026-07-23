<!-- privacy.vue — Ruta /privacy. Mismo patron que contact.vue/under-construction.vue:
     pagina delgada, meta via t(), contenido en components/sections. El CUERPO
     del aviso vive fijo en PrivacyNoticeSection.vue (ver nota ahi sobre por que
     no pasa por i18n). -->
<template>
  <div class="p-4">
    <PrivacyNoticeSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('privacy.meta.title'),
  description: () => t('privacy.meta.description'),
})
</script>
