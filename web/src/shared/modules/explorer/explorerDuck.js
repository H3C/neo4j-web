import { APP_START } from 'shared/modules/app/appDuck'
export const NAME = 'explorer'
export const UPDATE = 'explorer/UPDATE'

// Selectors
export const getExplorer = state => state[NAME]
export const getSelected = state => state[NAME].selectedItem
export const getLabels = state => state[NAME].labels
export const getRelTypes = state => state[NAME].relTypes

const initialState = {
  labels: {},
  relTypes: {},
  selectedItem: {
    type: '',
    item: {}
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  if (action.type === APP_START) {
    state = { ...initialState, ...state }
  }

  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, action.state)
    default:
      return state
  }
}

// Action creators
export const update = explorer => {
  return {
    type: UPDATE,
    state: explorer
  }
}

