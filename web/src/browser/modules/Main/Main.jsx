
import React from 'react'
import {
  DISCONNECTED_STATE,
  PENDING_STATE,
  CONNECTING_STATE
} from 'shared/modules/connections/connectionsDuck'
import Editor from '../Editor/Editor'
import Stream from '../Stream/Stream'
import Render from 'browser-components/Render'
import {
  StyledMain,
  WarningBanner,
  ErrorBanner,
  NotAuthedBanner
} from './styled'
import ErrorBoundary from 'browser-components/ErrorBoundary'
import { useSlowConnectionState } from './main.hooks'
import AutoExecButton from '../Stream/auto-exec-button'

const Main = React.memo(function Main(props) {
  const [past5Sec, past10Sec] = useSlowConnectionState(props)

  return (
    <StyledMain data-testid="main">
      <ErrorBoundary>
        <Editor />
      </ErrorBoundary>
      <Render if={props.showUnknownCommandBanner}>
        <ErrorBanner>
          Type&nbsp;
          <AutoExecButton cmd="help commands" />
          &nbsp;for a list of available commands.
        </ErrorBanner>
      </Render>
      <Render if={props.errorMessage}>
        <ErrorBanner data-testid="errorBanner">
          {props.errorMessage}
        </ErrorBanner>
      </Render>
      <Render if={props.connectionState === DISCONNECTED_STATE}>
        <NotAuthedBanner data-testid="disconnectedBanner">
          Database access not available. Please use&nbsp;
          <AutoExecButton
            cmd="server connect"
            data-testid="disconnectedBannerCode"
          />
          &nbsp; to establish connection. There's a graph waiting for you.
        </NotAuthedBanner>
      </Render>
      <Render if={props.connectionState === PENDING_STATE && !past10Sec}>
        <WarningBanner data-testid="reconnectBanner">
          Connection to server lost. Reconnecting...
        </WarningBanner>
      </Render>
      <Render
        if={
          props.connectionState === CONNECTING_STATE && past5Sec && !past10Sec
        }
      >
        <NotAuthedBanner>Still connecting...</NotAuthedBanner>
      </Render>
      <Render if={past10Sec}>
        <WarningBanner>
          Server is taking a long time to respond...
        </WarningBanner>
      </Render>
      <ErrorBoundary>
        <Stream />
      </ErrorBoundary>
    </StyledMain>
  )
})

export default Main
