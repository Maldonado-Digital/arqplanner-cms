import type { Field } from 'payload/types'

export const quote: Field = {
  name: 'quote',
  type: 'group',
  localized: true,
  label: 'Orçamento',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Título do orçamento',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Arquivo',
      localized: true,
      required: true,
    },
  ],
}
