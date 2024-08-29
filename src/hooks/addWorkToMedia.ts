import payload from 'payload'
import { APIError } from 'payload/errors'
import type { Media } from 'payload/generated-types'
import type { CollectionBeforeChangeHook, FieldHook } from 'payload/types'

export const initializeWorksArray: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation,
}) => {
  if (operation !== 'create') return data
  if (!req.headers.referer.includes('/media/create')) return data

  if (typeof data.works === 'undefined') {
    data.works = []
  }

  return data
}

export const addWorkToMediaFieldHook: FieldHook = async ({
  collection,
  value,
  originalDoc,
}) => {
  if (collection.slug === 'works' && value) {
    const file = (await payload.findByID({
      collection: 'media',
      id: value,
      depth: 0,
    })) as Partial<Media>

    if (!file) {
      throw new APIError('Erro ao encontrar o arquivo nas mídias.', 400, undefined, true)
    }

    if (typeof file.works === 'undefined') {
      await payload.update({
        collection: 'media',
        id: value,
        data: { works: [originalDoc.id] },
      })
    }

    if (Array.isArray(file.works) && !file.works.includes(originalDoc.id)) {
      await payload.update({
        collection: 'media',
        id: value,
        data: { works: [...file.works, originalDoc.id] },
      })
    }
  }
}
