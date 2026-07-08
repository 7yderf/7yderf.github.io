<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Estilos base de @vuepic/vue-datepicker (los tokens --dp-* se ajustan por instancia)
import '@vuepic/vue-datepicker/dist/main.css'

// SEO i18n: lang/dir en <html>, hreflang alternates y og:locale
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}))
</script>
