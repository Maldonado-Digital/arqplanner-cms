import { CollectionConfig } from 'payload/types'

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
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'application/acad'],
  },
  fields: [],
}
