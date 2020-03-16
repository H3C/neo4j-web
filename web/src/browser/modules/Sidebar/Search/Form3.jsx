import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'
import { executeCommand } from 'shared/modules/commands/commandsDuck'
import { StyledForm, StyledFormElement, StyledFormElementWrapper, StyledLabel } from 'browser-components/Form'
import { FormButton } from 'browser-components/buttons'
import uuid from 'uuid'
import { StyledInput, StyledHintSelector, StyledHint } from '../styled'

export class Form3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      param0: props.params[0],
      param1: props.params[1],
      newParam0: '',
      newParam1: ''
    }
  }

  render() {
    const formId = uuid()
    let hintContent0
    let hintContent1
    if(this.state.param0.hint) {
      hintContent0 = (
        <StyledHint>
          <p>版本号示例：</p>
          {
            this.state.param0.hint.map((hint, index) => {
              return (
                <StyledHintSelector
                  key={index}
                  onClick={() => {
                    this.setState({
                      newParam0: hint
                    })
                  }}>
                  {hint}
                </StyledHintSelector>
              )
            })
          }
        </StyledHint>
      )
    }
    if(this.state.param1.hint) {
      hintContent1 = (
        <StyledHint>
          <p>版本号示例：</p>
          {
            this.state.param1.hint.map((hint, index) => {
              return (
                <StyledHintSelector
                  key={index}
                  onClick={() => {
                    this.setState({
                      newParam1: hint
                    })
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
      <StyledForm id={`search-params-${formId}`} isOpen={this.props.isOpen}>
        <StyledFormElement>
          <StyledLabel>{this.state.param0.name}</StyledLabel>
          <StyledInput
            value={this.state.newParam0}
            onChange={event => {
              this.setState({
                newParam0 : event.target.value
              })
            }}
            // disabled={isLoading}
          />
          {hintContent0}
        </StyledFormElement>
        <StyledFormElement>
          <StyledLabel>{this.state.param1.name}</StyledLabel>
          <StyledInput
            value={this.state.newParam1}
            onChange={event => {
              this.setState({
                newParam1 : event.target.value
              })
            }}
            // disabled={isLoading}
          />
          {hintContent1}
        </StyledFormElement>
        <StyledFormElement>
          <FormButton
            onClick={() => this.props.onItemClick(this.props.command, this.state.newParam0, this.state.newParam1)}
            label="搜索"
            // disabled={isLoading}
          />
        </StyledFormElement>
      </StyledForm>
    )
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onItemClick: (cmd, newParam0, newParam1) =>  {
      let exeCmd = cmd
      const str1 = new RegExp('param1', 'g')
      const str2 = new RegExp('param2', 'g')
      exeCmd = exeCmd.replace(str1, newParam0)
      exeCmd = exeCmd.replace(str2, newParam1)

      ownProps.bus.send(SET_CONTENT, setContent(exeCmd))
      const action = executeCommand(exeCmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(exeCmd))
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(Form3))
