

import { APP_START, USER_CLEAR } from 'shared/modules/app/appDuck'

export const NAME = 'settings'
export const UPDATE = 'settings/UPDATE'
export const REPLACE = 'settings/REPLACE'

export const AUTO_THEME = 'auto'
export const LIGHT_THEME = 'normal'
export const DARK_THEME = 'dark'

export const getSettings = state => state[NAME]
export const getMaxHistory = state =>
  state[NAME].maxHistory || initialState.maxHistory
export const getTheme = state => state[NAME].theme || initialState.theme
export const getUseBoltRouting = state =>
  state[NAME].useBoltRouting || initialState.useBoltRouting
export const getMaxNeighbours = state =>
  state[NAME].maxNeighbours || initialState.maxNeighbours
export const getMaxRows = state => state[NAME].maxRows || initialState.maxRows
export const getInitialNodeDisplay = state =>
  state[NAME].initialNodeDisplay || initialState.initialNodeDisplay
export const getScrollToTop = state => state[NAME].scrollToTop
export const shouldReportUdc = state => state[NAME].shouldReportUdc !== false
export const shouldAutoComplete = state => state[NAME].autoComplete !== false
export const shouldEditorLint = state => state[NAME].editorLint === true
export const shouldEnableMultiStatementMode = state =>
  state[NAME].enableMultiStatementMode

export const getUseNewVisualization = state => state[NAME].useNewVis
export const getCmdChar = state => state[NAME].cmdchar || initialState.cmdchar
export const shouldEditorAutocomplete = state =>
  state[NAME].editorAutocomplete !== false
export const shouldUseCypherThread = state => state[NAME].useCypherThread
export const getConnectionTimeout = state =>
  state[NAME].connectionTimeout || initialState.connectionTimeout
export const codeFontLigatures = state => state[NAME].codeFontLigatures

const initialState = {
  cmdchar: ':',
  maxHistory: 30,
  theme: AUTO_THEME,
  initCmd: '',
  initialNodeDisplay: 300,
  maxNeighbours: 100,
  maxRows: 1000,
  shouldReportUdc: true,
  autoComplete: true,
  scrollToTop: true,
  maxFrames: 30,
  codeFontLigatures: true,
  editorAutocomplete: true,
  editorLint: false,
  useCypherThread: true,
  enableMultiStatementMode: false,
  connectionTimeout: 30 * 1000 // 30 seconds
}

export default function settings(state = initialState, action) {
  if (action.type === APP_START) {
    state = { ...initialState, ...state }
  }

  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, action.state)
    case REPLACE:
      return Object.assign({}, { ...initialState }, action.state)
    case USER_CLEAR:
      return initialState
    default:
      return state
  }
}

export const update = settings => {
  return {
    type: UPDATE,
    state: settings
  }
}

export const replace = settings => {
  return {
    type: REPLACE,
    state: settings
  }
}
