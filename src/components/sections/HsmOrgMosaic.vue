<!-- HsmOrgMosaic.vue — Zona 4. Abanico simetrico en tres bloques: grupo
     izquierdo, texto central y grupo derecho. Cada grupo lateral se parte a su
     vez en dos columnas — la EXTERNA sostiene la card que sobresale (centrada
     verticalmente) y la INTERNA las dos cards de arriba y abajo. El escalonado
     es estructural, no un translate decorativo: sale de en que columna vive
     cada card, asi que se conserva al colapsar en vez de desalinearse.

     Excepcion sancionada al catalogo sc-*: hay sc-article dentro de sc-article.
     Esta justificado porque el abanico necesita dos niveles de agrupacion
     (los tres bloques, y las dos columnas de cada lado); aplanarlo a un solo
     nivel obligaria a volver al desplazamiento por translate.

     Debajo de lg-2 (991px) el abanico deja de mostrarse del todo -no se
     reordena via flex, es un arbol aparte (HsmOrgCarousel: carrusel de cards)
     con el copy debajo, switcheado por display contra este segun breakpoint.
     Cada arbol es autocontenido (su propio copy), a proposito: forzar un solo
     arbol a servir ambos ordenes de lectura (copy en medio en desktop, copy
     al final en mobile) exigiria reordenar por flex `order`, exactamente lo
     que esto evita. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="hidden lg-2:contents">
      <article class="sc-article mx-auto w-full max-w-7xl flex-col lg-2:flex-row lg-2:flex-nowrap items-center justify-center gap-10">
        <article class="sc-article min-w-[30rem] basis-[40rem] flex-col min-[1350px]:flex-row items-center justify-center gap-10">
          <div
            v-for="col in leftColumns"
            :key="col.key"
            class="sc-section flex min-w-[16rem] basis-[19rem] flex-col items-center justify-center gap-10 min-[1350px]:gap-32"
          >
            <HsmOrgCard
              v-for="item in col.items"
              :key="item.label"
              :image="item.image"
              :label="item.label"
            />
          </div>
        </article>

        <!-- text-center va en cada h*/p, no en el contenedor: el mixin text() les
             pone text-align:initial como propiedad propia y eso gana a la heredada. -->
        <div class="sc-section flex min-w-[28rem] basis-[34rem] flex-col items-center px-4">
          <h2 class="text-center font-secondary font-bold bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
            {{ t('hsm.org.titlePre') }}<br>
            {{ t('hsm.org.titleHighlight') }}
          </h2>
          <p class="mt-5 max-w-sm text-center text-ink-3">{{ t('hsm.org.description') }}</p>
          <div class="mt-8 flex w-full justify-center">
            <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
              {{ t('hsm.org.cta') }}
            </NuxtLink>
          </div>
        </div>

        <article class="sc-article min-w-[30rem] basis-[40rem] flex-col min-[1350px]:flex-row items-center justify-center gap-10">
          <div
            v-for="col in rightColumns"
            :key="col.key"
            class="sc-section flex min-w-[16rem] basis-[19rem] flex-col items-center justify-center gap-10 min-[1350px]:gap-32"
          >
            <HsmOrgCard
              v-for="item in col.items"
              :key="item.label"
              :image="item.image"
              :label="item.label"
            />
          </div>
        </article>
      </article>
    </div>

    <div class="lg-2:hidden">
      <HsmOrgCarousel :items="items" />

      <div class="sc-section mx-auto mt-10 flex w-full max-w-2xl flex-col items-center px-4">
        <h2 class="text-center font-secondary font-bold bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
          {{ t('hsm.org.titlePre') }}<br>
          {{ t('hsm.org.titleHighlight') }}
        </h2>
        <p class="mt-5 max-w-sm text-center text-ink-3">{{ t('hsm.org.description') }}</p>
        <div class="mt-8 flex w-full justify-center">
          <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
            {{ t('hsm.org.cta') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface OrgText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/organizacion — el nombre codifica la posicion en el abanico:
// t/b = top/bottom, l/r = lado, el numero es el orden dentro de la columna.
const images = [
  '/images/organizacion/tl1.png',
  '/images/organizacion/l2.png',
  '/images/organizacion/bl3.png',
  '/images/organizacion/tr1.png',
  '/images/organizacion/r2.png',
  '/images/organizacion/br3.png',
]
const texts = useLocalizedItems<OrgText>('hsm.org.items', images.length, ['label'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, image: images[i]! })))

// Orden de columnas de fuera hacia dentro en la izquierda y de dentro hacia
// fuera en la derecha, para que las dos cards que sobresalen queden en los
// extremos del abanico.
const leftColumns = computed(() => [
  { key: 'left-outer', items: [items.value[1]!] },
  { key: 'left-inner', items: [items.value[0]!, items.value[2]!] },
])

const rightColumns = computed(() => [
  { key: 'right-inner', items: [items.value[3]!, items.value[5]!] },
  { key: 'right-outer', items: [items.value[4]!] },
])
</script>
