import type { Access } from 'payload/config'

export const updateUsersAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Users
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to only
  // update Users with a role of 'editor' or themselves
  if (user.role === 'admin') {
    return {
      or: [
        {
          role: {
            equals: 'editor',
          },
        },
        {
          id: {
            equals: user.id,
          },
        },
      ],
    }
  }

  // Scenario #2 - Allow users with a role of 'editor' to update themselves
  if (user.role === 'editor') {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Scenario #3 - Block users without role (i.e. 'customers') from updating Users
  if (!user.role) return false

  // Reject everyone else
  return false
}
