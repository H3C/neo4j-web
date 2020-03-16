

import React, { Component } from 'react'
import { connect } from 'react-redux'
import neoGraphStyle from '../graphStyle'
import {
  StyledInlineList,
  StyledInlineListItem,
  StyledListItem,
  StyledLabelToken,
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
    this.nodeDisplaySizes = []
    for (let index = 0; index < 10; index++) {
      this.nodeDisplaySizes.push(`${12 + 2 * index}px`)
    }
  }

  sizeLessThan(size1, size2) {
    const size1Numerical = size1 ? size1.replace('px', '') + 0 : 0
    const size2Numerical = size1 ? size2.replace('px', '') + 0 : 0
    return size1Numerical <= size2Numerical
  }

  updateStyle(selector, styleProp) {
    this.graphStyle.changeForSelector(selector, styleProp)
    this.props.update(this.graphStyle.toSheet())
  }

  circleSelector(styleProps, styleProvider, activeProvider, className, selector, textProvider = () => { return '' }) {
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
            color => { return { backgroundColor: color.color } },
            color => { return color.color === styleForLabel.get('color') },
            'color-picker-item',
            selector
          )}
        </StyledInlineList>
      </StyledListItem>
    )
  }

  sizePicker(selector, styleForLabel) {
    return (
      <StyledListItem key="size-picker">
        <StyledInlineList className="size-picker picker">
          <StyledInlineListItem>大小:</StyledInlineListItem>
          {this.circleSelector(
            this.graphStyle.defaultSizes(),
            (size, index) => {
              return {
                width: this.nodeDisplaySizes[index],
                height: this.nodeDisplaySizes[index]
              }
            },
            size => {
              return this.sizeLessThan(
                size.diameter,
                styleForLabel.get('diameter')
              )
            },
            'size-picker-item',
            selector
          )}
        </StyledInlineList>
      </StyledListItem>
    )
  }

  iconPicker(selector) {
    return (
      <li key="icon-picker">
        Icon:
        <ul className="icon-picker picker">
          {this.picker(
            this.graphStyle.defaultIconCodes(),
            iconCode => {
              return { fontFamily: 'streamline' }
            },
            'icon-picker-item',
            selector,
            iconCode => {
              return iconCode['icon-code']
            }
          )}
        </ul>
      </li>
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
    const labelList = this.props.selectedLabel.label !== '*' ? [this.props.selectedLabel.label] : []
    const styleForLabel = this.graphStyle.forNode({ labels: labelList })
    const inlineStyle = {
      backgroundColor: styleForLabel.get('color'),
      color: styleForLabel.get('text-color-internal')
    }
    pickers = [
      this.colorPicker(styleForLabel.selector, styleForLabel),
      this.sizePicker(styleForLabel.selector, styleForLabel),
      // this.iconPicker(styleForLabel.selector),
      this.captionPicker(
        styleForLabel.selector,
        styleForLabel,
        this.props.selectedLabel.propertyKeys
      )
    ]
    title = (
      <StyledLabelToken className="token token-label" style={inlineStyle}>
        {this.props.selectedLabel.label || '*'}
      </StyledLabelToken>
    )
    // console.log('[add] title: ', this.props.selectedLabel.label || '*')
    return (
      <StyledInlineList className="style-picker">
        {title}
        {pickers}
      </StyledInlineList>
    )
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.graphStyleData &&
      prevProps.graphStyleData !== this.props.graphStyleData
    ) {
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

export const NodeGrassEditor = connect(mapStateToProps, mapDispatchToProps)(GrassEditorComponent)
