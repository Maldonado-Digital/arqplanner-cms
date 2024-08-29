import type { Field } from 'payload/types'
import { addWorkToMediaFieldHook } from '../hooks/addWorkToMedia'

export const document: Field = {
  name: 'document',
  type: 'group',
  localized: true,
  label: 'Documento',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Categoria',
      localized: true,
      required: true,
      hasMany: false,
      admin: { isClearable: true },
      options: [
        {
          label: 'Propostas',
          value: 'offers',
        },
        {
          label: 'Briefings',
          value: 'briefings',
        },
        {
          label: 'Contratos',
          value: 'contracts',
        },
        {
          label: 'Atas de Reunião',
          value: 'meeting_minutes',
        },
        {
          label: 'Outro',
          value: 'other',
        },
      ],
    },
    {
      name: 'file',
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
}
