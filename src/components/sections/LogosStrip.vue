<!-- LogosStrip.vue — franja de logos reutilizable (partners / trustedBy) -->
<template>
  <section class="sc-section w-full px-4 py-14 text-center lg:px-8">
    <h2 class="mx-auto text-center font-secondary text-deep-ink">{{ title }}</h2>
    <div class="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
      <span
        v-for="logo in logos"
        :key="logo"
        class="font-secondary text-lg font-bold uppercase tracking-wide text-ink-3"
      >
        {{ logo }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  logos: string[]
}>()
</script>
