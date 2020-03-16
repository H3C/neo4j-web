import React from 'react'
import { StyledSelect } from '../styled'

const ParamsSelector = ({ params = [], onChange = null, id }) => {
  let options = [
    <option key="-1" value={0}>
      {' '}
    </option>
  ]
  if (params.length > 0) {
    options = options.concat(
      params.map((param, i) => {
        return (
          <option key={i} value={param}>
            {param}
          </option>
        )
      })
    )

    const args = { ...(id && { id, name: id }) }

    return (
      <StyledSelect
        className="params-selector"
        placeholder="Select param"
        // value={selectedValue}
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
export default ParamsSelector
