import type { Field } from 'payload/types'
import { addWorkToMediaFieldHook } from '../hooks/addWorkToMedia'

export const photo: Field = {
  name: 'photo',
  type: 'group',
  localized: true,
  label: 'Álbum',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
    },
    {
      name: 'files',
      localized: true,
      label: 'Arquivos',
      labels: {
        singular: 'Arquivo',
        plural: 'Arquivos',
      },
      type: 'array',
      fields: [
        {
          name: 'uploads',
          type: 'upload',
          relationTo: 'media',
          label: 'Arquivo',
          localized: true,
          required: true,
          hooks: {
            beforeValidate: [addWorkToMediaFieldHook],
          },
        },
      ],
    },
  ],
}
