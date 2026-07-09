<template>
  <section class="sc-section flex-col items-center bg-gradient-to-b from-cream from-[70%] to-bg-second px-4 pb-16 text-center lg:px-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col items-center">
      <video
        class="w-full"
        src="/videos/home-animation.mp4"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        aria-hidden="true"
      ></video>

      <h1 class="hero font-secondary text-deep-ink text-center mt-[-8rem]">
        {{ t('hero.titlePre') }} <span class="text-accent">{{ t('hero.titleHighlight') }}</span>
      </h1>
      <p class="mt-5 max-w-2xl text-l text-center font-semibold">{{ t('hero.subtitle') }}</p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a href="#" class="btn-primary">
          {{ t('hero.ctaPrimary') }} →
        </a>
        <a href="#" class="btn-secondary">
          {{ t('hero.ctaSecondary') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
