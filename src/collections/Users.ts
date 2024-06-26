import type { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
    maxLoginAttempts: 5,
  },
  labels: {
    plural: {
      'pt-BR': 'Acessos',
    },
    singular: {
      'pt-BR': 'Acesso',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'organization'],
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
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
    },
    {
      name: 'role',
      type: 'select',
      label: 'Nível de acesso',
      saveToJWT: true,
      hasMany: false,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
    {
      name: 'organization',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Escritório',
      hasMany: false,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ role }) => role === 'editor',
      },
    },
  ],
}
