<!-- BlogGrid.vue — el diseño de referencia (landing.jpg) repite las mismas 3 entradas
     en dos filas; se replica tal cual por fidelidad estructural, con imagen placeholder. -->
<template>
  <section class="sc-section w-full px-4 py-16 text-center lg:px-8">
    <p class="font-secondary text-sm font-semibold uppercase tracking-wide text-ink-3 mx-auto text-center">{{ t('blog.eyebrow') }}</p>
    <h2 class="mx-auto mt-2 text-center font-secondary text-deep-ink">{{ t('blog.title') }}</h2>

    <article class="sc-article mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
      <section
        v-for="post in doubledPosts"
        :key="post.key"
        class="sc-section rounded-2xl border border-line-3 bg-bg-second p-5 shadow-flat"
      >
        <div class="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-surface-3">
          <Icon icon="mdi:image-outline" class="text-ink-4" width="40" height="40" />
        </div>
        <p class="mt-4 font-secondary text-xs font-bold uppercase text-primary">{{ t('blog.tag') }}</p>
        <h3 class="mt-1 font-secondary text-deep-ink">{{ post.title }}</h3>
        <p class="mt-2 text-sm text-ink-3">{{ post.excerpt }}</p>
        <a href="#" class="mt-3 inline-flex items-center gap-1 font-secondary text-sm font-bold text-primary hover:underline">
          {{ t('blog.readMore') }} →
        </a>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Post {
  title: string
  excerpt: string
}

const { t } = useI18n()
const posts = useLocalizedItems<Post>('blog.posts', 3, ['title', 'excerpt'])

const doubledPosts = computed(() =>
  [...posts.value, ...posts.value].map((post, i) => ({ ...post, key: `${post.title}-${i}` })),
)
</script>
