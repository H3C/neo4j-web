

import React, { Component } from 'react'
import { connect } from 'react-redux'
import deepmerge from 'deepmerge'
import { deepEquals } from 'services/utils'
import { GraphComponent } from './Graph'
import neoGraphStyle from '../graphStyle'
import {
  StyledFullSizeContainer,
  StyledStatus,
  StyledStatusBar,
  StyledInlineList,
  StyledVizFooter,
  StyledVizFooterRow,
  StyledVizFooterRowListPair,
  StyledVizFooterRowListValue
} from './styled'
import * as actions from 'shared/modules/explorer/explorerDuck'
import numberToUSLocale from 'shared/utils/number-to-US-locale'

// 删除重复nodes
const deduplicateNodes = nodes => {
  // nodes data
  // console.log('[add]nodes:', nodes)
  return nodes.reduce(
    (all, curr) => {
      if (all.taken.indexOf(curr.id) > -1) {
        return all
      } else {
        all.nodes.push(curr)
        all.taken.push(curr.id)
        return all
      }
    },
    { nodes: [], taken: [] }
  ).nodes
}

class Explorer extends Component {
  constructor(props) {
    super(props)
    const graphStyle = neoGraphStyle()
    this.defaultStyle = graphStyle.toSheet()
    let relationships = this.props.relationships
    let nodes = deduplicateNodes(this.props.nodes)
    // data
    // console.log('[add]relationships:', relationships)
    // let selectedItem = ''
    if (nodes.length > parseInt(this.props.initialNodeDisplay)) {
      nodes = nodes.slice(0, this.props.initialNodeDisplay)
      relationships = this.props.relationships.filter(item => {
        return nodes.filter(node => node.id === item.startNodeId) > 0
      })
      // selectedItem = {
      //   type: 'status-item',
      //   item: `Not all return nodes are being displayed due to Initial Node Display setting. Only ${this.props.initialNodeDisplay} of ${nodes.length} nodes are being displayed`
      // }
    }
    if (this.props.graphStyleData) {
      const rebasedStyle = deepmerge(
        this.defaultStyle,
        this.props.graphStyleData
      )
      graphStyle.loadRules(rebasedStyle)
    }
    this.state = {
      graphStyle,
      styleVersion: 0,
      nodes,
      relationships
    }
  }

  getNodeNeighbours(node, currentNeighbours, callback) {
    if (currentNeighbours.length > this.props.maxNeighbours) {
      callback(null, { nodes: [], relationships: [] })
    }
    this.props.getNeighbours(node.id, currentNeighbours).then(
      result => {
        const nodes = result.nodes
        if (
          result.count >
          this.props.maxNeighbours - currentNeighbours.length
        ) {
          this.props.updateExplorer({
            selectedItem: {
              type: 'status-item',
              item: `Rendering was limited to ${
                this.props.maxNeighbours
                } of the node's total ${result.count +
              currentNeighbours.length} neighbours due to browser config maxNeighbours.`
            }
          })
        }
        callback(null, { nodes: nodes, relationships: result.relationships })
      },
      () => {
        callback(null, { nodes: [], relationships: [] })
      }
    )
  }

  onItemSelect(item) {
    // console.log('[selected]: ', item)
    if (item.type === 'node' || item.type === 'relationship') {
      this.props.updateExplorer({ selectedItem: item })
    }
  }

  onGraphModelChange(stats) {
    // @TODO w18863 2020-2-20
    // console.log('onGraphModelChange: ', stats)
    this.props.updateExplorer({ ...stats })
    this.props.updateStyle(this.state.graphStyle.toSheet())
  }

  componentDidUpdate(prevProps) {
    if (!deepEquals(prevProps.graphStyleData, this.props.graphStyleData)) {
      if (this.props.graphStyleData) {
        const rebasedStyle = deepmerge(
          this.defaultStyle,
          this.props.graphStyleData
        )
        this.state.graphStyle.loadRules(rebasedStyle)
        this.setState({
          graphStyle: this.state.graphStyle,
          styleVersion: this.state.styleVersion + 1
        })
      } else {
        this.state.graphStyle.resetToDefault()
        this.setState(
          { graphStyle: this.state.graphStyle},
          () => {
            this.props.updateStyle(this.state.graphStyle.toSheet())
          }
        )
      }
    }
  }

  render() {
    const description = `图中显示的节点： ${numberToUSLocale(
      this.state.nodes.length
    )} ，关系： ${numberToUSLocale(this.state.relationships.length)} `
    let inspectorContent = (
      <StyledInlineList className="list-inline">
        <StyledVizFooterRowListPair className="pair" key="pair">
          <StyledVizFooterRowListValue className="value">
            {description}
          </StyledVizFooterRowListValue>
        </StyledVizFooterRowListPair>
      </StyledInlineList>
    )
    return (
      <StyledFullSizeContainer id="svg-vis" >
        <GraphComponent
          fullscreen={this.props.fullscreen}
          frameHeight={this.props.frameHeight}
          relationships={this.state.relationships}
          nodes={this.state.nodes}
          getNodeNeighbours={this.getNodeNeighbours.bind(this)}
          onItemSelect={this.onItemSelect.bind(this)}
          graphStyle={this.state.graphStyle}
          styleVersion={this.state.styleVersion} // cheap way for child to check style updates
          onGraphModelChange={this.onGraphModelChange.bind(this)}
          assignVisElement={this.props.assignVisElement}
          getAutoCompleteCallback={this.props.getAutoCompleteCallback}
          setGraph={this.props.setGraph}
        />
        <StyledStatusBar fullscreen={this.props.fullscreen} className="status-bar" >
          <StyledStatus className="status">
            <StyledVizFooter className={ 'viz-footer'}>
              <StyledVizFooterRow data-testid="vizFooter" >
                {inspectorContent}
              </StyledVizFooterRow>
            </StyledVizFooter>
          </StyledStatus>
        </StyledStatusBar>
      </StyledFullSizeContainer>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateExplorer: data => {
      dispatch(actions.update(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(Explorer)
