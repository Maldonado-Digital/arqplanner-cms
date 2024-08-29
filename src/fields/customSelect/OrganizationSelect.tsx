import payload from 'payload'
import { SelectInput, useField } from 'payload/components/forms'
import { useAuth } from 'payload/components/utilities'
import * as React from 'react'

type OrganizationSelectProps = {
  path: string
}

export const OrganizationSelect: React.FC<OrganizationSelectProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const { user } = useAuth()
  const [options, setOptions] = React.useState([])

  const readOnly = !!user && user.role !== 'super_admin'

  // const defaultValue = React.useMemo(async () => {
  //   if (!user) return
  //   const fullUser = await fetchFullUser()

  //   if (fullUser === 'editor' && user.organization) {
  //     return options.find(opt => opt.value === user)
  //   }
  // }, [options, user, user.])

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const organizations = await payload.find({
          collection: 'organizations',
          depth: 0,
          sort: 'name',
        })

        const formattedOptions = organizations.docs.map(org => {
          return {
            label: org.name,
            value: org.id,
          }
        })
        setOptions(formattedOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchOptions()
  }, [])

  return (
    <div>
      <label className="field-label">Nível de Acesso</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={e => setValue(e.value)}
        readOnly={readOnly}
        // defaultValue={defaultRole}
      />
    </div>
  )
}
