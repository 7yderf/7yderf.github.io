import { register } from 'swiper/element/bundle'

// Registra <swiper-container> y <swiper-slide> como web components.
// El bundle incluye todos los módulos (navigation, pagination, autoplay, effects…)
// configurables por atributos. Ver https://swiperjs.com/element
export default defineNuxtPlugin(() => {
  register()
})
