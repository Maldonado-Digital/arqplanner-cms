import type { CollectionConfig } from 'payload/types'
import { createUsersAccessControl } from '../access/CreateUsers'
import { deleteUsersAccessControl } from '../access/DeleteUsers'
import { readUsersAccessControl } from '../access/ReadUsers'
import { updateUsersAccessControl } from '../access/UpdateUsers'
import { isAdminOrSuperAdminFieldLevel, isSuperAdminFieldLevel } from '../access/isAdmin'
import { ACCESS_CONTROL_OPTIONS, defaultRole } from '../types/AccessControl'

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
    hidden: ({ user }) => user?.role === 'editor',
    hideAPIURL: false,
  },
  access: {
    read: readUsersAccessControl,
    create: createUsersAccessControl,
    update: updateUsersAccessControl,
    delete: deleteUsersAccessControl,
  },
  fields: [
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
      defaultValue: defaultRole.value,
      access: {
        create: isSuperAdminFieldLevel,
        update: isSuperAdminFieldLevel,
      },
      options: ACCESS_CONTROL_OPTIONS,
    },
    {
      name: 'organization',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'organizations',
      label: 'Escritório',
      hasMany: false,
      access: {
        create: isAdminOrSuperAdminFieldLevel,
        update: isAdminOrSuperAdminFieldLevel,
      },
      admin: {
        condition: ({ role }) => role === 'editor',
      },
    },
  ],
}
