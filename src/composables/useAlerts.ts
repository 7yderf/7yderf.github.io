import Swal from 'sweetalert2'

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

// Iconos inline (paths Lucide) como data URI — sin dependencias de archivos de imagen.
function svgDataUri(color: string, paths: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const alertImages = {
  success: svgDataUri('#22c55e', '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>'),
  error: svgDataUri('#ef4444', '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
  clock: svgDataUri('#f59e0b', '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
  server: svgDataUri('#ef4444', '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>'),
} as const

type AlertImage = keyof typeof alertImages

export function useAlerts() {
  /** Toast no bloqueante en la esquina superior derecha */
  const toast = (icon: AlertIcon, title: string, timer = 4000) =>
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: (el) => {
        el.addEventListener('mouseenter', Swal.stopTimer)
        el.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

  /** Modal informativo con botón de confirmación */
  const alert = (icon: AlertIcon, title: string, text = '', confirmText = 'Aceptar') =>
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: confirmText,
      confirmButtonColor: '#242636',
    })

  /** Modal de confirmación; resuelve true si el usuario confirma */
  const confirm = async (
    title: string,
    text = '',
    confirmText = 'Sí, continuar',
    cancelText = 'Cancelar',
  ) => {
    const result = await Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#242636',
      reverseButtons: true,
    })
    return result.isConfirmed
  }

  /** Modal con icono ilustrado (usado por useErrorHandler para 401/403/500) */
  const alertWithImage = (image: AlertImage, title: string, message = '', timer = 5000) =>
    Swal.fire({
      imageUrl: alertImages[image],
      imageWidth: 48,
      title,
      html: `<p style="text-align:center">${message}</p>`,
      timer,
      showCloseButton: true,
      showConfirmButton: false,
    })

  return { toast, alert, confirm, alertWithImage }
}
