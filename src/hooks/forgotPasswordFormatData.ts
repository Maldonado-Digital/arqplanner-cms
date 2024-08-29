import type { CollectionBeforeChangeHook } from 'payload/types'

export const forgotPasswordFormatData: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  console.log('data', data)
  console.log('originalDoc', originalDoc)

  if (operation !== 'update' || req.path !== '/forgot-password') {
    return data
  }

  const formatted = {}
  for (const field in data) {
    if (typeof data[field] === 'object' && data[field]['pt-BR']) {
      formatted[field] = data[field]['pt-BR']
      continue
    }

    formatted[field] = data[field]
  }

  return formatted // Return data to either create or update a document with
}
