

import React from 'react'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {
  createBus,
  createReduxMiddleware as createSuberReduxMiddleware
} from 'suber'
import { BusProvider } from 'react-suber'
import App from './modules/App/App'
import reducers from 'shared/rootReducer'
import epics from 'shared/rootEpic'

import { createReduxMiddleware, getAll, applyKeys } from 'services/localstorage'
import { APP_START } from 'shared/modules/app/appDuck'
import { GlobalStyle } from './styles/global-styles.js'
import { detectRuntimeEnv } from 'services/utils.js'

// Configure localstorage sync
applyKeys(
  'connections',
  'settings',
  'history',
  'documents',
  'folders',
  'grass',
  'syncConsent',
  'udc',
  'experimentalFeatures'
)

// Create suber bus
const bus = createBus()
// Define Redux middlewares
const suberMiddleware = createSuberReduxMiddleware(bus)
const epicMiddleware = createEpicMiddleware(epics)
const localStorageMiddleware = createReduxMiddleware()

const reducer = combineReducers({ ...reducers })

const enhancer = compose(
  applyMiddleware(suberMiddleware, epicMiddleware, localStorageMiddleware),
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)

const store = createStore(
  reducer,
  getAll(), // rehydrate from local storage on app start
  enhancer
)

// Send everything from suber into Redux
bus.applyMiddleware((_, origin) => (channel, message, source) => {
  // No loop-backs
  if (source === 'redux') return
  // Send to Redux with the channel as the action type
  store.dispatch({ ...message, type: channel, ...origin })
})

// URL we're on
const url = window.location.href

// Introduce environment to be able to fork functionality
const env = detectRuntimeEnv(window)

// Signal app upstart (for epics)
store.dispatch({ type: APP_START, url, env })

const AppInit = () => {
  return (
    <Provider store={store}>
      <BusProvider bus={bus}>
        <>
          <GlobalStyle />
          <App />
        </>
      </BusProvider>
    </Provider>
  )
}
export default AppInit
