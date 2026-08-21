<!-- SpeiOperate.vue — Zona 5. Cuatro capacidades en cards con link al pie.
     Riel de IndustriesGrid: el numero de columnas lo decide el ancho
     disponible, no un breakpoint. Con basis-96 caen dos por fila en escritorio,
     que es la reticula 2x2 de la referencia.

     Piel compartida con las cards de la vista criptografica: degradado vertical
     en reposo, y en hover se aclara a blanco con sombra. El icono NO lleva
     contenedor propio — la baldosa de color es parte del arte.

     items-start en la card, no solo flex-col: sin el, el default de flex
     (align-items:stretch) estira el link inferior -que es flex por si mismo,
     mismo mecanismo que decision:2:4 sobre el boton- al ancho completo de la
     card. El texto se ve igual (justify-content sigue en flex-start), pero el
     area de click/hover queda mas ancha que el texto visible.

     Icono y titulo (h3) llevan self-center min-[769px]:self-start -no
     items-center en la card entera- por debajo de 768. El reset global ya
     centra el TEXTO de h3/p ahi, pero eso no mueve la caja: el parrafo se ve
     centrado solo porque su texto es largo y su caja ya ocupa casi todo el
     ancho disponible (shrink-to-fit sin holgura); el h3 ("Visibilidad", una
     palabra) se encoge exacto a su contenido y queda pegado a la izquierda
     pese al text-align, igual que el icono. El link se deja intacto -la
     referencia lo mantiene a la izquierda, no todo el bloque se centra como
     en HsmSupport.vue-. min-[769px]: y no md: por la misma razon que ahi:
     el reset global es max-width:768px (768 incluido) y md: es
     min-width:768px (768 tambien incluido) -se pisarian en ese pixel. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.operate.title') }}</h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('spei.operate.subtitle') }}</p>

    <!-- Padding y gap del contenedor angostan cada card sin tocar su contenido:
         es lo que las acerca al cuadrado. Ambos van partidos a la mitad por
         debajo de lg-2, como el resto de los paddings grandes del proyecto. -->
    <article class="sc-article mx-auto mt-12 w-full max-w-5xl flex-wrap items-stretch gap-8 p-8 lg-2:gap-16 lg-2:p-16">
      <section
        v-for="item in items"
        :key="item.title"
        class="operate-card sc-section flex min-w-[26rem] grow basis-96 flex-col items-start rounded-2xl p-8"
      >
        <img
          :src="item.icon"
          alt=""
          aria-hidden="true"
          class="h-12 w-12 self-center object-contain min-[769px]:self-start"
          loading="lazy"
          decoding="async"
        >
        <h3 class="mt-6 self-center font-secondary text-2xl font-bold leading-tight text-deep-ink min-[769px]:self-start">{{ item.title }}</h3>
        <p class="mt-3 text-sm font-medium text-ink-3">{{ item.description }}</p>

        <NuxtLink
          :to="localePath('/contact')"
          class="mt-6 flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          {{ item.link }} →
        </NuxtLink>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
interface OperateText {
  title: string
  description: string
  link: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/operando — el numero es el orden de aparicion. El origen venia
// como cuatro .svg de 1 MB que en realidad envolvian LA MISMA tira raster de
// 2000x401, cada uno con una matriz de recorte distinta; se extrajo el recorte
// de cada matriz y se reencodearon a webp sin perdida.
const icons = [
  '/images/operando/1.webp',
  '/images/operando/2.webp',
  '/images/operando/3.webp',
  '/images/operando/4.webp',
]
const texts = useLocalizedItems<OperateText>('spei.operate.items', icons.length, ['title', 'description', 'link'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>

<style scoped>
.operate-card {
  background: linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%);
  transition:
    scale 180ms cubic-bezier(0.2, 0, 0, 1),
    background 180ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 180ms cubic-bezier(0.2, 0, 0, 1);
}

/* El hover conserva la FORMA de degradado (no un color plano) para que el
   navegador pueda interpolar entre ambos estados en vez de saltar. */
.operate-card:hover {
  scale: 1.02;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  box-shadow: 0 16px 32px -10px rgba(23, 23, 20, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .operate-card {
    transition: none;
  }
  .operate-card:hover {
    scale: 1;
  }
}
</style>
