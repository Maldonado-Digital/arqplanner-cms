import type { Access } from 'payload/config'

export const updateOrganizationsAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to update Organizations
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to update Organizations
  if (user.role === 'admin') return true

  // Reject everyone else
  return false
}
