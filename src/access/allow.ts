import type { Access } from 'payload/config'
import type { AccessControlType } from '../types/AccessControl'

export const allow =
  (allowedRoles: AccessControlType[]): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (!user) return false

    // AllAdmins
    if (allowedRoles.includes('all-admins')) {
      return user.role === 'admin'
    }

    // Always allow admin
    if (user.role === 'admin') return true

    // allowedRoles.forEach(allowedRole => {

    // })

    if (user.role === 'editor' && user.organization) {
      // Otherwise, we can restrict it based on the `site` field
      return {
        organization: {
          equals: user.organization,
        },
      }
    }

    if (!user.role && user.organization) {
      // Otherwise, we can restrict it based on the `site` field
      return {
        organization: {
          equals: user.organization?.id ? user.organization?.id : user.organization,
        },
      }
    }

    // Reject everyone else
    return false
  }
