import type { Access } from 'payload/config'

export const createMediaAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to create Users
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to create Users
  if (user.role === 'admin') return true

  // // // Scenario #2 - Allow users with a role of 'editor' to create Media in their organization
  if (user.role === 'editor' && user.organization) {
    return true
  }

  // Reject everyone else
  return false
}
