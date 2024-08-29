import type { CollectionBeforeValidateHook } from 'payload/types'

export const sanitizeFileName: CollectionBeforeValidateHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const ext = (data.filename as string).split('.').pop()
  const sanitizedFilename = sanitize(
    data.filename.substring(0, data.filename.lastIndexOf('.')) || data.filename,
  )
  data.filename = `${sanitizedFilename}.${ext}`
  return data // Return data to either create or update a document with
}

function sanitize(str: string) {
  return str.replace(/[^A-Z0-9-_]+/gi, '_')
}
