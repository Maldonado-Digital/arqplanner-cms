import type { Access } from 'payload/config'

export const readUsersAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Users
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to read Users with
  // the roles of 'admin' and 'editor'
  if (user.role === 'admin') {
    return {
      or: [
        {
          role: {
            equals: 'admin',
          },
        },
        {
          role: {
            equals: 'editor',
          },
        },
      ],
    }
  }

  // Scenario #2 - Allow users with a role of 'editor' to read users from the same organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        // If 'organization' is an object, extract ID. Otherwise it is the string ID.
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Block users without role (i.e. 'customers') from reading Users
  if (!user.role) return false

  // Reject everyone else
  return false
}
