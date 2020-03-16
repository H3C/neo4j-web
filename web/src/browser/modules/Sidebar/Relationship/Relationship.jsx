/*
 * w18863 2020-02-10
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import neoGraphStyle from '../graphStyle'
import deepmerge from 'deepmerge'
import { RelationshipInspectorComponent } from './RelationshipIspector'
import { RelationshipLegendComponent } from './RelationshipLegend'
import { getSelected, getRelTypes, update } from 'shared/modules/explorer/explorerDuck'
import * as grassActions from 'shared/modules/grass/grassDuck'
import { Drawer, DrawerBody, DrawerHeader, DrawerSection, DrawerSectionBody, DrawerSubHeader } from 'browser-components/drawer'

class Relationship extends Component {
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
      graphStyle
    }
  }

  onSelectedRelType(relType, propertyKeys) {
    // console.log('[add selected relType]: ', relType)
    // console.log('[add selected propertyKeys]: ', propertyKeys)
    this.props.updateExplorer({
      selectedItem: {
        type: 'legend-item',
        item: {
          selectedLabel: null,
          selectedRelType: { relType: relType, propertyKeys: propertyKeys }
        }
      }
    })
  }

  render() {
    return (
      <Drawer id="db-relationship">
        <DrawerHeader>关系样式</DrawerHeader>
        <DrawerBody>
          <DrawerSection>
            <DrawerSectionBody key="relationship">
              <DrawerSubHeader>类别</DrawerSubHeader>
              <RelationshipLegendComponent
                relTypes={this.props.relTypes}
                graphStyle={this.state.graphStyle}
                onSelectedRelType={this.onSelectedRelType.bind(this)}
              />
              <DrawerSubHeader>线</DrawerSubHeader>
              <RelationshipInspectorComponent
                selectedItem={this.props.selectedItem}
                graphStyle={this.state.graphStyle}
              />
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
    relTypes: getRelTypes(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(Relationship)
