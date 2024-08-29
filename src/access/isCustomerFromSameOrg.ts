import type { Access } from 'payload/config'

export const isCustomerFromSameOrg: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (!user.role && user.organization) {
      // Otherwise, we can restrict it based on the `site` field
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
