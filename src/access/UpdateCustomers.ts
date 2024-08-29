import type { Access } from 'payload/config'

export const updateCustomersAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to update Customers
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to update Customers
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to update Customers inside their own organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Reject everyone else
  return false
}
