// Store de ejemplo — patrón setup store de Pinia con auto-import
export const useAppStore = defineStore('app', () => {
  const menuOpen = ref(false)

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  return { menuOpen, toggleMenu }
})
