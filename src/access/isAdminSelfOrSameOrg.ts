import type { Access } from 'payload/config'

export const isAdminSelfOrSameOrg: Access = ({ req: { user } }) => {
  console.log(user)
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.role === 'admin') return true

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (user.role === 'editor' && user.organization) {
      return {
        organization: {
          equals: user.organization,
        },
      }
    }

    // If user is a customer
    if (!user.role && user.organization) {
      return {
        organization: {
          equals: user.organization?.id ? user.organization?.id : user.organization,
        },
      }
    }
  }

  // Reject everyone else
  return false
}
