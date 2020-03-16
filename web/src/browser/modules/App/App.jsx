
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import { ThemeProvider } from 'styled-components'
import * as themes from 'browser/styles/themes'
import {
  getTheme,
  getCmdChar,
  codeFontLigatures,
  LIGHT_THEME
} from 'shared/modules/settings/settingsDuck'
import { FOCUS, EXPAND } from 'shared/modules/editor/editorDuck'
import { getErrorMessage } from 'shared/modules/commands/commandsDuck'
import { allowOutgoingConnections } from 'shared/modules/dbMeta/dbMetaDuck'
import {
  getActiveConnection,
  getConnectionState,
  getLastConnectionUpdate,
  getActiveConnectionData,
  isConnected,
  getConnectionData,
  SWITCH_CONNECTION_FAILED,
  SWITCH_CONNECTION,
  SILENT_DISCONNECT
} from 'shared/modules/connections/connectionsDuck'
import { toggle } from 'shared/modules/sidebar/sidebarDuck'
import {
  CONNECTION_ID,
  INJECTED_DISCOVERY
} from 'shared/modules/discovery/discoveryDuck'
import {
  StyledWrapper,
  StyledApp,
  StyledBody,
  StyledMainWrapper
} from './styled'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'
import UserInteraction from '../UserInteraction'
import ErrorBoundary from 'browser-components/ErrorBoundary'
import { inWebEnv } from 'shared/modules/app/appDuck'
import useDerivedTheme from 'browser-hooks/useDerivedTheme'
import DesktopApi from 'browser-components/desktop-api/desktop-api'
import {
  buildConnectionCreds,
  getDesktopTheme
} from 'browser-components/desktop-api/desktop-api.handlers'

export function App(props) {
  const [derivedTheme, setEnvironmentTheme] = useDerivedTheme(
    props.theme,
    LIGHT_THEME
  )
  const themeData = themes[derivedTheme] || themes[LIGHT_THEME]

  useEffect(() => {
    document.addEventListener('keyup', focusEditorOnSlash)
    document.addEventListener('keyup', expandEditorOnEsc)

    return () => {
      document.removeEventListener('keyup', focusEditorOnSlash)
      document.removeEventListener('keyup', expandEditorOnEsc)
    }
  }, [])

  const focusEditorOnSlash = e => {
    if (['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) > -1) return
    if (e.key !== '/') return
    props.bus && props.bus.send(FOCUS)
  }
  const expandEditorOnEsc = e => {
    if (e.keyCode !== 27) return
    props.bus && props.bus.send(EXPAND)
  }

  const {
    drawer,
    cmdchar,
    handleNavClick,
    activeConnection,
    connectionState,
    lastConnectionUpdate,
    errorMessage,
    store,
    codeFontLigatures,
    defaultConnectionData
  } = props

  const wrapperClassNames = []
  if (!codeFontLigatures) {
    wrapperClassNames.push('disable-font-ligatures')
  }

  return (
    <ErrorBoundary>
      <DesktopApi
        onMount={(...args) => {
          buildConnectionCreds(...args, { defaultConnectionData })
            .then(creds => props.bus.send(INJECTED_DISCOVERY, creds))
            .catch(() => props.bus.send(SWITCH_CONNECTION_FAILED))
          getDesktopTheme(...args)
            .then(theme => setEnvironmentTheme(theme))
            .catch(setEnvironmentTheme(null))
        }}
        onGraphActive={(...args) => {
          buildConnectionCreds(...args, { defaultConnectionData })
            .then(creds => props.bus.send(SWITCH_CONNECTION, creds))
            .catch(e => props.bus.send(SWITCH_CONNECTION_FAILED))
        }}
        onGraphInactive={() => props.bus.send(SILENT_DISCONNECT)}
        onColorSchemeUpdated={(...args) =>
          getDesktopTheme(...args)
            .then(theme => setEnvironmentTheme(theme))
            .catch(setEnvironmentTheme(null))
        }
      />
      <ThemeProvider theme={themeData}>
        <StyledWrapper className={wrapperClassNames}>
          <UserInteraction />
          <StyledApp>
            <StyledBody>
              <ErrorBoundary>
                <Sidebar openDrawer={drawer} onNavClick={handleNavClick} />
              </ErrorBoundary>
              <StyledMainWrapper>
                <Main
                  cmdchar={cmdchar}
                  activeConnection={activeConnection}
                  connectionState={connectionState}
                  lastConnectionUpdate={lastConnectionUpdate}
                  errorMessage={errorMessage}
                />
              </StyledMainWrapper>
            </StyledBody>
          </StyledApp>
        </StyledWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

const mapStateToProps = state => {
  const connectionData = getActiveConnectionData(state)
  return {
    drawer: state.drawer,
    activeConnection: getActiveConnection(state),
    theme: getTheme(state),
    codeFontLigatures: codeFontLigatures(state),
    connectionState: getConnectionState(state),
    lastConnectionUpdate: getLastConnectionUpdate(state),
    cmdchar: getCmdChar(state),
    errorMessage: getErrorMessage(state),
    defaultConnectionData: getConnectionData(state, CONNECTION_ID),
    isWebEnv: inWebEnv(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleNavClick: id => {
      dispatch(toggle(id))
    }
  }
}

export default withBus(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
