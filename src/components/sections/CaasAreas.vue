<!-- CaasAreas.vue — Zona 6. Carrusel de areas.

     Se construye por desviaciones sobre una linea base verificada, una por vez,
     para que cualquier fallo tenga una sola causa posible:
       base) la configuracion del carrusel de SPEI, sin añadidos
       1) navegadores laterales
       2) pieza activa centrada
       3) arranque diferido hasta despues de la hidratacion
       4) superposicion: vecinas escaladas y corridas detras de la activa

     La (4) es una prueba de concepto, no el efecto circular 3D que pidio el
     diseño. Se investigo antes de construirla (Eureka decision:3:16): la
     libreria abierta no trae rotacion circular de 360 grados —esa es un modulo
     de pago, distinto del paquete instalado— y sus dos efectos tridimensionales
     (coverflow, creative) escriben zIndex negativo por JavaScript en cada
     fotograma, el mismo mecanismo que borro las vecinas la vez anterior; ninguna
     hoja de estilos externa le gana a eso de forma sostenida. Por eso esta
     version no toca ningun modulo de efecto: estiliza por CSS las clases que
     Swiper YA aplica en su modo por defecto (activa/anterior/siguiente), donde
     nadie mas escribe transform ni zIndex por encima. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold bg-gradient-to-r from-accent to-brand-violet bg-clip-text text-transparent">
      {{ t('caas.areas.title') }}
    </h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('caas.areas.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.areas.cta') }}
      </NuxtLink>
    </div>

    <div class="mx-auto mt-12 w-full max-w-6xl">
      <!-- centered-slides va como ATRIBUTO, no como propiedad enlazada: getParams
           lee primero las propiedades y despues los atributos, y solo el camino
           del atributo pasa por el conversor que interpreta el texto. Mismo
           camino que slides-per-view e initial-slide, ya probado aqui. -->
      <!-- initial-slide="1" arranca centrado en la segunda pieza en vez de la
           primera: sin loop, arrancar en la 0 deja el lado izquierdo vacio (no
           hay pieza "prev" que mostrar ahi). Arrancando en la 1 se ve la
           composicion completa -anterior, activa, siguiente- desde el primer
           pintado. Puramente cosmetico: no cambia layout, precondiciones ni el
           limite marginal documentado abajo. -->
      <!-- DESVIACION sobre la base de SPEI: loop="false" en vez de true.
           Reportado en produccion, reproducido solo en navegacion SPA (nunca en
           carga directa): con loop y slides-per-view="auto" en el limite exacto
           de piezas que el modo circular necesita (5 piezas contra 2 visibles +
           1 + 1 = 4 en el corte mas ancho -el minimo, sin margen-), Swiper
           reordena los nodos reales del DOM (no clones) para armar el circuito,
           y en una parte de esos movimientos el <figure> interno de la pieza
           movida queda sin NINGUN estilo computado -ni ancho, ni display, nada-
           de forma permanente: inmune a swiper.update(), a swiper.loopFix(), a
           forzar reflow y a un resize real de la ventana. Se probo apagando loop
           nada mas para diagnosticar (no como solucion) y las 5 piezas volvieron
           a pintar sin excepcion, lo que aisla la causa al propio mecanismo de
           loop de la libreria en este limite marginal, no a una regla CSS de
           este archivo ni a un problema de carga de hojas de estilo. Con las 5
           piezas ya justo en el minimo que el modo circular exige, no hay forma
           de darle margen sin agregar piezas de relleno; se prefirio renunciar
           al recorrido infinito -las flechas siguen funcionando, solo dejan de
           dar la vuelta- antes que depender de un comportamiento de la libreria
           que falla silenciosamente en su propio limite documentado. -->
      <!-- init="false" es la compuerta que la propia libreria expone: al conectarse
           comprueba este atributo y se abstiene de tocar el DOM. Sin el, el
           componente se autoinicializa en cuanto queda definido —antes de que Vue
           hidrate— y duplica piezas en el DOM que el servidor entrego; Vue
           encuentra mas nodos de los que espera, los revierte, y de paso destruye
           lo que la libreria acababa de montar. Se arranca a mano una vez
           hidratado, y asi el orden es explicito en vez de accidental. -->
      <swiper-container
        ref="swiperEl"
        class="areas-swiper block"
        init="false"
        slides-per-view="auto"
        space-between="32"
        centered-slides="true"
        initial-slide="1"
        :loop="false"
        :keyboard="true"
        :speed="600"
        :navigation="true"
      >
        <swiper-slide v-for="area in areas" :key="area.title">
          <!-- figcaption solo es valido como primer o ultimo hijo de figure, nunca
               como hermano suelto — Vue lo marca porque un anidado invalido puede
               divergir entre lo que el servidor entrega y lo que el navegador
               reconstruye. El recorte redondeado se mueve al envoltorio de la
               imagen para que el overflow-hidden no le recorte el texto al
               figcaption, que ahora vive dentro. -->
          <figure class="sc-figure areas-card">
            <div class="areas-card__media overflow-hidden">
              <img
                :src="area.image"
                :alt="area.title"
                class="block w-full object-cover"
                decoding="async"
              >
            </div>

            <figcaption class="mt-6 text-center">
              <span class="block font-secondary text-3xl font-bold text-deep-ink">{{ area.title }}</span>
              <span class="mt-2 block text-xl text-text">{{ area.first }}</span>
              <span class="block text-xl text-text">{{ area.second }}</span>
            </figcaption>
          </figure>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AreaText {
  title: string
  first: string
  second: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const images = [
  '/images/caas/areas/1.webp',
  '/images/caas/areas/2.webp',
  '/images/caas/areas/3.webp',
  '/images/caas/areas/4.webp',
  '/images/caas/areas/5.webp',
]
const texts = useLocalizedItems<AreaText>('caas.areas.items', images.length, ['title', 'first', 'second'])
const areas = computed(() => texts.value.map((text, i) => ({ ...text, image: images[i] })))

// Arranque diferido hasta despues de la hidratacion. El porque esta en el
// composable; aca solo hace falta recordar que va de la mano con init="false".
const swiperEl = useSwiperInit()
</script>

<!-- Sin scope: la libreria reubica las piezas en su propio arbol y el atributo
     de scoping no alcanza a los descendientes que mueve. -->
<style>
/* Con slides-per-view="auto" el ancho de la pieza lo decide este CSS, y con el
   los cortes son los del proyecto. Mismo mecanismo que el carrusel de SPEI. */
.areas-swiper swiper-slide {
  height: auto;
  width: 86%;
}

@media screen and (min-width: 768px) {
  .areas-swiper swiper-slide {
    width: 58%;
  }
}

@media screen and (min-width: 1200px) {
  .areas-swiper swiper-slide {
    width: 46%;
  }
}

/* El radio grande y desigual es parte del lenguaje de la referencia. Vive en
   el envoltorio de la imagen (areas-card__media), no en areas-card: el figure
   ya no recorta -el figcaption vive dentro y no debe recortarse-, asi que el
   radio tiene que ir junto al overflow-hidden que sí sigue recortando algo. */
.areas-card__media {
  border-radius: 12rem 12rem 12rem 12rem / 8rem 8rem 8rem 8rem;
}

/* DESVIACION 1 sobre la linea base: navegadores laterales.
   Se pintan por ::part, que es la superficie que el componente expone; llegar a
   ellos por su marcado interno seria depender de un detalle privado suyo. */
.areas-swiper {
  --swiper-navigation-size: 1.6rem;
}

.areas-swiper::part(button-prev),
.areas-swiper::part(button-next) {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 9999px;
  background-color: var(--color-primary-soft);
  color: var(--color-brand-violet);
}

/* DESVIACION 4 sobre la linea base: superposicion. Confirmada por Fredy el
   2026-08-13, valores finales de esta ronda.

   PARA AJUSTAR — los cuatro diales, y donde vive cada uno:
   - Cuanto se meten las vecinas: translateX en las reglas .swiper-slide-prev
     (positivo) y .swiper-slide-next (negativo), lineas ~223-231. Hoy 6rem.
     Tiene que superar el space-between="32" (32px) del carrusel para que
     alcance a producir superposicion real y no solo cierre el hueco.
   - Que tan chicas se ven: scale() en esas mismas dos reglas. Hoy 0.56.
   - Que tan rapido se acomodan: transition: transform ..., linea 213. Hoy
     400ms. Compartida por las tres clases via la regla base (linea 205);
     no hace falta declararla de nuevo en swiper-slide-prev/next/active.
   - Que tan rapido se desvanece la que sale/entra: transition: opacity ...,
     linea 214. Hoy 100ms, deliberadamente mas corto que transform para que
     el cambio de tamaño quede tapado por la opacidad antes de notarse.

   Si el numero de piezas visibles a la vez cambiara (hoy son 3: anterior,
   activa, siguiente), revisar primero la precondicion del recorrido circular
   documentada en el bloque del template (visibles + grupo + 1).

   .swiper-slide-prev/-active/-next son clases que Swiper asigna solas en modo
   "slide" (el default, sin effect declarado). En ese modo la libreria mueve la
   franja completa y no toca transform ni zIndex de cada pieza — a diferencia de
   los modulos de efecto, aqui esas dos propiedades son enteramente nuestras.

   400ms/ease-out en vez del speed="600" del recorrido: el desplazamiento lateral
   ya lo cubre el speed del carrusel: este transform solo necesita "asentar" la
   escala y la profundidad un poco antes de que la pieza termine de llegar, para
   que no se sienta como dos animaciones separadas compitiendo.

   El traslado tiene que superar el space-between="32" del carrusel (32px): ese
   es el hueco que YA separa a la vecina de la activa antes de mover nada, asi
   que un traslado menor a eso no llega ni a cerrarlo, no digamos a meterla
   detras. Primera vuelta con 24px no se notaba por exactamente esto.

   transform-origin es el segundo ajuste, y el que de verdad faltaba: por
   defecto el origen del escalado es el CENTRO del elemento, asi que al achicar,
   el borde cercano a la activa retrocede (se aleja) antes de que el translate
   lo empuje — la escala le resta desplazamiento al propio movimiento que se
   busca. Fijando el origen en el borde que debe quedar pegado a la activa, ese
   borde ya no se mueve por el escalado: solo se mueve por el translate, y el
   achique ocurre completo del lado contrario (el que se va a la sombra). Asi el
   traslado se traduce integro en superposicion real, no en acercamiento.

   Tercer ajuste: la pieza que SALE (pierde prev/next sin ganar activa, porque
   quedo a dos posiciones) rebotaba a su tamaño original de golpe. La causa no
   es visual, es de cascada: al perder la clase, la regla que le daba transform
   Y transition desaparece con ella, asi que no hay nada que anime el regreso.
   La solucion no es intentar animar esa transicion de salida — es no tener
   nada que animar: toda pieza que no sea una de las tres etiquetadas vive en
   opacity:0 por defecto, y ganar/perder una de las tres etiquetas ahora
   tambien cruza ese opacity, con su propia transicion. La pieza que sale se
   desvanece en vez de rebotar, sin importar hacia que lado gire el carrusel.

   Ese default en opacity:0 NO puede aplicarse siempre: las tres clases las
   asigna la libreria recien cuando arranca, y este proyecto difiere ese
   arranque hasta despues de hidratar (useSwiperInit) para conservar el render
   de servidor. Si el default fuera invisible sin condicion, un visitante o
   rastreador que vea el HTML antes de ese arranque —o sin JavaScript del
   todo— veria el carrusel completo en blanco: exactamente lo que esa decision
   anterior evitaba. Por eso el ocultamiento esta condicionado a .is-ready, la
   bandera que useSwiperInit agrega al elemento host justo cuando el arranque
   termina: antes de eso, todo permanece visible por defecto, sin condicion.

   Las reglas que muestran a las tres etiquetadas repiten .is-ready y el tipo
   swiper-slide junto a su clase, y no es adorno: es lo que les da mas
   especificidad que la regla que oculta. Sin ese refuerzo, "2 clases + 1 tipo"
   (la regla que oculta) le gana a "2 clases" (mostrar sin el tipo repetido) y
   TODO quedaria invisible aunque este etiquetado — el bug se verificó al
   calcular la especificidad antes de compilar, no despues de verlo fallar. */
.areas-swiper.is-ready swiper-slide {
  opacity: 0;
  /* opacity en 100ms: bastante mas corto que el transform (400ms) para que la
     pieza se desvanezca justo antes de que se note el cambio de tamaño debajo,
     pero no tan instantaneo (0ms) como para leerse como un corte. transform
     sigue en 400ms porque a la que ENTRA le sirve seguir viendose crecer/entrar
     en marcha. */
  transition:
    transform 400ms ease-out,
    opacity 100ms ease-out;
}

.areas-swiper.is-ready swiper-slide.swiper-slide-prev,
.areas-swiper.is-ready swiper-slide.swiper-slide-next {
  z-index: 1;
  opacity: 1;
}

.areas-swiper.is-ready swiper-slide.swiper-slide-prev {
  transform-origin: right center;
  transform: translateX(6rem) scale(0.56);
}

.areas-swiper.is-ready swiper-slide.swiper-slide-next {
  transform-origin: left center;
  transform: translateX(-6rem) scale(0.56);
}

.areas-swiper.is-ready swiper-slide.swiper-slide-active {
  position: relative;
  z-index: 2;
  opacity: 1;
  transform: scale(1);
}
</style>
