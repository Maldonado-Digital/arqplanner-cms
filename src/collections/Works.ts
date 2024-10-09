import type { CollectionConfig } from 'payload/types'
import { createWorksAccessControl } from '../access/CreateWorks'
import { deleteWorksAccessControl } from '../access/DeleteWorks'
import { readWorksAccessControl } from '../access/ReadWorks'
import { updateWorksAccessControl } from '../access/UpdateWorks'
import { isAdminOrSuperAdminFieldLevel } from '../access/isAdmin'
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
  // defaultSort: '-createdAt',
  labels: {
    plural: 'Trabalhos',
    singular: 'Trabalho',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'steps', 'events', 'projects', 'documents', 'quotes'],
    hideAPIURL: true,
    disableDuplicate: true,
  },
  endpoints: [resolveProject, resolveRender],
  access: {
    read: readWorksAccessControl,
    create: createWorksAccessControl,
    update: updateWorksAccessControl,
    delete: deleteWorksAccessControl,
  },
  hooks: {
    beforeChange: [],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
      admin: {
        condition: ({ id }) => !!id,
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
        create: isAdminOrSuperAdminFieldLevel,
        update: isAdminOrSuperAdminFieldLevel,
      },
    },
  ],
}
