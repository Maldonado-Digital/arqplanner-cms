import { SelectInput, useField } from 'payload/components/forms'
import { useAuth } from 'payload/components/utilities'
import type { OptionObject } from 'payload/types'
// biome-ignore lint/style/useImportType: <explanation>
import * as React from 'react'
import { ACCESS_CONTROL_OPTIONS, defaultRole } from '../../types/AccessControl'

type RoleSelectProps = {
  path: string
}

export const RoleSelectComponent: React.FC<RoleSelectProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const { user } = useAuth()

  const readOnly = !!user && user.role !== 'super_admin'

  const adjustedOptions = (ACCESS_CONTROL_OPTIONS as OptionObject[]).filter(option => {
    const { value } = option

    // Scenario #0 - First user can see all
    if (!user) return true

    // Scenario #1 - SuperAdmin users can see all roles
    if (user.role === 'super_admin') return true

    // Scenario #2 - Admin users can see admin and editor
    if (user.role === 'admin') {
      return value === 'admin' || value === 'editor'
    }

    // Scenario #3 - Editor users can only see editor
    return value === 'editor'
  })

  return (
    <div>
      <label className="field-label">Nível de Acesso</label>
      <SelectInput
        path={path}
        name={path}
        options={adjustedOptions}
        value={value}
        onChange={e => setValue(e.value)}
        readOnly={readOnly}
        defaultValue={defaultRole}
      />
    </div>
  )
}
