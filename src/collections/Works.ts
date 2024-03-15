import type { CollectionConfig } from 'payload/types'
import { isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditorFieldLevel } from '../access/isAdminOrEditor'
import { isAdminOrIsFromSameOrg } from '../access/isAdminOrIsFromSameOrg'
import { isAdminSelfOrSameOrg } from '../access/isAdminSelfOrSameOrg'
import { document } from '../fields/document'
import { event } from '../fields/event'
import { photo } from '../fields/photo'
import { project } from '../fields/project'
import { quote } from '../fields/quote'
import { render } from '../fields/render'
import { step } from '../fields/step'

export const Works: CollectionConfig = {
  slug: 'works',
  labels: {
    plural: 'Trabalhos',
    singular: 'Trabalho',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'steps', 'events', 'projects', 'documents', 'quotes'],
    // hideAPIURL: true,
  },
  access: {
    read: isAdminSelfOrSameOrg,
    update: isAdminOrIsFromSameOrg(),
    delete: isAdminOrIsFromSameOrg(),
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
      label: 'Agenda',
      labels: {
        singular: 'Compromisso',
        plural: 'Agenda',
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
      label: 'Renders 3D',
      labels: {
        singular: 'Render 3D',
        plural: 'Renders 3D',
      },
      fields: [render],
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
      fields: [photo],
    },
    {
      name: 'quotes',
      type: 'array',
      localized: true,
      label: 'Orçamentos',
      labels: {
        singular: 'Orçamento',
        plural: 'Orçamentos',
      },
      fields: [quote],
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Escritório',
      hasMany: false,
      defaultValue: ({ user }) => {
        if (user.role === 'editor' && user.organization) {
          return user.organization
        }
      },
      access: {
        // read: isAdminOrEditorFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      // admin: {
      //   hidden: true,
      // },
    },
  ],
}
