import Lightgallery from 'lightgallery/vue'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VLightgallery', Lightgallery)
})
