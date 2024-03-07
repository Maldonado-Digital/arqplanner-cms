import { CollectionConfig } from 'payload/types'
export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    depth: 0,
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
    defaultColumns: ['id', 'name', 'email', 'role', 'organization'],
  },
  access: {
    // Only admins can create users
    // create: isAdmin,
    // // Admins can read all, but any other logged in user can only read themselves
    // read: isAdminOrIsEditorFromSameOrg,
    // // Admins can update all, but any other logged in user can only update themselves
    // update: isAdminOrSelf,
    // // Only admins can delete
    // delete: isAdmin,
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
      name: 'organization',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Organização',
      hasMany: false,
      // defaultValue: {},
      access: {
        // Only admins can create or update a value for this field
        // create: isAdminFieldLevel,
        // update: isAdminFieldLevel,
      },
      admin: {
        // condition: ({ role }) => role && role !== 'admin',
        description: 'This field sets which sites that this user has access to.',
      },
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
        // create: isAdminFieldLevel,
        // update: isAdminFieldLevel,
      },
      admin: {
        // condition: ({ role }) => role && role !== 'admin',
        // description: 'This field sets which sites that this user has access to.',
      },
    },
  ],
}
