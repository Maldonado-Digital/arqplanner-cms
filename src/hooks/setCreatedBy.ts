import type { CollectionBeforeChangeHook } from 'payload/types'

export const setCreatedBy: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (operation === 'create') {
    data.organization = req.user.organization
  }

  return data // Return data to either create or update a document wit
}
