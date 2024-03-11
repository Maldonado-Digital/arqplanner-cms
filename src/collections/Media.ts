import { CollectionConfig } from 'payload/types'
import { isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditorFieldLevel } from '../access/isAdminOrEditor'
import { isAdminOrIsFromSameOrg } from '../access/isAdminOrIsFromSameOrg'

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
    read: isAdminOrIsFromSameOrg(),
    create: isAdminOrIsFromSameOrg(),
    update: isAdminOrIsFromSameOrg(),
    delete: isAdminOrIsFromSameOrg(),
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'application/acad'],
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Empresa',
      hasMany: false,
      defaultValue: ({ user }) => {
        if (user.role === 'editor' && user.organization) {
          return user.organization
        }
      },
      access: {
        read: isAdminOrEditorFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      // admin: {
      //   hidden: true,
      // },
    },
  ],
}
