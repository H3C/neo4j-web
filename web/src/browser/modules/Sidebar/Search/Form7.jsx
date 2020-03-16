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
import { CYPHER_REQUEST } from 'shared/modules/cypher/cypherDuck'
import { NEO4J_BROWSER_USER_ACTION_QUERY } from 'services/bolt/txMetadata'
import bolt from 'services/bolt/bolt'

export class Form7 extends Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
    this.state = {
      nodes: [],
      param0: props.params[0],
      param1: props.params[1],
      newParam0: '',
      newParam1: ''
    }
  }

  handleClick() {
    const configFile = this.fileInput.current.files[0]
    const reader = new FileReader()
    reader.readAsText(configFile, "UTF-8")
    reader.onload = e => {
      const fileString = e.target.result

      let requestCmd = this.props.command
      const str1 = new RegExp('param1', 'g')
      const str2 = new RegExp('param2', 'g')
      requestCmd = requestCmd.replace(str1, this.state.newParam0)
      requestCmd = requestCmd.replace(str2, this.state.newParam1)
      this.props.bus &&
      this.props.bus.self(
        CYPHER_REQUEST,
        { query: requestCmd, queryType: NEO4J_BROWSER_USER_ACTION_QUERY },
        response => {
          if (!response.success) {
           console.log(new Error())
          } else {
            const { nodes } = bolt.extractNodesAndRelationshipsFromRecordsForOldVis(
              response.result.records,
              false
            )
            this.setState({
              nodes
            })

            const configNodes = []
            this.state.nodes.map(node => {
              const nodeConfig = node.properties.i_p_key_config
              if(nodeConfig && nodeConfig.length) {
                const ret = nodeConfig.every(item => {
                  const configItem = new RegExp(item, 'i')
                  return fileString.search(configItem) > -1
                })
                if (ret) {
                  configNodes.push(node.id)
                }
              } else {
                configNodes.push(node.id)
              }
            })
            this.props.onItemClick(`match (n:Defect) where id(n) in [${configNodes}] return n`)
          }
        }
      )
    }

  }

  render() {
    const formId = uuid()
    const paramOptions = this.state.param0.options.length ? this.state.param0.options : this.props.relTypes
    let hintContent1
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
          <StyledLabel>配置文件</StyledLabel>
          <StyledInput
            type='file'
            ref={this.fileInput}
            // disabled={isLoading}
          />
        </StyledFormElement>
        <StyledFormElement>
          <FormButton
            onClick={this.handleClick.bind(this)}
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
    onItemClick: (cmd) =>  {
      ownProps.bus.send(SET_CONTENT, setContent(cmd))
      const action = executeCommand(cmd)
      ownProps.bus.send(action.type, action)
      // @TODO bus.send
      // dispatch(executeCommand(cmd))
    }
  }
}

export default withBus(connect(mapStateToProps, mapDispatchToProps)(Form7))
