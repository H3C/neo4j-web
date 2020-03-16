/*
 * w18863 2020-02-10
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import neoGraphStyle from '../graphStyle'
import deepmerge from 'deepmerge'
import { NodeInspectorComponent } from './NodeInspector'
import { NodeLegendComponent } from './NodeLegend'
import { getSelected, getLabels, update } from 'shared/modules/explorer/explorerDuck'
import * as grassActions from 'shared/modules/grass/grassDuck'
import { Drawer, DrawerBody, DrawerHeader, DrawerSection, DrawerSectionBody, DrawerSubHeader } from 'browser-components/drawer'

class Node extends Component {
  constructor(props) {
    super(props)
    const graphStyle = neoGraphStyle()
    this.defaultStyle = graphStyle.toSheet()
    if (this.props.graphStyleData) {
      const rebasedStyle = deepmerge(
        this.defaultStyle,
        this.props.graphStyleData
      )
      graphStyle.loadRules(rebasedStyle)
    }
    this.state = {
      graphStyle,
    }
  }

  onSelectedLabel(label, propertyKeys) {
    // console.log('[add selected label]: ', label)
    // console.log('[add selected propertyKeys]: ', propertyKeys)
    this.props.updateExplorer({
      selectedItem: {
        type: 'legend-item',
        item: {
          selectedLabel: { label: label, propertyKeys: propertyKeys },
          selectedRelType: null
        }
      }
    })
  }

  render() {
    return (
      <Drawer id="db-node">
        <DrawerHeader>节点样式</DrawerHeader>
        <DrawerBody>
          <DrawerSection>
            <DrawerSectionBody key="node">
              <DrawerSubHeader>类别</DrawerSubHeader>
              <NodeLegendComponent labels={this.props.labels} graphStyle={this.state.graphStyle} onSelectedLabel={this.onSelectedLabel.bind(this)} />
              <DrawerSubHeader>点</DrawerSubHeader>
              <NodeInspectorComponent selectedItem={this.props.selectedItem} graphStyle={this.state.graphStyle} />
            </DrawerSectionBody>
          </DrawerSection>
        </DrawerBody>
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedItem: getSelected(state),
    labels: getLabels(state),
    graphStyleData: grassActions.getGraphStyleData(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateExplorer: data => {
      dispatch(update(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Node)
