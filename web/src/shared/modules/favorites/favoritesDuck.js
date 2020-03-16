

import uuid from 'uuid'
import { USER_CLEAR, APP_START } from 'shared/modules/app/appDuck'
import { getBrowserName } from 'services/utils'

export const NAME = 'documents'
export const ADD_FAVORITE = 'favorites/ADD_FAVORITE'
export const REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE'
export const REMOVE_FAVORITES = 'favorites/REMOVE_FAVORITES'
export const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES'
export const SYNC_FAVORITES = 'favorites/SYNC_FAVORITES'
export const UPDATE_FAVORITE = 'favorites/UPDATE_FAVORITE'
export const UPDATE_FAVORITES = 'favorites/UPDATE_FAVORITES'

export const getFavorites = state => state[NAME]
export const getFavorite = (state, id) => state.filter(favorite => favorite.id === id)[0]
export const removeFavoriteById = (state, id) => state.filter(favorite => favorite.id !== id)
export const removeFavoritesById = (state, ids) => state.filter(favorite => !ids.includes(favorite.id))
const versionSize = 20

// reducer
const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FAVORITE:
      return removeFavoriteById(state, action.id)
    case REMOVE_FAVORITES:
      return removeFavoritesById(state, action.ids)
    case ADD_FAVORITE:
      return state.concat([{ id: action.id || uuid.v4(), content: action.cmd }])
    case UPDATE_FAVORITE:
      const mergedFavorite = Object.assign({}, getFavorite(state, action.id), {
        content: action.cmd
      })
      const updatedFavorites = state.map(_ =>
        _.id === action.id ? mergedFavorite : _
      )
      return mergeFavorites(initialState, updatedFavorites)
    case LOAD_FAVORITES:
    case UPDATE_FAVORITES:
      return mergeFavorites(action.favorites, state)
    case USER_CLEAR:
      return initialState
    case APP_START:
      return mergeFavorites(initialState, state)
    default:
      return state
  }
}

export function removeFavorite(id) {
  return {
    type: REMOVE_FAVORITE,
    id
  }
}
export function removeFavorites(ids) {
  return {
    type: REMOVE_FAVORITES,
    ids
  }
}
export function addFavorite(cmd, id) {
  return {
    type: ADD_FAVORITE,
    cmd,
    id
  }
}
export function loadFavorites(favorites) {
  return {
    type: LOAD_FAVORITES,
    favorites
  }
}
export function syncFavorites(favorites) {
  return {
    type: SYNC_FAVORITES,
    favorites
  }
}
export function updateFavorite(id, cmd) {
  return {
    type: UPDATE_FAVORITE,
    id,
    cmd
  }
}
export function updateFavorites(favorites) {
  return {
    type: UPDATE_FAVORITES,
    favorites
  }
}

export const composeDocumentsToSync = (store, syncValue) => {
  const documents = syncValue.syncObj.documents || []
  const favorites = getFavorites(store.getState()).filter(fav => !fav.isStatic)

  const newDocuments = [
    {
      client: getBrowserName(),
      data: favorites,
      syncedAt: Date.now()
    }
  ].concat(documents.slice(0, versionSize))

  return newDocuments
}

export const mergeFavorites = (list1, list2) => {
  return list1.concat(
    list2.filter(
      favInList2 =>
        list1.findIndex(favInList1 => favInList1.id === favInList2.id) < 0
    )
  )
}

export const favoritesToLoad = (action, store) => {
  const favoritesFromSync =
    action.obj.syncObj && action.obj.syncObj.documents.length > 0
      ? action.obj.syncObj.documents[0].data || []
      : null

  if (favoritesFromSync) {
    const existingFavs = getFavorites(store.getState())
    const allFavorites = mergeFavorites(favoritesFromSync, existingFavs)

    if (
      existingFavs.every(
        exFav =>
          exFav.isStatic ||
          favoritesFromSync.findIndex(syncFav => syncFav.id === exFav.id) >= 0
      )
    ) {
      return {
        favorites: allFavorites,
        syncFavorites: false,
        loadFavorites: true
      }
    } else {
      return {
        favorites: allFavorites,
        syncFavorites: true,
        loadFavorites: true
      }
    }
  } else {
    return { favorites: null, syncFavorites: false, loadFavorites: false }
  }
}
