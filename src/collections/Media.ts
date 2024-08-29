import type { CollectionConfig } from 'payload/types'
import { createMediaAccessControl } from '../access/CreateMedia'
import { deleteMediaAccessControl } from '../access/DeleteMedia'
import { readMediaAccessControl } from '../access/ReadMedia'
import { updateMediaAccessControl } from '../access/UpdateMedia'
import { isAdminOrSuperAdminFieldLevel } from '../access/isAdmin'
import { initializeWorksArray } from '../hooks/addWorkToMedia'
import { validateFileExtension } from '../hooks/validateFileExtension'
import {
  filterMediaWorkOptions,
  getMediaOrgDefaultValue,
  getMediaWorkDefaultValue,
} from '../utils/defaultValues'

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
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'id', 'createdAt', 'updatedAt', 'mimeType', 'works'],
    hideAPIURL: true,
  },
  access: {
    read: readMediaAccessControl,
    create: createMediaAccessControl,
    update: updateMediaAccessControl,
    delete: deleteMediaAccessControl,
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
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Escritório',
      hasMany: false,
      defaultValue: getMediaOrgDefaultValue,
      access: {
        create: isAdminOrSuperAdminFieldLevel,
        update: isAdminOrSuperAdminFieldLevel,
      },
    },
    {
      name: 'works',
      type: 'relationship',
      relationTo: 'works',
      label: 'Trabalhos',
      hasMany: true,
      defaultValue: getMediaWorkDefaultValue,
      filterOptions: filterMediaWorkOptions,
      admin: {
        allowCreate: false,
      },
      access: {
        create: isAdminOrSuperAdminFieldLevel,
        update: isAdminOrSuperAdminFieldLevel,
      },
    },
  ],
  hooks: {
    beforeChange: [initializeWorksArray],
    beforeValidate: [validateFileExtension],
  },
}
