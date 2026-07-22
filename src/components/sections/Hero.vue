<template>
  <section class="sc-section flex-col items-center px-4 pb-8 text-center lg:px-8 lg-2:pb-16">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center">
      <div class="w-full overflow-hidden">
        <video
          class="mix-blend-multiply block w-full"
          src="/videos/home-hero.mp4"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      <h1 class="hero  font-normal text-center mt-2 bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent mt-[-6rem]">
        {{ t('hero.titlePre') }} <span class="font-semibold italic">{{ t('hero.titleAccent') }}</span><br>
        {{ t('hero.titlePost') }}
      </h1>
      <p class="mt-5 max-w-3xl text-l text-center font-medium">{{ t('hero.subtitle') }}</p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <NuxtLink :to="localePath('/contact')" class="btn-primary btn-lg btn-pill">
          {{ t('hero.ctaPrimary') }} →
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="btn-secondary btn-lg btn-pill">
          {{ t('hero.ctaSecondary') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
