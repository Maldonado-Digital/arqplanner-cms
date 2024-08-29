import type { Access, FieldAccess } from 'payload/types'
import type { User } from '../payload-types'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isAdminOrSuperAdmin: Access<any, User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an 'admin' or 'super_admin 'role
  return Boolean(user?.role === 'admin' || user?.role === 'super_admin')
}

export const isAdminOrSuperAdminFieldLevel: FieldAccess<
  { id: string },
  unknown,
  User
> = ({ req: { user } }) => {
  // Return true or false based on if the user has an 'admin' or 'super_admin 'role
  return Boolean(user?.role === 'admin' || user?.role === 'super_admin')
}

export const isSuperAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req: { user },
}) => {
  return Boolean(user?.role === 'super_admin')
}
