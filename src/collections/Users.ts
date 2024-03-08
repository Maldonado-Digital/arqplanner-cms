import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrIsEditorFromSameOrg } from '../access/isAdminOrIsEditorFromSameOrg'
import { isAdminOrSelf } from '../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
  },
  labels: {
    plural: {
      'pt-BR': 'Usuários',
    },
    singular: {
      'pt-BR': 'Usuário',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'organization'],
  },
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrIsEditorFromSameOrg,
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
      label: 'Organização',
      hasMany: false,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ role }) => role && role !== 'admin',
        description: 'This field sets which sites that this user has access to.',
      },
    },
  ],
}
