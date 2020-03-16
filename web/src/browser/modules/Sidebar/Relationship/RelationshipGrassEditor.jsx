

import React, { Component } from 'react'
import { connect } from 'react-redux'
import neoGraphStyle from '../graphStyle'
import {
  StyledPickerSelector,
  StyledTokenRelationshipType,
  StyledInlineList,
  StyledInlineListItem,
  StyledListItem,
  StyledPickerListItem,
  StyledCircleSelector,
  StyledCaptionSelector
} from '../styled'
import * as actions from 'shared/modules/grass/grassDuck'
import { toKeyString } from 'shared/services/utils'

export class GrassEditorComponent extends Component {
  constructor(props) {
    super(props)
    this.graphStyle = neoGraphStyle()
    if (this.props.graphStyleData) {
      this.graphStyle.loadRules(this.props.graphStyleData)
    }
    this.widths = []
    for (let index = 0; index < 10; index++) {
      this.widths.push(`${5 + 3 * index}px`)
    }
  }

  updateStyle(selector, styleProp) {
    this.graphStyle.changeForSelector(selector, styleProp)
    this.props.update(this.graphStyle.toSheet())
  }

  circleSelector(
    styleProps,
    styleProvider,
    activeProvider,
    className,
    selector,
    textProvider = () => {
      return ''
    }
  ) {
    return styleProps.map((styleProp, i) => {
      const onClick = () => {
        this.updateStyle(selector, styleProp)
      }
      const style = styleProvider(styleProp, i)
      const text = textProvider(styleProp)
      const active = activeProvider(styleProp)
      return (
        <StyledPickerListItem className={className} key={toKeyString('circle' + i)} >
          <StyledCircleSelector className={active ? 'active' : ''} style={style} onClick={onClick} >
            {text}
          </StyledCircleSelector>
        </StyledPickerListItem>
      )
    })
  }

  colorPicker(selector, styleForLabel) {
    return (
      <StyledListItem key="color-picker">
        <StyledInlineList className="color-picker picker">
          <StyledInlineListItem>颜色:</StyledInlineListItem>
          {this.circleSelector(
            this.graphStyle.defaultColors(),
            color => {
              return { backgroundColor: color.color }
            },
            color => {
              return color.color === styleForLabel.get('color')
            },
            'color-picker-item',
            selector
          )}
        </StyledInlineList>
      </StyledListItem>
    )
  }

  widthPicker(selector, styleForItem) {
    const widthSelectors = this.graphStyle
      .defaultArrayWidths()
      .map((widthValue, i) => {
        const onClick = () => {
          this.updateStyle(selector, widthValue)
        }
        const style = { width: this.widths[i] }
        const active =
          styleForItem.get('shaft-width') === widthValue['shaft-width']
        return (
          <StyledPickerListItem className="width-picker-item" key={toKeyString('width' + i)} >
            <StyledPickerSelector className={active ? 'active' : ''} style={style} onClick={onClick} />
          </StyledPickerListItem>
        )
      })
    return (
      <StyledListItem key="width-picker">
        <StyledInlineList className="width-picker picker">
          <StyledInlineListItem>线宽:</StyledInlineListItem>
          {widthSelectors}
        </StyledInlineList>
      </StyledListItem>
    )
  }

  captionPicker(selector, styleForItem, propertyKeys, showTypeSelector = false) {
    const captionSelector = (displayCaption, captionToSave, key) => {
      const onClick = () => {
        this.updateStyle(selector, { caption: captionToSave })
      }
      const active = styleForItem.props.caption === captionToSave
      return (
        <StyledPickerListItem key={toKeyString('caption' + displayCaption)}>
          <StyledCaptionSelector className={active ? 'active' : ''} onClick={onClick} >
            {displayCaption}
          </StyledCaptionSelector>
        </StyledPickerListItem>
      )
    }
    const captionSelectors = propertyKeys.map((propKey, i) => {
      return captionSelector(propKey, `{${propKey}}`)
    })
    let typeCaptionSelector = null
    if (showTypeSelector) {
      typeCaptionSelector = captionSelector('<type>', '<type>', 'typecaption')
    }
    return (
      <StyledListItem key="caption-picker">
        <StyledInlineList className="caption-picker picker">
          <StyledInlineListItem>标题:</StyledInlineListItem>
          {captionSelector('<id>', '<id>', 'idcaption')}
          {typeCaptionSelector}
          {captionSelectors}
        </StyledInlineList>
      </StyledListItem>
    )
  }

  stylePicker() {
    let pickers
    let title
    const relTypeSelector = this.props.selectedRelType.relType !== '*' ? { type: this.props.selectedRelType.relType } : {}
    const styleForRelType = this.graphStyle.forRelationship(relTypeSelector)
    const inlineStyle = {
      backgroundColor: styleForRelType.get('color'),
      color: styleForRelType.get('text-color-internal')
    }
    pickers = [
      this.colorPicker(styleForRelType.selector, styleForRelType),
      this.widthPicker(styleForRelType.selector, styleForRelType),
      this.captionPicker(
        styleForRelType.selector,
        styleForRelType,
        this.props.selectedRelType.propertyKeys,
        true
      )
    ]
    title = (
      <StyledTokenRelationshipType className="token token-relationship" style={inlineStyle} >
        {this.props.selectedRelType.relType || '*'}
      </StyledTokenRelationshipType>
    )
    return (
      <StyledInlineList className="style-picker">
        {title}
        {pickers}
      </StyledInlineList>
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.graphStyleData && prevProps.graphStyleData !== this.props.graphStyleData) {
      this.graphStyle.loadRules(this.props.graphStyleData)
    }
  }

  render() {
    return this.stylePicker()
  }
}

const mapStateToProps = state => {
  return {
    graphStyleData: actions.getGraphStyleData(state),
    meta: state.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: data => {
      dispatch(actions.updateGraphStyleData(data))
    }
  }
}

export const RelationshipGrassEditor = connect(mapStateToProps, mapDispatchToProps)(GrassEditorComponent)
