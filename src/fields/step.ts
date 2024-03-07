import type { Field } from 'payload/types'

export const step: Field = {
  name: 'step',
  type: 'group',
  localized: true,
  label: 'Etapa',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Etapa do projeto',
      },
    },
    {
      name: 'is_completed',
      type: 'checkbox',
      label: 'Etapa Completa',
      localized: true,
      required: true,
      defaultValue: false,
    },
  ],
}
