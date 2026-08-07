<!-- HsmTechCard.vue — Card de capacidad del diagrama de la zona 5
     (HsmTechDiagram). Se extrae porque el mismo bloque se instancia en las dos
     columnas laterales del diagrama. El label va en <span> y no en <p>: el
     reset global centra p/h* por debajo de 768px y aqui el texto debe quedar
     siempre alineado junto a su icono. -->
<template>
  <!-- grow-0 neutraliza el flex-grow:1 que trae sc-section: dentro de una
       columna flex-col haria que las cards se estiraran a lo alto y anularia el
       justify-between del riel. El rol es sc-section; la direccion y el tamano
       los sigue gobernando Tailwind. -->
  <div class="sc-section flex grow-0 items-center gap-4 rounded-2xl bg-bg-second p-5 shadow-flat">
    <img
      :src="icon"
      alt=""
      aria-hidden="true"
      class="h-20 w-20 shrink-0 object-contain"
      loading="lazy"
      decoding="async"
    >
    <span class="text-base font-semibold leading-snug text-deep-ink">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>()
</script>
