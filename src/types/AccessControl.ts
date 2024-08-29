import type { Option } from 'payload/types'

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
