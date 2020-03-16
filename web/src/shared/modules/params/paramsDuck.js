

import { APP_START } from 'shared/modules/app/appDuck'

export const NAME = 'params'
const UPDATE = `${NAME}/UPDATE`
const REPLACE = `${NAME}/REPLACE`

const initialState = {}

// Selectors
export const getParams = state => state[NAME]

// Reducer
export default function reducer(state = initialState, action) {
  if (action.type === APP_START) {
    state = { ...initialState, ...state }
  }

  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.params }
    case REPLACE:
      return { ...action.params }
    default:
      return state
  }
}

// Action creators
export const update = obj => {
  return {
    type: UPDATE,
    params: obj
  }
}
export const replace = obj => {
  return {
    type: REPLACE,
    params: obj
  }
}
