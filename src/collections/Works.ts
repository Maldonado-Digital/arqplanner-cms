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
  endpoints: [
    {
      path: '/:id/resolve-project/:project_id',
      method: 'patch',
      handler: async (req, res) => {
        const work = await req.payload.findByID({
          collection: 'works',
          id: req.params.id,
          depth: 1,
        })

        const newProjects = work.projects.map(data => {
          if (data.id === req.params.project_id) {
            data = {
              ...data,
              project: {
                ...data.project,
                status: req.body.status,
                comments: req.body.comments,
              },
            }
          }

          if (typeof data.project.file === 'object') {
            return { ...data, project: { ...data.project, file: data.project.file.id } }
          }
          return data
        })

        const updated = await req.payload.update({
          collection: 'works',
          id: req.params.id,
          data: {
            projects: newProjects,
          },
          depth: 1,
        })

        res.status(200).send({ work: updated })
      },
    },
  ],
  // access: {
  // read: isAdminSelfOrSameOrg,
  // update: isAdminOrIsFromSameOrg(),
  // delete: isAdminOrIsFromSameOrg(),
  // },
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
      label: 'Imagens 3D',
      labels: {
        singular: 'Imagem 3D',
        plural: 'Imagens 3D',
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
