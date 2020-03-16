

import { getBrowserName } from 'services/utils'
import { APP_START } from 'shared/modules/app/appDuck'

export const NAME = 'grass'
export const UPDATE_GRAPH_STYLE_DATA = 'grass/UPDATE_GRAPH_STYLE_DATA'
export const SYNC_GRASS = 'grass/SYNC_GRASS'

export const getGraphStyleData = state => state[NAME]

const versionSize = 20
const initialState = null

export const composeGrassToSync = (store, syncValue) => {
  const grassFromSync = syncValue.syncObj.grass || []
  const grassFromState = getGraphStyleData(store.getState())
  const stringifyedGrassFromState = JSON.stringify(grassFromState)

  if (
    grassFromSync.length < 1 ||
    (grassFromSync[0].data &&
      grassFromSync[0].data !== stringifyedGrassFromState &&
      grassFromSync[0].data !== grassFromState)
  ) {
    return [
      {
        client: getBrowserName(),
        data: stringifyedGrassFromState,
        syncedAt: Date.now()
      }
    ].concat(grassFromSync.slice(0, versionSize))
  }

  return grassFromSync
}

function updateStyleData(state, styleData) {
  return styleData
}

export default function visualization(state = initialState, action) {
  if (action.type === APP_START) {
    state = !state ? state : { ...initialState, ...state }
  }
  switch (action.type) {
    case UPDATE_GRAPH_STYLE_DATA:
      return updateStyleData(state, action.styleData)
    default:
      return state
  }
}

export const updateGraphStyleData = graphStyleData => {
  return {
    type: UPDATE_GRAPH_STYLE_DATA,
    styleData: graphStyleData
  }
}
export function syncGrass(grass) {
  return {
    type: SYNC_GRASS,
    grass
  }
}

export const grassToLoad = (action, store) => {
  const grassFromSync =
    action.obj.syncObj &&
    action.obj.syncObj.grass &&
    action.obj.syncObj.grass.length > 0
      ? action.obj.syncObj.grass[0].data || {}
      : null

  const existingGrass = getGraphStyleData(store.getState())
  const grassHasChanged = grassFromSync !== JSON.stringify(existingGrass)

  if (grassFromSync) {
    if (grassHasChanged) {
      return {
        grass: grassFromSync,
        syncGrass: false,
        loadGrass: true
      }
    } else {
      return {
        grass: existingGrass,
        syncGrass: false,
        loadGrass: false
      }
    }
  } else {
    return {
      grass: existingGrass,
      syncGrass: true,
      loadGrass: false
    }
  }
}
