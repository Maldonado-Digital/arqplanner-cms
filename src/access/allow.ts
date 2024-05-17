import type { Access } from 'payload/config'
import { AccessTypes } from '../types/AccessTypes'

export const allow =
  (allowedRoles: AccessTypes[] = [AccessTypes.Admin]): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (!user) return false

    console.log(user)

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
