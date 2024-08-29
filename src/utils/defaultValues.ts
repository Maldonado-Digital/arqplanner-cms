import type { Media } from 'payload/generated-types'

// # -> MEDIA

export const getMediaWorkDefaultValue = () => {
  if (typeof window === 'undefined') return
  if (window.location.pathname.includes('/works/create')) return

  const parsedPath = window.location.pathname.split('/')
  const isFromWorkPage = parsedPath.includes('works')
  const work_id = parsedPath.pop()

  if (isFromWorkPage && work_id) return [work_id]
}

export const filterMediaWorkOptions = options => {
  const siblingData = options.siblingData as Media
  if (siblingData?.organization) {
    return {
      organization: { equals: siblingData.organization },
    }
  }

  return true
}

export const getMediaOrgDefaultValue = ({ user }) => {
  if (!user) return

  if (user.role === 'editor' && user.organization) {
    return user.organization
  }
}

// # -> CUSTOMERS
export const getCustomerOrgDefaultValue = ({ user }) => {
  if (!user) return

  if (user.role === 'editor' && user.organization) {
    return user.organization
  }
}
