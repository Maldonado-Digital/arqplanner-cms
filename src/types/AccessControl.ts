import type { Option } from 'payload/types'

const AccessControl = {
  AllAdmins: 'all-admins',
  SelfAdmin: 'self-admin',
  AllEditors: 'all-editors',
  SelfEditor: 'self-editor',
  EditorsFromSameOrg: 'editors-from-same-org',
  AllCustomers: 'all-customers',
  SelfCustomer: 'self-customer',
  CustomersFromSameOrg: 'customers-from-same-org',
  CustomersFromSameWork: 'customers-from-same-work',
} as const

type AccessControlKeysType = keyof typeof AccessControl
export type AccessControlType = (typeof AccessControl)[AccessControlKeysType]

export const ACCESS_CONTROL_OPTIONS: Option[] = [
  {
    label: 'Super Admin',
    value: 'super_admin',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Arquiteto',
    value: 'editor',
  },
] as const

export const defaultRole = {
  label: 'Arquiteto',
  value: 'editor',
}
