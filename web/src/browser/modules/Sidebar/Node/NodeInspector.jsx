/*
 * w18863 2020-02-10
 */

import React, { Component } from 'react'
import { deepEquals, optionalToString } from 'services/utils'
import {
  StyledLabelToken,
  StyledStatusBar,
  StyledStatus,
  StyledInspectorFooter,
  StyledInspectorFooterRow,
  StyledInspectorFooterRowListPair,
  StyledInspectorFooterRowListKey,
  StyledInspectorFooterRowListValue
} from '../styled'
import { NodeGrassEditor } from './NodeGrassEditor'
import ClickableUrls from '../../../components/clickable-urls'

const mapItemProperties = itemProperties => {
  return itemProperties
    .sort(({ key: keyA }, { key: keyB }) =>
      keyA < keyB ? -1 : keyA === keyB ? 0 : 1
    )
    .map((prop, i) => (
      <StyledInspectorFooterRowListPair className="pair" key={'prop' + i}>
        <StyledInspectorFooterRowListKey className="key">
          {prop.key + ': '}
        </StyledInspectorFooterRowListKey>
        <StyledInspectorFooterRowListValue className="value">
          <ClickableUrls text={optionalToString(prop.value)} />
        </StyledInspectorFooterRowListValue>
      </StyledInspectorFooterRowListPair>
    ))
}

const mapLabels = (graphStyle, itemLabels) => {
  return itemLabels.map((label, i) => {
    const graphStyleForLabel = graphStyle.forNode({ labels: [label] })
    const style = {
      backgroundColor: graphStyleForLabel.get('color'),
      color: graphStyleForLabel.get('text-color-internal')
    }
    return (
      <StyledLabelToken key={'label' + i} style={style} className={'token' + ' ' + 'token-label'} >
        {label}
      </StyledLabelToken>
    )
  })
}

export class NodeInspectorComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphStyle: props.graphStyle
    }
  }

  render() {
    let item
    let type
    let inspectorContent

    if (this.props.selectedItem) {
      item = this.props.selectedItem.item
      type = this.props.selectedItem.type
    }
    if (item && type && type === 'node') {
      inspectorContent = (
        <StyledInspectorFooterRow>
          <StyledInspectorFooterRowListPair key="pair" className="pair">
            <StyledInspectorFooterRowListKey className="key">
              {'<id>:'}
            </StyledInspectorFooterRowListKey>
            <StyledInspectorFooterRowListValue className="value">
              {item.id}
            </StyledInspectorFooterRowListValue>
          </StyledInspectorFooterRowListPair>
          {mapLabels(this.state.graphStyle, item.labels)}
          {mapItemProperties(item.properties)}
        </StyledInspectorFooterRow>
      )
    }

    return (
      <StyledStatusBar
        className="status-bar">
        <StyledStatus className="status">
          <StyledInspectorFooter
            className="inspector-footer" >
            <StyledInspectorFooterRow data-testid="vizInspector" className="inspector-footer-row" >
              <NodeGrassEditor selectedLabel={item.selectedLabel || {label: "*", propertyKeys:[]}} />
              {inspectorContent}
            </StyledInspectorFooterRow>
          </StyledInspectorFooter>
        </StyledStatus>
      </StyledStatusBar>
    )
  }
}
