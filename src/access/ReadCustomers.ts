import type { Access } from 'payload/config'

export const readCustomersAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Customers
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to read all Customers
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to read all Customers from their organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Allow users without role (i.e. 'customers') with an
  // organization to read themselves
  if (!user.role && user.organization) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false
}
