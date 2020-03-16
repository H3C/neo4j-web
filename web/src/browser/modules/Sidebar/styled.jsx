
import React from 'react'
import styled from 'styled-components'
import { QuestionIcon, PlayIcon } from 'browser-components/icons/Icons'

export const StyledSetting = styled.div`
  padding-bottom: 15px;
`

export const StyledSettingInlineLabel = styled.div`
  word-wrap: break-wrap;
  display: inline-block;
`

export const StyledSettingLabel = styled.div`
  word-wrap: break-wrap;
`

export const StyledSettingTextInput = styled.input`
  height: 34px;
  color: #555;
  font-size: 14px;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 192px;
`

// graph style

const pMarginTop = 6

export const p = styled.div`
  margin-top: ${pMarginTop}px;
  font-size: 12px;
  width: 100%;
  white-space: normal;
`

export const StyledInlineList = styled.ul`
  padding-left: 0;
  list-style: none;
  word-break: break-word;
`

export const StyledListItem = styled.li`
`

export const StyledInlineListItem = styled.li`
  display: inline-block;
  padding-right: 5px;
`

export const StyledToken = styled(StyledInlineListItem)`
  display: inline-block;
  font-weight: bold;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  user-select: none;
  font-size: 12px;
  margin-right: 5px;
  cursor: pointer;
`
export const StyledLabelToken = styled(StyledToken)`
  padding: 4px 7px 4px 9px;
  border-radius: 20px;
`
export const StyledTokenRelationshipType = styled(StyledToken)`
  padding: 4px 7px 4px 5px;
  border-radius: 3px;
`

export const tokenPropertyKey = styled(StyledToken)`
  padding: 3px 5px 3px 5px;
`

export const StyledTokenCount = styled.span`
  font-weight: normal;
`
export const StyledLegendContents = styled.ul`
  float: left;
  line-height: 1em;
  position: relative;
  top: 3px;
  top: -1px;
`

export const StyledLegendRow = styled.div`
  
`
export const StyledLegend = styled.div`
  z-index: 1;
`
export const StyledLegendInlineList = styled(StyledInlineList)`
`
export const StyledLegendInlineListItem = styled(StyledInlineListItem)`
  display: inline-block;
  margin-bottom: 3px;
`
export const StyledPickerListItem = styled(StyledInlineListItem)`
  padding-right: 5px;
  padding-left: 0;
  vertical-align: middle;
  line-height: 0;
`

export const StyledPickerSelector = styled.a`
  background-color: #aaa;
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-top: 1px;
  line-height: 0;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
  }
`
export const StyledCircleSelector = styled(StyledPickerSelector)`
  border-radius: 50%;
`
export const StyledCaptionSelector = styled.a`
  cursor: pointer;
  user-select: none;
  display: inline-block;
  padding: 1px 6px;
  font-size: 12px;
  line-height: 1em;
  color: #9195a0;
  border: 1px solid #9195a0;
  overflow: hidden;
  border-radius: 0.25em;
  margin-right: 0;
  font-weight: bold;
  &:hover {
    border-color: #aaa;
    color: #aaa;
    text-decoration: none;
  }
  &.active {
    color: white;
    background-color: #9195a0;
  }
`

export const StyledInspectorFooter = styled.div`
  margin-top: 6px;
  font-size: 12px;
  width: 100%;
  white-space: normal; 
`

export const StyledInspectorFooterRow = styled.ul`
  list-style: none;
  word-break: break-word;
`

export const StyledInspectorFooterRowListPair = styled(StyledListItem)`
  vertical-align: middle;
  font-size: 13px;
`

export const StyledInspectorFooterRowListKey = styled.div`
  float: left;
  font-weight: 800;
`

export const StyledInspectorFooterRowListValue = styled.div`
  padding-left: 3px;
  overflow: hidden;
  white-space: pre-wrap;
`

export const StyledStatusBar = styled.div`
  min-height: 39px;
  line-height: 39px;
  font-size: 13px;
  white-space: nowrap;
`

export const StyledStatus = styled.div`
  width: 100%;
  margin-top: 3px;
`

export const StyledHelpItem = styled.div`  
  margin: 18px 0;  
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StyledDocumentText = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #5dade2;
    text-decoration: none;
  }
`

export const StyledSearchActionLink = props => {
  const { name, ...rest } = props
  return (
    <StyledHelpItem onClick={props.onClick}>
      <StyledDocumentText {...rest}>
        <QuestionIcon />
        &nbsp;
        {name}
      </StyledDocumentText>
    </StyledHelpItem>
  )
}

export const StyledSearchItem = styled.li`
  list-style-type: none;
  margin-top: 3px;
`

import {
  StyledInput as Input,
  StyledSelect as Select
} from 'browser-components/Form'

export const StyledInput = styled(Input)``
export const StyledSelect = styled(Select)``

export const StyledHintSelector = styled.a`
  background-color: #f8f8f8;
  border-radius: 3px;
  border: 1px solid #dadada;
  display: inline-block;
  font-family: "Fira Code",Monaco,"Courier New",Terminal,monospace;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 0 4px;
  color: #428bca;
  cursor: pointer;
  text-decoration: none;
`

export const StyledHint = styled.div`  
  margin-top: 18px;    
`

