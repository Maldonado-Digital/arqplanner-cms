import type { Field } from 'payload/types'
import {
  isAdminOrSuperAdminFieldLevel,
  isSuperAdminFieldLevel,
} from '../../access/isAdmin'
import { OrganizationSelect } from './OrganizationSelect'
import { RoleSelectComponent } from './component'

export const RoleSelectField: Field = {
  name: 'role',
  label: 'Nível de Acesso',
  type: 'text',
  saveToJWT: true,
  access: {
    // Only super admin can create or update a value for this field
    create: isSuperAdminFieldLevel,
    update: isSuperAdminFieldLevel,
  },
  admin: {
    components: {
      Field: RoleSelectComponent,
    },
  },
}

export const OrganizationSelectField: Field = {
  name: 'organization',
  type: 'relationship',
  relationTo: 'organizations',
  label: 'Escritório',
  hasMany: false,
  access: {
    create: isAdminOrSuperAdminFieldLevel,
    update: isAdminOrSuperAdminFieldLevel,
  },
  admin: {
    components: {
      Field: OrganizationSelect,
    },
  },
  defaultValue: ({ user }) => {
    if (user.role === 'editor' && user.organization) {
      return user.organization
    }
  },
}
