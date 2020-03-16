

import styled from 'styled-components'

// Themes is here because the colors are unique to this component
const getColor = (theme, name) => {
  const themes = {
    normal: {
      svgBackground: '#f9fbfd'
    },
    dark: {
      svgBackground: '#5a6070'
    }
  }
  if (themes[theme] === undefined) theme = 'normal'
  return themes[theme][name] || ''
}


export const StyledFullSizeContainer = styled.div`
  position: relative;
  height: 100%;
`

export const StyledZoomHolder = styled.div`
  position: absolute;
  bottom: 39px;
  right: 0;
  padding: 6px 6px 0 6px;
  border-left: #e6e9ef solid 1px;
  border-top: #e6e9ef solid 1px;
  background: #fff;
`

export const StyledZoomButton = styled.button`
  display: list-item;
  list-style-type: none;
  font-size: 2em;
  margin-bottom: 10px;
  border: none;
  color: #9b9da2;
  background: transparent;
  border-color: black;
  padding: 2px 6px 3px;
  &:hover {
    color: black;
  }
  &:focus {
    outline: none;
  }
  &.faded {
    opacity: 0.3;
    cursor: auto;
    &:hover {
      color: #9b9da2;
    }
  }
`

export const StyledSvgWrapper = styled.div`
  line-height: 0;
  height: 100%;
  position: relative;
  > svg {
    height: 100%;
    width: 100%;
    background-color: ${props => getColor(props.theme.name, 'svgBackground')};
    .node {
      cursor: pointer;
      > .ring {
        fill: none;
        opacity: 0;
        stroke: #6ac6ff;
      }
      &.selected {
        > .ring {
          stroke: #fdcc59;
          opacity: 0.3;
        }
      }
      &:hover {
        > .ring {
          stroke: #6ac6ff;
          opacity: 0.3;
        }
      }
    }
    .relationship {
      > .overlay {
        opacity: 0;
        fill: #6ac6ff;
      }
      &.selected {
        > .overlay {
          fill: #fdcc59;
          opacity: 0.3;
        }
      }
      &:hover {
        > .overlay {
          fill: #6ac6ff;
          opacity: 0.3;
        }
      }
    }
    .remove_node {
      .expand_node {
        &:hover {
          border: 2px #000 solid;
        }
      }
    }
    .outline {
      cursor: pointer;
    }
    path {
      &.context-menu-item {
        stroke-width: 2px;
        fill: #d2d5da;
      }
    }
    text {
      line-height: normal;
      &.context-menu-item {
        fill: #fff;
        text-anchor: middle;
        pointer-events: none;
        font-size: 14px;
      }
    }
    .context-menu-item {
      cursor: pointer;
      &:hover {
        fill: #b9b9b9;
        font-size: 14px;
      }
    }
  }
`

export const StyledInlineList = styled.ul`
  padding-left: 0;
  list-style: none;
  word-break: break-word;
`

export const StyledInlineListItem = styled.li`
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
`

export const StyledStatusBar = styled.div`
  min-height: 34px;
  line-height: 34px;
  color: #717172;
  font-size: 13px;
  position: absolute;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  border-top: 1px solid #e6e9ef;
  bottom: 0;
  left: 0;
  right: 0;
`

export const StyledStatus = styled.div`
  width: 100%;
  padding-left: 16px;
`

export const StyledVizFooter = styled.div`
  max-height: 22px;
  margin-top: 6px;
  font-size: 12px;
  width: 100%;
  white-space: normal; 
`

export const StyledVizFooterRow = styled.ul`
  list-style: none;
  line-height: 21px;
  word-break: break-word;
`

export const StyledVizFooterRowListValue = styled.div`
  padding-left: 3px;
  overflow: hidden;
  float: left;
  white-space: pre-wrap;
`

export const StyledVizFooterRowListPair = styled(StyledInlineListItem)`
  vertical-align: middle;
  font-size: 13px;
`
