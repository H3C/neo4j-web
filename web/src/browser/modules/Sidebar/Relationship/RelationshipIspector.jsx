/*
 * w18863 2020-02-10
 */

import React, { Component } from 'react'
import { deepEquals, optionalToString } from 'services/utils'
import {
  StyledStatusBar,
  StyledStatus,
  StyledInspectorFooter,
  StyledInspectorFooterRow,
  StyledInspectorFooterRowListPair,
  StyledInspectorFooterRowListKey,
  StyledInspectorFooterRowListValue,
  StyledTokenRelationshipType
} from '../styled'
import { RelationshipGrassEditor } from './RelationshipGrassEditor'
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

export class RelationshipInspectorComponent extends Component {
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
    if (item && type && type === 'relationship') {
      const style = {
        backgroundColor: this.state.graphStyle.forRelationship(item).get('color'),
        color: this.state.graphStyle.forRelationship(item).get('text-color-internal')
      }
      inspectorContent = (
        <StyledInspectorFooterRow className="list-inline">
          <StyledInspectorFooterRowListPair key="pair" className="pair">
            <StyledInspectorFooterRowListKey className="key">
              {'<id>:'}
            </StyledInspectorFooterRowListKey>
            <StyledInspectorFooterRowListValue className="value">
              {item.id}
            </StyledInspectorFooterRowListValue>
          </StyledInspectorFooterRowListPair>
          <StyledTokenRelationshipType key="token" style={style} className={'token' + ' ' + 'token-relationship-type'} >
            {item.type}
          </StyledTokenRelationshipType>
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
              <RelationshipGrassEditor selectedRelType={item.selectedRelType || {relType: "*", propertyKeys: []}} />
              {inspectorContent}
            </StyledInspectorFooterRow>
          </StyledInspectorFooter>
        </StyledStatus>
      </StyledStatusBar>
    )
  }
}
