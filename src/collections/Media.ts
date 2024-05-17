import type { CollectionConfig } from 'payload/types'
import { isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditorFromSameOrg } from '../access/isAdminOrEditorFromSameOrg'
import { isAdminSelfOrSameOrg } from '../access/isAdminSelfOrSameOrg'
import { validateFileExtension } from '../hooks/validateFileExtension'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: {
      'pt-BR': 'Mídia',
    },
    singular: {
      'pt-BR': 'Mídias',
    },
  },
  admin: {
    hideAPIURL: true,
  },
  access: {
    read: isAdminSelfOrSameOrg,
    create: isAdminOrEditorFromSameOrg,
    update: isAdminOrEditorFromSameOrg,
    delete: isAdminOrEditorFromSameOrg,
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    // adminThumbnail: ({ doc }) => {
    //   if (doc.mimeType === 'application/pdf') {
    //     return 'https://img.icons8.com/?size=128&id=36925&format=png&'
    //   }

    //   return `${doc.filename}`
    // },
    // mimeTypes: ['image/*', 'application/pdf', 'application/octet-stream'],
  },

  fields: [
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
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
  hooks: {
    beforeValidate: [validateFileExtension],
  },
}
