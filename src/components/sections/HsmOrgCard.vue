<!-- HsmOrgCard.vue — Card del abanico de la zona 4 (HsmOrgMosaic). Se extrae
     porque el mismo bloque se instancia en las cuatro columnas del abanico.
     Reposo atenuado / hover encendido: crece, sube a opacidad plena, se aclara
     a blanco con sombra y la imagen recupera saturacion. -->
<template>
  <figure class="org-card sc-figure max-w-[19rem] rounded-2xl bg-surface-2 p-4">
    <div class="aspect-[4/3] w-full overflow-hidden rounded-xl">
      <img
        :src="image"
        :alt="label"
        class="org-card__img h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      >
    </div>
    <figcaption class="mt-3 text-center text-xs font-medium text-ink-3">{{ label }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  label: string
}>()
</script>

<style scoped>
.org-card {
  /* La opacidad va en la card completa (fondo + imagen + caption) */
  opacity: 0.8;
  transition:
    scale 180ms cubic-bezier(0.2, 0, 0, 1),
    opacity 180ms cubic-bezier(0.2, 0, 0, 1),
    background-color 180ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 180ms cubic-bezier(0.2, 0, 0, 1);
}

.org-card:hover {
  opacity: 1;
  scale: 1.08;
  background-color: var(--bg-second-color);
  box-shadow: 0 16px 32px -10px rgba(23, 23, 20, 0.18);
}

/* Reposo apagado; al iluminarse recupera color y contraste */
.org-card__img {
  filter: grayscale(45%);
  transition: filter 180ms cubic-bezier(0.2, 0, 0, 1);
}

.org-card:hover .org-card__img {
  filter: grayscale(0%);
}

@media (prefers-reduced-motion: reduce) {
  .org-card,
  .org-card__img {
    transition: none;
  }
  .org-card:hover {
    scale: 1;
  }
}
</style>
