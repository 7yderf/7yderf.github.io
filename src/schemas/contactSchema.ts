import * as yup from 'yup'

type Translate = (key: string) => string

// Schema desacoplado del layout (ContactSection.vue lo importa, no lo declara inline).
// Se construye como funcion de t() para que los mensajes de error viajen con el locale activo.
export function createContactSchema(t: Translate) {
  return yup.object({
    name: yup.string().trim().required(t('contact.validation.required')),
    company: yup.string().trim().required(t('contact.validation.required')),
    email: yup.string().trim().email(t('contact.validation.email')).required(t('contact.validation.required')),
    service: yup.string().required(t('contact.validation.required')),
  })
}

export type ContactFormValues = yup.InferType<ReturnType<typeof createContactSchema>>
