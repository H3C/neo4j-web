/*
 * w18863 2020-02-10
 */

import React, { Component } from 'react'
import {
  StyledLegendRow,
  StyledTokenRelationshipType,
  StyledTokenCount,
  StyledLegendInlineListItem,
  StyledLegend,
  StyledLegendContents,
  StyledLegendInlineList
} from '../styled'
import numberToUSLocale from 'shared/utils/number-to-US-locale'

export class RelationshipLegendComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.typeRowContracted = true
  }

  render() {
    const mapRelTypes = legendItems => {
      if (!legendItems || !Object.keys(legendItems).length) {
        return null
      }
      const relTypeList = Object.keys(legendItems).map((legendItemKey, i) => {
        const styleForItem = this.props.graphStyle.forRelationship({
          type: legendItemKey
        })
        const onClick = () => {
          this.props.onSelectedRelType(
            legendItemKey,
            Object.keys(legendItems[legendItemKey].properties)
          )
        }
        const style = {
          backgroundColor: styleForItem.get('color'),
          color: styleForItem.get('text-color-internal')
        }
        return (
          <StyledLegendInlineListItem key={i} data-testid="viz-legend-reltypes">
            <StyledLegendContents className="contents">
              <StyledTokenRelationshipType onClick={onClick} style={style} className="token token-relationship-type" >
                {legendItemKey}
                <StyledTokenCount className="count">
                  {`(${numberToUSLocale(legendItems[legendItemKey].count)})`}
                </StyledTokenCount>
              </StyledTokenRelationshipType>
            </StyledLegendContents>
          </StyledLegendInlineListItem>
        )
      })
      return (
        <StyledLegendRow className={this.state.typeRowContracted ? 'contracted' : ''}>
          <StyledLegendInlineList className="list-inline">
            {relTypeList}
          </StyledLegendInlineList>
        </StyledLegendRow>
      )
    }
    const relTypes = mapRelTypes(this.props.relTypes)
    return (
      <StyledLegend className={relTypes ? '' : 'one-row'}>
        {relTypes}
      </StyledLegend>
    )
  }
}
