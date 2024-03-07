import { Access } from 'payload/config'
import { User } from '../payload-types'

export const isAdminOrIsEditorFromSameOrg: Access = ({ req }) => {
  const user = req.user as User
  console.log(user)

  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.role === 'admin') return true

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site
    if (user.role === 'editor' && !!user.organization) {
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

// export const isAdminOrIsEditorFromSameOrgFieldLevel: FieldAccess<
//   { id: string },
//   unknown,
//   User
// > = ({ req: { user }, data, siblingData }) => {
//   console.log(user)

//   // Need to be logged in
//   if (user) {
//     // If user has role of 'admin'
//     if (user.role === 'admin') return true

//     // If user has role of 'editor' and has access to a site,
//     // return a query constraint to restrict the documents this user can edit
//     // to only those that are assigned to a site
//     if (user.role === 'editor' && !!user.organization) {
//       return {
//         organization: {
//           equals: user.organization,
//         },
//       }
//     }
//   }

//   // Reject everyone else
//   return false
// }
