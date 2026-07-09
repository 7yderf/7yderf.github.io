import { ref, onMounted, onUnmounted, type Ref } from 'vue'

// SSR: matchMedia no existe en servidor, matches queda en false hasta onMounted (cliente).
export function useMedia(query: string): Ref<boolean> {
  const matches = ref(false)
  let media: MediaQueryList | null = null

  const update = (e: MediaQueryListEvent) => {
    matches.value = e.matches
  }

  onMounted(() => {
    media = window.matchMedia(query)
    matches.value = media.matches
    media.addEventListener('change', update)
  })

  onUnmounted(() => {
    media?.removeEventListener('change', update)
  })

  return matches
}
