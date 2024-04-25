import type { Field } from 'payload/types'

export const render: Field = {
  name: 'render',
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
      name: 'status',
      type: 'select',
      label: 'Status',
      localized: true,
      required: true,
      defaultValue: 'pending',
      hasMany: false,
      options: [
        {
          label: 'Pendente',
          value: 'pending',
        },
        {
          label: 'Aprovado',
          value: 'approved',
        },
        {
          label: 'Arquivado',
          value: 'archived',
        },
      ],
    },
    {
      name: 'comments',
      type: 'textarea',
      label: 'Comentário do Cliente',
      localized: true,
      admin: {
        readOnly: true,
        placeholder: 'Comentário do cliente ao aprovar ou rejeitar o projeto.',
      },
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
        },
      ],
    },
  ],
}
