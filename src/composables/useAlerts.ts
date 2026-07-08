import Swal from 'sweetalert2'

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

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

  return { toast, alert, confirm }
}
