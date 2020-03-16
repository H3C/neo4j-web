

import Rx from 'rxjs/Rx'
import { getUrlParamValue } from 'services/utils'
import { getSettings } from 'shared/modules/settings/settingsDuck'
import { APP_START, URL_ARGUMENTS_CHANGE } from 'shared/modules/app/appDuck'

const NAME = 'editor'
export const SET_CONTENT = NAME + '/SET_CONTENT'
export const EDIT_CONTENT = NAME + '/EDIT_CONTENT'
export const FOCUS = `${NAME}/FOCUS`
export const EXPAND = `${NAME}/EXPAND`
export const NOT_SUPPORTED_URL_PARAM_COMMAND = `${NAME}/NOT_SUPPORTED_URL_PARAM_COMMAND`

// Supported commands
const validCommandTypes = {
  play: (cmdchar, args) => `${cmdchar}play ${args.join(' ')}`,
  edit: (_, args) => args.join('\n'),
  param: (cmdchar, args) => `${cmdchar}param ${args.join(' ')}`,
  params: (cmdchar, args) => `${cmdchar}params ${args.join(' ')}`
}

export const setContent = newContent => ({
  type: SET_CONTENT,
  message: newContent
})
export const editContent = (id, message) => ({
  type: EDIT_CONTENT,
  message,
  id
})

export const populateEditorFromUrlEpic = (some$, store) => {
  return some$
    .ofType(APP_START)
    .merge(some$.ofType(URL_ARGUMENTS_CHANGE))
    .delay(1) // Timing issue. Needs to be detached like this
    .mergeMap(action => {
      if (!action.url) {
        return Rx.Observable.never()
      }
      const cmdParam = getUrlParamValue('cmd', action.url)

      // No URL command param found
      if (!cmdParam || !cmdParam[0]) {
        return Rx.Observable.never()
      }

      // Not supported URL param command
      if (!Object.keys(validCommandTypes).includes(cmdParam[0])) {
        return Rx.Observable.of({
          type: NOT_SUPPORTED_URL_PARAM_COMMAND,
          command: cmdParam[0]
        })
      }

      const commandType = cmdParam[0]
      const cmdchar = getSettings(store.getState()).cmdchar
      const cmdArgs =
        getUrlParamValue('arg', decodeURIComponent(action.url)) || []
      const fullCommand = validCommandTypes[commandType](cmdchar, cmdArgs)

      return Rx.Observable.of({ type: SET_CONTENT, ...setContent(fullCommand) })
    })
}
