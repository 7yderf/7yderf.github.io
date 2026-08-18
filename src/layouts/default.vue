<template>
  <div class="isolate flex min-h-screen flex-col bg-bg-second font-primary text-text">
    <!-- Fondo decorativo: glow naranja difuminado, fijo, asomando ~40% por la izquierda.
         -z-10 + isolate en el root: queda sobre el fondo blanco y bajo el contenido. -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10"
      style="background: radial-gradient(90rem 90rem at -5% 90%, rgba(255, 122, 77, 0.22), transparent 62%);"
    ></div>

    <!-- Announcement bar -->
    <div class="w-full bg-gradient-to-r from-accent to-primary-light px-4 py-2.5 text-text-invert">
      <p class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-2 text-center text-sm">
        <Icon icon="mdi:alert-circle-outline" class="hidden shrink-0 sm:block" width="18" height="18" />
        <strong class="font-semibold">{{ t('announcement.text') }}</strong>
        <a href="#" class="underline underline-offset-2">{{ t('announcement.cta') }} →</a>
      </p>
    </div>

    <!-- Header / Nav -->
    <header class="sc-header sticky top-0 z-40 flex-col border-b border-line bg-bg-second/95 backdrop-blur">
      <nav class="sc-nav mx-auto w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <NuxtLink :to="localePath('/')" class="shrink-0">
          <img src="/images/logo-conecta.png" alt="CONECTA" class="h-6 w-auto">
        </NuxtLink>

        <ul class="hidden items-center gap-8 font-secondary text-sm font-medium text-text lg:flex">
          <li ref="solutionsRef" class="relative">
            <button
              type="button"
              class="flex items-center gap-1 hover:text-primary"
              aria-haspopup="true"
              :aria-expanded="solutionsOpen"
              @click="solutionsOpen = !solutionsOpen"
            >
              {{ t('nav.solutions') }}
              <Icon
                icon="mdi:chevron-down"
                width="16"
                height="16"
                class="transition-transform"
                :class="{ 'rotate-180': solutionsOpen }"
              />
            </button>

            <!-- flex-col obligatorio: .sc-nav ul fuerza display:flex a CUALQUIER
                 ul anidado dentro de .sc-nav, no solo al de primer nivel. Sin
                 flex-col el panel hereda flex-direction:row y las 3 opciones
                 caen en columnas en vez de apilarse. -->
            <ul
              v-show="solutionsOpen"
              class="absolute left-0 top-full mt-3 flex min-w-[16rem] flex-col gap-1 rounded-xl border border-line bg-bg-second p-2 shadow-modal"
            >
              <li>
                <NuxtLink :to="localePath('/hardware-criptografico')" class="block rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="solutionsOpen = false">
                  {{ t('nav.solutionsMenu.hsm') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/infraestructura-spei')" class="block rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="solutionsOpen = false">
                  {{ t('nav.solutionsMenu.spei') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/cripto-as-a-service')" class="block rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="solutionsOpen = false">
                  {{ t('nav.solutionsMenu.caas') }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li><NuxtLink :to="`${localePath('/')}#fabricantes`" class="hover:text-primary">{{ t('nav.vendors') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#industrias`" class="hover:text-primary">{{ t('nav.industries') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#recursos`" class="hover:text-primary">{{ t('nav.resources') }}</NuxtLink></li>
          <li><NuxtLink :to="`${localePath('/')}#nosotros`" class="hover:text-primary">{{ t('nav.about') }}</NuxtLink></li>
        </ul>

        <div class="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <NuxtLink :to="localePath('/contact')" class="btn-primary">
            {{ t('nav.cta') }} →
          </NuxtLink>
        </div>

        <!-- Hamburguesa: solo existe donde el ul de arriba ya esta oculto
             por completo (debajo de lg). Solo abre — el cierre vive en el
             boton X propio del panel de pantalla completa, asi que no hace
             falta que el icono cambie de forma aqui. -->
        <button
          type="button"
          class="text-text hover:text-primary lg:hidden"
          aria-haspopup="true"
          :aria-expanded="mobileMenuOpen"
          aria-label="Abrir menú"
          @click="mobileMenuOpen = true"
        >
          <Icon icon="mdi:menu" width="26" height="26" />
        </button>
      </nav>
    </header>

    <!-- Panel movil: toma de pantalla completa (fixed inset-0), no un panel
         chico bajo el header — el estandar de un menu movil es cubrir todo
         el viewport, sin dejar la franja de anuncio asomando arriba. z-50,
         por encima del header (z-40): al ser opaco y cubrir todo, no hace
         falta un backdrop aparte. Vive fuera de <header> porque fixed no
         depende de ningun ancestro posicionado para su bloque contenedor.
         La cascada por bloque (transform+opacity con delay creciente) sigue
         el mismo patron que Riel2Panel.tsx del proyecto hermano
         tmx-frt-secure_center. -->
    <Transition name="mobile-menu">
      <div
        v-show="mobileMenuOpen"
        class="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg-second lg:hidden"
      >
        <div class="flex items-center justify-between px-4 py-4">
          <NuxtLink :to="localePath('/')" class="shrink-0" @click="closeMobileMenu()">
            <img src="/images/logo-conecta.png" alt="CONECTA" class="h-6 w-auto">
          </NuxtLink>
          <button
            type="button"
            class="text-text hover:text-primary"
            aria-label="Cerrar menú"
            @click="closeMobileMenu()"
          >
            <Icon icon="mdi:close" width="26" height="26" />
          </button>
        </div>

        <!-- text-left explicito: body{text-align:center} bajo 768px (fase 2
             del reset mobile, style.scss:384-394) se hereda a estos <a>
             sueltos y los centra; "Soluciones" no se nota porque es flex
             (justify-between posiciona por flexbox, no por text-align), pero
             el resto quedaba centrado e inconsistente con el trigger. -->
        <div class="flex flex-1 flex-col gap-1 border-t border-line px-4 py-4 text-left font-secondary text-base font-medium text-text">
          <div
            class="transition-[opacity,transform] duration-300 ease-out"
            :class="mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-1 rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary"
              :aria-expanded="mobileSolutionsOpen"
              @click="mobileSolutionsOpen = !mobileSolutionsOpen"
            >
              {{ t('nav.solutions') }}
              <Icon
                icon="mdi:chevron-down"
                width="18"
                height="18"
                class="transition-transform"
                :class="{ 'rotate-180': mobileSolutionsOpen }"
              />
            </button>
            <!-- Acordeon via grid-template-rows 0fr/1fr: a diferencia de un
                 max-height fijo, se ajusta a la altura real del contenido
                 sin adivinar un tope en px. overflow-hidden en los dos
                 niveles -la fila del grid y el contenido- es necesario: sin
                 el interno, el contenido se ve completo antes de que la fila
                 termine de crecer. -->
            <div
              class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
              :class="mobileSolutionsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="flex flex-col gap-1 overflow-hidden py-1 pl-6">
                <NuxtLink :to="localePath('/hardware-criptografico')" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">
                  {{ t('nav.solutionsMenu.hsm') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/infraestructura-spei')" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">
                  {{ t('nav.solutionsMenu.spei') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/cripto-as-a-service')" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">
                  {{ t('nav.solutionsMenu.caas') }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col gap-1 transition-[opacity,transform] delay-75 duration-300 ease-out"
            :class="mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'"
          >
            <NuxtLink :to="`${localePath('/')}#fabricantes`" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">{{ t('nav.vendors') }}</NuxtLink>
            <NuxtLink :to="`${localePath('/')}#industrias`" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">{{ t('nav.industries') }}</NuxtLink>
            <NuxtLink :to="`${localePath('/')}#recursos`" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">{{ t('nav.resources') }}</NuxtLink>
            <NuxtLink :to="`${localePath('/')}#nosotros`" class="rounded-lg px-3 py-2 hover:bg-surface-2 hover:text-primary" @click="closeMobileMenu()">{{ t('nav.about') }}</NuxtLink>
          </div>

          <div
            class="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 transition-[opacity,transform] delay-150 duration-300 ease-out"
            :class="mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'"
          >
            <LanguageSwitcher />
            <NuxtLink :to="localePath('/contact')" class="btn-primary" @click="closeMobileMenu()">
              {{ t('nav.cta') }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="sc-footer flex-col border-t border-line bg-bg-second">
      <div class="sc-article mx-auto flex w-full max-w-7xl flex-wrap gap-10 px-4 py-7 lg:px-8 lg-2:py-14">
        <div class="min-w-[16rem] grow-[2] basis-64">
          <img src="/images/logo-conecta.png" alt="CONECTA" class="h-6 w-auto">
          <p class="mt-3 max-w-xs font-secondary text-sm text-ink-3">{{ t('footer.tagline') }}</p>
        </div>

        <div v-for="column in footerColumns" :key="column.title" class="min-w-[10rem] grow basis-40">
          <h3 class="font-secondary text-sm font-bold text-deep-ink">{{ column.title }}</h3>
          <ul class="mt-4 flex flex-col gap-3 font-secondary text-sm text-ink-3">
            <li v-for="link in column.links" :key="link">
              <a href="#" class="hover:text-primary">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div class="min-w-[10rem] grow basis-40">
          <h3 class="font-secondary text-sm font-bold text-deep-ink">{{ t('footer.contact.title') }}</h3>
          <ul class="mt-4 flex flex-col gap-3 font-secondary text-sm text-ink-3">
            <li>
              {{ t('footer.contact.emailLabel') }}:
              <a :href="`mailto:${t('footer.contact.email')}`" class="hover:text-primary">{{ t('footer.contact.email') }}</a>
            </li>
            <li>
              {{ t('footer.contact.phoneLabel') }}:
              <a :href="`tel:${t('footer.contact.phone').replace(/\s+/g, '')}`" class="hover:text-primary">{{ t('footer.contact.phone') }}</a>
            </li>
            <li>{{ t('footer.contact.address') }}</li>
          </ul>

          <div class="mt-5 flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-line text-deep-ink hover:border-primary hover:text-primary"
            >
              <Icon :icon="social.icon" width="18" height="18" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-line">
        <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 font-secondary text-sm text-ink-3 md:flex-row lg:px-8">
          <p>© {{ year }} Conecta. {{ t('footer.rights') }}</p>
          <div class="flex gap-6">
            <NuxtLink :to="localePath('/privacy')" class="hover:text-primary">{{ t('footer.privacy') }}</NuxtLink>
            <a href="#" class="hover:text-primary">{{ t('footer.terms') }}</a>
            <a href="#" class="hover:text-primary">{{ t('footer.security') }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const localePath = useLocalePath()
const { t } = useI18n()

// Dropdown de "Soluciones" (escritorio): boton toggle, no link directo — el
// click abre el panel con las 3 vistas de campaña. Sin VueUse en el
// proyecto, el cierre por click afuera y Escape se resuelve con un listener
// propio en document, montado solo mientras el layout vive.
//
// composedPath(), no target+contains(): un boton toggle cuyo propio icono
// cambia en reaccion al click que lo abre puede dejar el nodo que origino
// el evento desconectado del arbol para cuando este listener corre —
// target.contains() daria false aunque el click ocurrio adentro.
// composedPath() devuelve la cadena de nodos capturada al momento del
// dispatch, inmune a esa mutacion (ver decision:4:37).
const solutionsOpen = ref(false)
const solutionsRef = ref<HTMLElement | null>(null)

// Panel movil: toma de pantalla completa, no un popover anclado — no hay
// "afuera" que detectar (cerrar es via el boton X propio, Escape, o elegir
// un link). Estado del acordeon interno separado del dropdown de escritorio.
const mobileMenuOpen = ref(false)
const mobileSolutionsOpen = ref(false)

function closeMobileMenu() {
  mobileMenuOpen.value = false
  mobileSolutionsOpen.value = false
}

// Cierra el panel movil solo, sin tocar el acordeon: cruzar a desktop no
// deberia perder que "Soluciones" seguia expandido si el usuario vuelve a mobile.
const isDesktop = useMedia('(min-width: 1024px)')
watch(isDesktop, (desktop) => {
  if (desktop) mobileMenuOpen.value = false
})

// Scroll-lock: el panel movil es una toma de pantalla completa, asi que el
// body no debe poder scrollear detras mientras esta abierto -sin esto el
// mouse wheel sigue moviendo la pagina aunque visualmente se vea bloqueada.
watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function onDocumentClick(event: MouseEvent) {
  const path = event.composedPath()
  if (solutionsOpen.value && solutionsRef.value && !path.includes(solutionsRef.value)) {
    solutionsOpen.value = false
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    solutionsOpen.value = false
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onDocumentKeydown)
})

const year = new Date().getFullYear()

const complianceLinks = useLocalizedStrings('footer.compliance.links', 4)

// Compañía y Soluciones ocultas por ahora (pedido explícito) — las traducciones
// siguen en i18n/locales, solo falta agregarlas de vuelta a este array.
const footerColumns = computed(() => [
  { title: t('footer.compliance.title'), links: complianceLinks.value },
])

const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', href: 'https://www.linkedin.com/company/conectamx/' },
  { name: 'TikTok', icon: 'simple-icons:tiktok', href: 'https://www.tiktok.com/@conectamx_soluciones' },
  { name: 'Instagram', icon: 'mdi:instagram', href: 'https://www.instagram.com/conectamx_soluciones/' },
  { name: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/ConectaSolucionesMX' },
]
</script>

<style scoped>
/* Fade minimo en el contenedor del panel movil: el <Transition> coordina que
   v-show alterne display: none/flex recien al terminar esta transicion -sin
   ella, v-show cortaria de golpe y la cascada de opacity/transform de los
   bloques internos (clases utilitarias en el template) no alcanzaria a
   notarse. */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 200ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
