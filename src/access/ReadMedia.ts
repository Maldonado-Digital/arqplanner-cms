import type { Access } from 'payload/config'

export const readMediaAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Media
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to read all Media
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to read all Media from their organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Allow users without role (i.e. 'customers') to read Media
  // from the Work they are associated with
  if (!user.role && user.organization) {
    return {
      and: [
        {
          organization: {
            // If 'organization' is an object, extract ID. Otherwise it is the string ID.
            equals: user.organization?.id ? user.organization?.id : user.organization,
          },
        },
        {
          or: user.works.map(work => ({
            works: {
              contains: work,
            },
          })),
        },
      ],
    }
  }

  // Reject everyone else
  return false
}
