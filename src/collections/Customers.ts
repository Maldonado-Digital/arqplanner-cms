import type { CollectionConfig } from 'payload/types'
import { createCustomersAccessControl } from '../access/CreateCustomers'
import { deleteCustomersAccessControl } from '../access/DeleteCustomers'
import { readCustomersAccessControl } from '../access/ReadCustomers'
import { updateCustomersAccessControl } from '../access/UpdateCustomers'
import { isAdminOrSuperAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrEditorFieldLevel } from '../access/isAdminOrEditor'
import { forgotPasswordFormatData } from '../hooks/forgotPasswordFormatData'
import { getCustomerOrgDefaultValue } from '../utils/defaultValues'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    depth: 0,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 24 * 30, // 30 days lifetime
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
    hideAPIURL: true,
  },
  access: {
    create: createCustomersAccessControl,
    read: readCustomersAccessControl,
    update: updateCustomersAccessControl,
    delete: deleteCustomersAccessControl,
  },
  hooks: {
    beforeValidate: [forgotPasswordFormatData],
  },
  fields: [
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
      required: true,
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
      defaultValue: getCustomerOrgDefaultValue,
      access: {
        create: isAdminOrSuperAdminFieldLevel,
        update: isAdminOrSuperAdminFieldLevel,
      },
    },
  ],
}
