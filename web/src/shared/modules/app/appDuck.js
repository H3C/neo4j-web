

// Action type constants
export const NAME = 'app'
export const APP_START = `${NAME}/APP_START`
export const USER_CLEAR = `${NAME}/USER_CLEAR`

export const URL_ARGUMENTS_CHANGE = `${NAME}/URL_ARGUMENTS_CHANGE`

// State constants
export const DESKTOP = 'DESKTOP'
export const WEB = 'WEB'
export const CLOUD = 'CLOUD'

// Selectors
export const getHostedUrl = state => (state[NAME] || {}).hostedUrl || null
export const getEnv = state => (state[NAME] || {}).env || WEB
export const hasDiscoveryEndpoint = state =>
  [WEB, CLOUD].includes(getEnv(state))
export const inWebEnv = state => getEnv(state) === WEB

// Reducer
export default function reducer(state = { hostedUrl: null }, action) {
  switch (action.type) {
    case APP_START:
      return { ...state, hostedUrl: action.url, env: action.env }
    default:
      return state
  }
}
