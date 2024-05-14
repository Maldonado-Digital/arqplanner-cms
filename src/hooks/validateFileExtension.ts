import { APIError } from 'payload/errors'
import type { CollectionBeforeValidateHook } from 'payload/types'

const VALID_EXTENSIONS = ['dwg', 'doc', 'docx', 'xls', 'xlsx', 'pptx']

export const validateFileExtension: CollectionBeforeValidateHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const mimeType = data.mimeType as string
  if (mimeType.startsWith('image/')) return data
  if (mimeType === 'application/pdf') return data

  const ext = (data.filename as string).split('.').pop()

  if (!VALID_EXTENSIONS.includes(ext))
    throw new APIError('Formato de arquivo não suportado.', 400, undefined, true)

  return data // Return data to either create or update a document with
}
