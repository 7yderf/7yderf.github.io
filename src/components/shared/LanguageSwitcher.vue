<!-- LanguageSwitcher.vue — Selector de idioma (i18n strategy: prefix_except_default) -->
<template>
  <nav class="flex items-center gap-1" :aria-label="$t('language')">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="rounded-full px-3 py-1 font-secondary text-sm transition-colors"
      :class="
        loc.code === locale
          ? 'bg-text text-text-invert'
          : 'text-ink-4 hover:bg-surface-2 hover:text-text'
      "
    >
      {{ loc.code.toUpperCase() }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
