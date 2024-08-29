import type { CollectionConfig } from 'payload/types'
import { createOrganizationsAccessControl } from '../access/CreateOrganizations'
import { deleteOrganizationsAccessControl } from '../access/DeleteOrganizations'
import { readOrganizationsAccessControl } from '../access/ReadOrganizations'
import { updateOrganizationsAccessControl } from '../access/UpdateOrganizations'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  labels: {
    plural: {
      'pt-BR': 'Escritórios',
    },
    singular: {
      'pt-BR': 'Escritório',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt', 'createdAt'],
    hidden: ({ user }) => user?.role === 'editor',
    hideAPIURL: false,
  },
  access: {
    read: readOrganizationsAccessControl,
    create: createOrganizationsAccessControl,
    update: updateOrganizationsAccessControl,
    delete: deleteOrganizationsAccessControl,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      localized: true,
      required: true,
    },
  ],
}
