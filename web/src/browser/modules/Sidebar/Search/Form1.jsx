import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'
import { executeCommand } from 'shared/modules/commands/commandsDuck'
import { StyledForm, StyledFormElement, StyledFormElementWrapper, StyledLabel } from 'browser-components/Form'
import { FormButton } from 'browser-components/buttons'
import uuid from 'uuid'
import { StyledInput, StyledHintSelector, StyledHint } from '../styled'

export class Form1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      param0 : props.params[0],
      newParam0: ''
    }
  }

  render() {
    const formId = uuid()
    let hintContent
    if(this.state.param0.hint) {
      hintContent = (
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
          {hintContent}
        </StyledFormElement>
        <StyledFormElement>
          <FormButton
            onClick={() => this.props.onItemClick(this.props.command, this.state.newParam0)}
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
    onItemClick: (cmd, newParam0) =>  {
      let exeCmd = cmd
      const str1 = new RegExp('param1', 'g')
      exeCmd = exeCmd.replace(str1, newParam0)
      ownProps.bus.send(SET_CONTENT, setContent(exeCmd))
      const action = executeCommand(exeCmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(exeCmd))
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(Form1))
