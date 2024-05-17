import type { Access } from 'payload/config'

export const isAdminOrEditorFromSameOrg: Access = ({ req: { user } }) => {
  console.log(user)

  if (user) {
    if (user.role === 'admin') return true

    if (user.role === 'editor' && user.organization) {
      return {
        organization: {
          equals: user.organization,
        },
      }
    }
  }

  // Reject everyone else
  return false
}
