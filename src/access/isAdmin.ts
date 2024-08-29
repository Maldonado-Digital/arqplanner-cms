import type { Access, FieldAccess } from 'payload/types'
import type { User } from '../payload-types'

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

export const isSuperAdminOrAdminOrEditorFieldLevel: FieldAccess<
  { id: string },
  unknown,
  User
> = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to create Customers
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to create Customers
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to create Customers inside their own organization
  if (user.role === 'editor' && user.organization) return true

  // Reject everyone else
  return false
}
