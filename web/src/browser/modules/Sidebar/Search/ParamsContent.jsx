import React from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'
import { executeCommand } from 'shared/modules/commands/commandsDuck'
import { StyledForm, StyledFormElement, StyledFormElementWrapper, StyledLabel } from 'browser-components/Form'
import { FormButton } from 'browser-components/buttons'
import uuid from 'uuid'
import { StyledInput, StyledHintSelector, StyledHint } from '../styled'
import ParamsSelector from './ParamsSelector'

export const ParamsContent = ({ isOpen, params, command, relTypes, onItemClick = () => {} }) => {
  const formId = uuid()
  const mappedParams = params.map((param, index) => {
    const paramIndex = index
    const paramId = `${param.key}-${formId}`
    if(param.type === 'input') {
      let hintContent
      if(param.hint && param.hint.length) {
        hintContent = (
          <StyledHint>
            <p>版本号示例：</p>
            {
              param.hint.map((hint, index) => {
                return (
                  <StyledHintSelector
                    key={index}
                    onClick={() => {
                      const newParams = [...params]
                      params = newParams.map(item => item.key === param.key ? {...item, value: hint} : item)
                    }}>
                    {hint}
                  </StyledHintSelector>
                )
              })
            }
          </StyledHint>
        )
      }
      return (
        <StyledFormElement key={paramId}>
          <StyledLabel htmlFor={paramId}>{param.name}</StyledLabel>
          <StyledInput
            name={paramId}
            id={paramId}
            // defaultValue={params[paramIndex].value}
            onChange={event => {
              const newParams = [...params]
              params = newParams.map(item => item.key === param.key ? {...item, value: event.target.value} : item)
            }}
            // disabled={isLoading}
          />
          {hintContent}
        </StyledFormElement>
      )
    } else if (param.type === 'select') {
      const paramOptions = param.options.length ? param.options : relTypes
      return (
        <StyledFormElement key={paramId}>
          <StyledLabel htmlFor={paramId}>{param.name}</StyledLabel>
          <ParamsSelector
            name={paramId}
            id={paramId}
            params={paramOptions}
            // value={params[paramIndex].value}
            onChange={event => {
              const newParams = [...params]
              params = newParams.map(item => item.key === param.key ? {...item, value: event.target.value} : item)
            }}
          />
        </StyledFormElement>
      )
    }
  })

  return (
    <StyledForm id={`search-params-${formId}`} isOpen={isOpen}>
      {mappedParams}
      <StyledFormElement>
        <FormButton
          onClick={() => onItemClick(params, command)}
          label="搜索"
          // disabled={isLoading}
        />
      </StyledFormElement>
    </StyledForm>
  )

}

const mapStateToProps = state => {
  let relTypes = []
  state.meta.relationshipTypes.map(relType => {
    relTypes.push(relType.val)
  })
  return {
    relTypes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onItemClick: (params, cmd) =>  {
      let exeCmd = cmd
      params.map((param, index) => {
        const str = new RegExp('param' + (index + 1), 'g')
        exeCmd = exeCmd.replace(str, param.value)
      })
      ownProps.bus.send(SET_CONTENT, setContent(exeCmd))
      const action = executeCommand(exeCmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(exeCmd))
    }
  }
}

export default withBus(connect(mapStateToProps, mapDispatchToProps)(ParamsContent))
