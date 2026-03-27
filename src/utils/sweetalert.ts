import Swal from 'sweetalert2'

export const showAlert = (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#0a1944', // INOPAS primary color
    confirmButtonText: 'D\'accord',
    customClass: {
      popup: 'rounded-[1.5rem]',
      confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
    }
  })
}

export const showConfirm = (title: string, text: string, confirmText: string = 'Confirmer', cancelText: string = 'Annuler') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#bb0020', // INOPAS secondary color (red)
    cancelButtonColor: '#767680', // INOPAS outline color
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      popup: 'rounded-[1.5rem]',
      confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
      cancelButton: 'rounded-xl px-6 py-2.5 font-bold',
    }
  })
}

export const showToast = (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return Toast.fire({
    icon,
    title
  })
}
