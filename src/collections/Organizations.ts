import type { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'

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
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    // Only admins can create organizations
    create: isAdmin,
    // Admins can read all, but EDITORS can see their own organization
    // read: isAdmin,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      localized: true,
      required: true,
    },
  ],
}
