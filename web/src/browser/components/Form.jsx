import React, { Component } from 'react'
import styled from 'styled-components'

export const StyledSelect = styled.select`
  background-color: #fff;
  border: ${props => props.theme.formButtonBorder};
  border-radius: 4px;
  color: ${props => props.theme.inputText};
  display: block;
  height: 30px;
  font-size: 14px;
  padding: 4px 12px;
  min-width: 120px;
  width: 100%;
`
export const StyledInput = styled.input`
  background-color: #fff;
  border: ${props => props.theme.formButtonBorder};
  border-radius: 4px;
  color: ${props => props.theme.inputText};
  display: inline-block;
  height: 30px;
  font-size: 14px;
  padding: 4px 12px;
  width: 100%;

  &[type='checkbox'] {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    width: auto;
  }
  
   &[type='file'] {
    font-size: 12px;
  }
`

export const StyledForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: ${props => props.isOpen ? 'block' : 'none'}
`

export const StyledFormElement = styled.div`
  margin: 0 0 18px 0;
`

export const StyledFormElementWrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`

const StyledSettingTextInput = styled(StyledInput)`
  height: 34px;
  color: #555;
  font-size: 14px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 192px;
`

const StyledCheckbox = styled.input`
  margin-right: 10px;
`
const StyledRadio = styled.input`
  margin-right: 10px;
`
export const StyledLabel = styled.label`
  /* margin-left: 10px; */
  display: inline-block;
  font-weight: 600;
  vertical-align: middle;

  input[type='radio'] + & {
    font-weight: 400;
  }

  &:first-letter {
    text-transform: uppercase;
  }
`
const StyledRadioEntry = styled.div`
  margin: 10px 0;
`

export const TextInput = props => {
  const { children, ...rest } = props
  return <StyledSettingTextInput {...rest}>{children}</StyledSettingTextInput>
}

export const CheckboxSelector = props => {
  return props.checked ? (
    <StyledCheckbox type="checkbox" {...props} />
  ) : (
    <StyledCheckbox type="checkbox" {...props} />
  )
}

export class RadioSelector extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.state.selectedValue = this.props.selectedValue || null
  }

  isSelectedValue(option) {
    return option === this.state.selectedValue
  }

  render() {
    return (
      <form>
        {this.props.options.map(option => {
          return (
            <StyledRadioEntry key={option}>
              <StyledRadio
                type="radio"
                value={option}
                checked={this.isSelectedValue(option)}
                onChange={event => {
                  this.setState({ selectedValue: option })
                  this.props.onChange(event)
                }}
              />
              <StyledLabel>{option}</StyledLabel>
            </StyledRadioEntry>
          )
        })}
      </form>
    )
  }
}
