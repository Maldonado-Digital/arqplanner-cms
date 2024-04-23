import type { Field } from 'payload/types'

export const project: Field = {
  name: 'project',
  type: 'group',
  localized: true,
  label: 'Projeto',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Título do projeto',
      },
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
      name: 'type',
      type: 'select',
      label: 'Categoria',
      localized: true,
      required: true,
      hasMany: false,
      admin: { isClearable: true },
      options: [
        {
          label: 'Executivo',
          value: 'executive',
        },
        {
          label: 'Detalhamento Marcenaria',
          value: 'wood_detailing',
        },
        {
          label: 'Detalhamento Áreas Molhadas',
          value: 'wet_spaces_detailing',
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
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Arquivo',
      localized: true,
      required: true,
    },
  ],
}
