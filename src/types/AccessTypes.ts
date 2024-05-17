enum AccessTypes {
  Admin = 'ADMIN',
  Editors = 'ALL_EDITORS',
  Customer = 'CUSTOMER',
}

type AccessTypesKey = keyof typeof AccessTypes
type AccessTypesValue = (typeof AccessTypes)[AccessTypesKey]

export { AccessTypes, type AccessTypesKey, type AccessTypesValue }

type AllowedRoles = {
  [k in AccessTypes]: () => boolean
}

// const allowedRoles: AllowedRoles = {
//   ADMIN:
// }
