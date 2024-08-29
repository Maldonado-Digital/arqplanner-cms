import type { Access } from 'payload/config'

export const updateMediaAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Media
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to update all Works
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to update all Works from their organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Allow users without role (i.e. 'customers') to only update works
  // through the API endpoints designed at '../endpoints'

  // Reject everyone else
  return false
}
