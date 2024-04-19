import type { CollectionConfig } from 'payload/types'
import { isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditor, isAdminOrEditorFieldLevel } from '../access/isAdminOrEditor'
import { isAdminSelfOrSameOrg } from '../access/isAdminSelfOrSameOrg'
export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    depth: 0,
    maxLoginAttempts: 5,
  },
  labels: {
    plural: {
      'pt-BR': 'Clientes',
    },
    singular: {
      'pt-BR': 'Cliente',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'organization', 'works'],
    // hideAPIURL: true,
  },
  access: {
    // Only admins can create users
    create: isAdminOrEditor,
    // // Admins can read all, but any other logged in user can only read themselves
    // read: isAdminSelfOrSameOrg,
    // // Admins can update all, but any other logged in user can only update themselves
    // update: isAdminSelfOrSameOrg,
    // // Only admins can delete
    // delete: isAdminSelfOrSameOrg,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      required: true,
      type: 'text',
      label: 'Nome',
      localized: true,
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Telefone',
      localized: true,
    },
    {
      name: 'social_media',
      type: 'text',
      label: 'Instagram',
      localized: true,
    },
    {
      name: 'works',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'works',
      label: 'Trabalhos',
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
      },
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
      saveToJWT: true,
      label: 'Escritório',
      hasMany: false,
      defaultValue: ({ user }) => {
        if (user.role === 'editor' && user.organization) {
          return user.organization
        }
      },
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
}
