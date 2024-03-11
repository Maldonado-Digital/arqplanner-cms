import { Access, FieldAccess } from 'payload/types'
import { User } from '../payload-types'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isAdminOrEditor: Access<any, User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.role === 'admin' || user?.role === 'editor')
}

export const isAdminOrEditorFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req: { user },
}) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.role === 'admin' || user?.role === 'editor')
}
