import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'
import { executeCommand } from 'shared/modules/commands/commandsDuck'
import { StyledForm, StyledFormElement, StyledFormElementWrapper, StyledLabel } from 'browser-components/Form'
import { FormButton } from 'browser-components/buttons'
import uuid from 'uuid'
import ParamsSelector from './ParamsSelector'
import { StyledInput, StyledHintSelector, StyledHint } from '../styled'

export class Form5 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      param0: props.params[0],
      param1: props.params[1],
      param2: props.params[2],
      newParam0: '',
      newParam1: '',
      newParam2: ''
    }
  }

  render() {
    const formId = uuid()
    const paramOptions = this.state.param0.options.length ? this.state.param0.options : this.props.relTypes
    let hintContent1
    let hintContent2
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
    if(this.state.param2.hint) {
      hintContent2 = (
        <StyledHint>
          <p>版本号示例：</p>
          {
            this.state.param2.hint.map((hint, index) => {
              return (
                <StyledHintSelector
                  key={index}
                  onClick={() => {
                    this.setState({
                      newParam2: hint
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
          <ParamsSelector
            params={paramOptions}
            value={this.state.newParam0}
            onChange={event => {
              this.setState({
                newParam0 : event.target.value
              })
            }}
          />
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
          <StyledLabel>{this.state.param2.name}</StyledLabel>
          <StyledInput
            value={this.state.newParam2}
            onChange={event => {
              this.setState({
                newParam2 : event.target.value
              })
            }}
            // disabled={isLoading}
          />
          {hintContent2}
        </StyledFormElement>
        <StyledFormElement>
          <FormButton
            onClick={() => this.props.onItemClick(this.props.command, this.state.newParam0, this.state.newParam1, this.state.newParam2)}
            label="搜索"
            // disabled={isLoading}
          />
        </StyledFormElement>
      </StyledForm>
    )
  }

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
    onItemClick: (cmd, newParam0, newParam1, newParam2) =>  {
      let exeCmd = cmd
      const str1 = new RegExp('param1', 'g')
      const str2 = new RegExp('param2', 'g')
      const str3 = new RegExp('param3', 'g')
      exeCmd = exeCmd.replace(str1, newParam0)
      exeCmd = exeCmd.replace(str2, newParam1)
      exeCmd = exeCmd.replace(str3, newParam2)
      ownProps.bus.send(SET_CONTENT, setContent(exeCmd))
      const action = executeCommand(exeCmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(exeCmd))
    }
  }
}

export default withBus(connect(mapStateToProps, mapDispatchToProps)(Form5))
