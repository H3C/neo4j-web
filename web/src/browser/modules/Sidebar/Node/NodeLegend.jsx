/*
 * w18863 2020-02-10
 */

import React, { Component } from 'react'
import {
  StyledLegendRow,
  StyledTokenCount,
  StyledLegendInlineListItem,
  StyledLegend,
  StyledLegendContents,
  StyledLabelToken,
  StyledLegendInlineList
} from '../styled'
import numberToUSLocale from 'shared/utils/number-to-US-locale'

export class NodeLegendComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.labelRowContracted = true
  }

  render() {
    const mapLabels = labels => {
      const labelList = Object.keys(labels).map((legendItemKey, i) => {
        const styleForItem = this.props.graphStyle.forNode({
          labels: [legendItemKey]
        })
        const onClick = () => {
          this.props.onSelectedLabel(
            legendItemKey,
            Object.keys(labels[legendItemKey].properties)
          )
        }
        const style = {
          backgroundColor: styleForItem.get('color'),
          color: styleForItem.get('text-color-internal')
        }
        return (
          <StyledLegendInlineListItem key={i} data-testid="viz-legend-labels">
            <StyledLegendContents className="contents">
              <StyledLabelToken onClick={onClick} style={style} className="token token-label" >
                {legendItemKey}
                <StyledTokenCount className="count">
                  {`(${numberToUSLocale(labels[legendItemKey].count)})`}
                </StyledTokenCount>
              </StyledLabelToken>
            </StyledLegendContents>
          </StyledLegendInlineListItem>
        )
      })
      return (
        <StyledLegendRow className={this.state.labelRowContracted ? 'contracted' : ''} >
          <StyledLegendInlineList className="list-inline" >
            {labelList}
          </StyledLegendInlineList>
        </StyledLegendRow>
      )
    }
    return (
      <StyledLegend className={'one-row'}>
        {mapLabels(this.props.labels)}
      </StyledLegend>
    )
  }
}
