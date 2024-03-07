import { CollectionConfig } from 'payload/types'
import { document } from '../fields/document'
import { event } from '../fields/event'
import { project } from '../fields/project'
import { quoting } from '../fields/quoting'
import { step } from '../fields/step'

export const Works: CollectionConfig = {
  slug: 'works',
  labels: {
    plural: 'Trabalhos',
    singular: 'Trabalho',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      admin: {
        placeholder: 'Título do trabalho',
      },
    },
    {
      name: 'steps',
      type: 'array',
      localized: true,
      label: 'Etapas',
      labels: {
        singular: 'Etapa',
        plural: 'Etapas',
      },
      fields: [step],
    },
    {
      name: 'events',
      type: 'array',
      localized: true,
      label: 'Eventos',
      labels: {
        singular: 'Evento',
        plural: 'Eventos',
      },
      fields: [event],
    },
    {
      name: 'projects',
      type: 'array',
      localized: true,
      label: 'Projetos',
      labels: {
        singular: 'Projeto',
        plural: 'Projetos',
      },
      fields: [project],
    },
    {
      name: 'renders',
      type: 'array',
      localized: true,
      label: '3Ds',
      labels: {
        singular: '3D',
        plural: '3Ds',
      },
      fields: [
        {
          name: 'files',
          type: 'upload',
          relationTo: 'media',
          label: 'Arquivo',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      localized: true,
      label: 'Documentos',
      labels: {
        singular: 'Documento',
        plural: 'Documentos',
      },
      fields: [document],
    },
    {
      name: 'photos',
      type: 'array',
      localized: true,
      label: 'Fotos',
      labels: {
        singular: 'Foto',
        plural: 'Fotos',
      },
      fields: [
        {
          name: 'files',
          type: 'upload',
          relationTo: 'media',
          label: 'Arquivo',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'quotings',
      type: 'array',
      localized: true,
      label: 'Orçamentos',
      labels: {
        singular: 'Orçamento',
        plural: 'Orçamentos',
      },
      fields: [quoting],
    },
  ],
}
