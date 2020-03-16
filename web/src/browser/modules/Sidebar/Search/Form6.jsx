import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { SET_CONTENT, setContent } from 'shared/modules/editor/editorDuck'
import { executeCommand } from 'shared/modules/commands/commandsDuck'
import { StyledForm, StyledFormElement, StyledFormElementWrapper, StyledLabel } from 'browser-components/Form'
import { FormButton } from 'browser-components/buttons'
import uuid from 'uuid'

export class Form6 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const formId = uuid()

    return (
      <StyledForm id={`search-params-${formId}`} isOpen={this.props.isOpen}>
        <StyledFormElement>
          <FormButton
            onClick={() => this.props.onItemClick(this.props.command)}
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
    onItemClick: cmd =>  {
      ownProps.bus.send(SET_CONTENT, setContent(cmd))
      const action = executeCommand(cmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(cmd))
    }
  }
}

export default withBus(connect(null, mapDispatchToProps)(Form6))
