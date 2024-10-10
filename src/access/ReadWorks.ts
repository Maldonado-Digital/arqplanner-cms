import type { Access } from 'payload/config'

export const readWorksAccessControl: Access = ({ req: { user } }) => {
  // User needs to be logged in
  if (!user) return false

  // Scenario #0 - Allow all users with a role of 'super_admin' to read all Media
  if (user.role === 'super_admin') return true

  // Scenario #1 - Allow all users with a role of 'admin' to read all Works
  if (user.role === 'admin') return true

  // Scenario #2 - Allow users with a role of 'editor' to read all Works from their organization
  if (user.role === 'editor' && user.organization) {
    return {
      organization: {
        equals: user.organization?.id ? user.organization?.id : user.organization,
      },
    }
  }

  // Scenario #3 - Allow users without role (i.e. 'customers') to read works
  // from the same organization only if they are associated with it
  if (!user.role && user.organization) {
    const workId = typeof user.works?.id === 'string' ? user.works.id : user.works
    return {
      and: [
        {
          organization: {
            // If 'organization' is an object, extract ID. Otherwise it is the string ID.
            equals: user.organization?.id ? user.organization?.id : user.organization,
          },
        },
        {
          id: {
            equals: workId,
          },
        },
      ],
    }
  }

  // Reject everyone else
  return false
}
