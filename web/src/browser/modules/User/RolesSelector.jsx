import React from 'react'
import { StyledSelect } from './styled'

const RolesSelector = ({
  roles = [],
  onChange = null,
  selectedValue = 0,
  id
}) => {
  let options = [
    <option key="-1" value={0}>
      {' '}
    </option>
  ]
  if (roles.length > 0) {
    options = options.concat(
      roles.map((role, i) => {
        return (
          <option key={i} value={role}>
            {role}
          </option>
        )
      })
    )

    const args = {
      ...(id && { id, name: id })
    }

    return (
      <StyledSelect
        className="roles-selector"
        placeholder="Select role"
        value={selectedValue}
        onChange={onChange}
        {...args}
      >
        {options}
      </StyledSelect>
    )
  } else {
    return null
  }
}
export default RolesSelector
