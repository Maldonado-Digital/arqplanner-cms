import type { CollectionConfig } from 'payload/types'
import { isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditorFieldLevel } from '../access/isAdminOrEditor'
import { isAdminOrEditorFromSameOrg } from '../access/isAdminOrEditorFromSameOrg'
import { isAdminOrIsFromSameOrg } from '../access/isAdminOrIsFromSameOrg'
import { isAdminSelfOrSameOrg } from '../access/isAdminSelfOrSameOrg'
import { resolveProject } from '../endpoints/resolveProject'
import { resolveRender } from '../endpoints/resolveRender'
import { document } from '../fields/document'
import { event } from '../fields/event'
import { photo } from '../fields/photo'
import { project } from '../fields/project'
import { quote } from '../fields/quote'
import { render } from '../fields/render'
import { step } from '../fields/step'

export const Works: CollectionConfig = {
  slug: 'works',
  defaultSort: '-createdAt',
  labels: {
    plural: 'Trabalhos',
    singular: 'Trabalho',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'steps', 'events', 'projects', 'documents', 'quotes'],
    hideAPIURL: true,
  },
  endpoints: [resolveProject, resolveRender],
  access: {
    read: isAdminSelfOrSameOrg,
    create: isAdminOrEditorFromSameOrg,
    update: isAdminOrEditorFromSameOrg,
    delete: isAdminOrEditorFromSameOrg,
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
      name: 'photos',
      type: 'array',
      localized: true,
      label: 'Fotos',
      labels: {
        singular: 'Álbum',
        plural: 'Álbuns',
      },
      fields: [photo],
    },
    {
      name: 'renders',
      type: 'array',
      localized: true,
      label: 'Imagens 3D',
      labels: {
        singular: 'Álbum',
        plural: 'Álbuns',
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
      required: true,
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
