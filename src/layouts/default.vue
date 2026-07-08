<template>
  <div class="flex min-h-screen flex-col bg-bg font-primary text-text">
    <header class="sticky top-0 z-40 border-b border-line bg-bg-second/90 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <NuxtLink
          :to="localePath('/')"
          class="font-secondary text-lg font-bold text-deep-ink"
        >
          Conecta
        </NuxtLink>
        <LanguageSwitcher />
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-line bg-bg-second">
      <div class="mx-auto w-full max-w-6xl px-4 py-6 text-center font-secondary text-sm text-ink-4">
        © {{ new Date().getFullYear() }} Conecta — {{ $t('footer.rights') }}
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
