import type { Access } from 'payload/config'

export const readOrganizationsAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Organizations
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to read all Organizations
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to read only their own Organization
  if (user.role === 'editor' && user.organization) {
    return {
      id: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Allow users without role (i.e. 'customers') to read only their own Organization
  if (!user.role && user.organization) {
    return {
      id: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Reject everyone else
  return false
}
