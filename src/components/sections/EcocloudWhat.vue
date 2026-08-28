<!-- EcocloudWhat.vue — Zona 2. "¿Que es?": intro centrada + panel de diagrama
     de arquitectura debajo. El panel reusa el riel de 2 columnas ya validado
     (flex-wrap + basis + min-w): columna izquierda = imagen plana del
     diagrama de arquitectura; columna derecha = "Web Services" + tronco
     vertical + punto central + 6 ramas hacia cada pildora de servicio -esto
     ultimo reemplaza el riel simple (border-l) que decision:5:4 eligio por
     no haber asset real todavia. Colores confirmados por muestreo de pixel
     contra la referencia (Fredy, 2026-08-27): panel=accent-soft, pildora=
     accent-mid, tronco/punto/flechas=accent -no valores sueltos.

     El tronco+ramas se arma con flexbox puro, sin medir el DOM: cada rama
     vive DENTRO de su propia fila (flex items-center), asi que se centra
     sola respecto a esa pildora sin importar si su texto ocupa 1 o 2 lineas
     -evita el problema que decision:5:4 esquivaba de origen (piezas de
     altura variable). El tronco es una linea absoluta que corre inset-y-0
     sobre el wrapper que envuelve las 6 filas: su alto lo define el propio
     flujo de esas filas, no un valor fijo. El punto se centra en top-1/2 de
     ESE MISMO wrapper -al medio del tronco, no de una fila en particular,
     igual que en la referencia (entre las piezas 3 y 4 de 6). Las flechas
     por rama son un triangulo CSS (border-trick), no iconos ni SVG -no
     amerita esa dependencia para una punta de 4px.

     overflow-hidden en el panel (verificado a 320px, el corte xs-2 mas
     angosto del proyecto): el icono desbordado de cada pildora usa un
     translate-x fijo para montarse sobre el borde -a 320px la pildora se
     angosta lo suficiente para que ese desborde salga del viewport entero,
     no solo de la pildora, y arrastra scroll horizontal a toda la pagina.
     El limite correcto del desborde es el PANEL, no la pildora -asi el
     efecto sigue viéndose igual en desktop (donde nunca llega a tocar el
     borde del panel) y queda contenido cuando el espacio se acorta.

     Variante responsive DEDICADA por debajo de 991px (lg-2:), no la misma
     composicion reacomodada por CSS -Fredy proporciono un segundo diagrama
     (que-es-responsive.png: Tesseract arriba, las 2 regiones lado a lado
     abajo, Node Y conectandolas -arreglo distinto, no un reescalado del de
     desktop) y una referencia visual completa de este corte: grid de 3
     columnas para las 6 pildoras (icono arriba, texto abajo, centrado -no
     la pildora horizontal con icono a la derecha) y el punto central con
     2 flechas diagonales bajando hacia el grid en vez de 6 ramas
     horizontales 1:1. Son dos DOM distintos (hidden lg-2:block /
     lg-2:hidden), no una sola estructura reacomodada: el conector cambia
     de geometria (ramas horizontales <-> flechas diagonales), no solo de
     tamaño, y eso no es expresable con las mismas clases utilitarias.
     Orden de las 6 pildoras en el grid: igual que la lista de escritorio
     (mismo arreglo `services`), no el orden que parece mostrar la
     referencia -shufflear el orden por idioma seria fragil si el texto
     cambia de largo; ajustar si Fredy confirma que el orden si importa. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('ecoCloud.what.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('ecoCloud.what.body') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('ecoCloud.what.cta') }}
      </NuxtLink>
    </div>

    <div class="mx-auto mt-12 w-full max-w-6xl overflow-hidden rounded-3xl bg-accent-soft p-6 lg-2:p-12">
      <!-- Desktop (lg-2: 991px+): 2 columnas, tronco+ramas horizontales. -->
      <article class="sc-article hidden flex-wrap items-stretch gap-8 lg-2:flex">
        <!-- Diagrama: imagen plana, no reconstruida en CSS -ver comentario de
             cabecera. object-contain porque el aspect-ratio real (620x459) no
             coincide exacto con el de la tarjeta a cada corte del reacomodo;
             forzar cover recortaria texto de los recuadros del propio grafico. -->
        <div class="sc-section flex min-w-[26rem] basis-[32rem] items-center justify-center rounded-2xl bg-white p-6 lg-2:p-10">
          <img
            src="/images/ecosistema-cloud/que-es/diagrama.png"
            :alt="t('ecoCloud.what.diagram.alt')"
            class="block w-full object-contain"
          >
        </div>

        <!-- Web Services + tronco + punto + ramas -->
        <div class="sc-section flex min-w-[26rem] basis-[32rem] items-center gap-6">
          <div class="flex shrink-0 flex-col items-end gap-2 text-right">
            <span class="text-sm font-bold text-deep-ink">{{ t('ecoCloud.what.diagram.webServices') }}</span>
            <span class="block h-0 w-14 border-t-2 border-dashed border-accent" aria-hidden="true" />
          </div>

          <div class="relative flex flex-1 flex-col gap-7">
            <span class="absolute inset-y-0 left-0 w-0.5 bg-accent" aria-hidden="true" />
            <span class="absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent p-2" aria-hidden="true">
              <img src="/images/ecosistema-cloud/que-es/central.png" alt="" class="h-full w-full object-contain">
            </span>

            <div
              v-for="service in services"
              :key="service.label"
              class="flex items-center"
            >
              <span class="h-0.5 w-5 shrink-0 bg-accent" aria-hidden="true" />
              <span class="h-0 w-0 shrink-0 border-y-4 border-l-4 border-y-transparent border-l-accent" aria-hidden="true" />
              <div class="relative ml-1 flex flex-1 items-center rounded-full bg-accent-mid py-3 pl-5 pr-16">
                <span class="text-sm font-medium text-text">{{ service.label }}</span>
                <img
                  :src="service.icon"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute right-0 top-1/2 h-16 w-16 -translate-y-1/2 translate-x-1/4 object-contain lg-2:h-20 lg-2:w-20"
                >
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Movil/tablet (hasta 990px): diagrama distinto (regiones lado a lado
           en vez de apiladas), punto central con 2 flechas diagonales, grid
           de 3 columnas para las 6 pildoras -ver comentario de cabecera. -->
      <div class="flex flex-col items-center gap-8 lg-2:hidden">
        <div class="w-full max-w-md rounded-2xl bg-white p-6">
          <img
            src="/images/ecosistema-cloud/que-es/diagrama-mobile.png"
            :alt="t('ecoCloud.what.diagram.alt')"
            class="block w-full object-contain"
          >
        </div>

        <div class="flex flex-col items-center">
          <span class="text-sm font-bold text-deep-ink">{{ t('ecoCloud.what.diagram.webServices') }}</span>
          <span class="block h-6 w-0 border-l-2 border-dashed border-accent" aria-hidden="true" />
          <span class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent p-2" aria-hidden="true">
            <img src="/images/ecosistema-cloud/que-es/central.png" alt="" class="h-full w-full object-contain">
          </span>
          <!-- 2 flechas diagonales hacia el grid: geometria distinta a las
               ramas horizontales de escritorio, no expresable con el mismo
               truco de borde -por eso SVG aca y no en la version de arriba. -->
          <svg viewBox="0 0 200 56" class="mt-1 h-10 w-full max-w-[200px] text-accent" fill="none" aria-hidden="true">
            <path d="M100 2 L34 50" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" />
            <path d="M100 2 L166 50" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" />
            <path d="M34 50 L42 43 M34 50 L40 55" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M166 50 L158 43 M166 50 L160 55" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>

        <div class="grid w-full grid-cols-3 gap-3">
          <div
            v-for="service in services"
            :key="service.label"
            class="flex flex-col items-center gap-2 rounded-2xl bg-accent-mid p-3 text-center"
          >
            <img :src="service.icon" alt="" aria-hidden="true" class="h-10 w-10 object-contain">
            <span class="text-xs font-medium text-text">{{ service.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServiceText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Orden fijo, el mismo del mockup -1.png..6.png en assets/Cripto As a
// Service_Ecosistema Cloud/iconos-diagrama-que-es/.
const icons = [
  '/images/ecosistema-cloud/que-es/1.png',
  '/images/ecosistema-cloud/que-es/2.png',
  '/images/ecosistema-cloud/que-es/3.png',
  '/images/ecosistema-cloud/que-es/4.png',
  '/images/ecosistema-cloud/que-es/5.png',
  '/images/ecosistema-cloud/que-es/6.png',
]
const texts = useLocalizedItems<ServiceText>('ecoCloud.what.diagram.services', icons.length, ['label'])
const services = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>
