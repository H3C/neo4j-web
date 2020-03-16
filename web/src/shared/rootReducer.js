

import settingsReducer, { NAME as settings } from 'shared/modules/settings/settingsDuck'
import featuresReducer, { NAME as features } from 'shared/modules/features/featuresDuck'
import streamReducer, { NAME as stream } from 'shared/modules/stream/streamDuck'
import historyReducer, { NAME as history } from 'shared/modules/history/historyDuck'
import userReducer, { NAME as currentUser } from 'shared/modules/currentUser/currentUserDuck'
import dbMetaReducer, { NAME as dbMeta } from 'shared/modules/dbMeta/dbMetaDuck'
import favoritesReducer, { NAME as documents } from 'shared/modules/favorites/favoritesDuck'
import connectionsReducer, { NAME as connections } from 'shared/modules/connections/connectionsDuck'
import sidebarReducer, { NAME as sidebar } from 'shared/modules/sidebar/sidebarDuck'
import requestsReducer, { NAME as requests } from 'shared/modules/requests/requestsDuck'
import paramsReducer, { NAME as params } from 'shared/modules/params/paramsDuck'
import grassReducer, { NAME as grass } from 'shared/modules/grass/grassDuck'
import foldersReducer, { NAME as folders } from 'shared/modules/favorites/foldersDuck'
import commandsReducer, { NAME as commands } from 'shared/modules/commands/commandsDuck'
import udcReducer, { NAME as udc } from 'shared/modules/udc/udcDuck'
import appReducer, { NAME as app } from 'shared/modules/app/appDuck'
import explorerReducer, { NAME as explorer } from 'shared/modules/explorer/explorerDuck'

export default {
  [connections]: connectionsReducer,
  [stream]: streamReducer,
  [settings]: settingsReducer,
  [features]: featuresReducer,
  [history]: historyReducer,
  [currentUser]: userReducer,
  [dbMeta]: dbMetaReducer,
  [documents]: favoritesReducer,
  [folders]: foldersReducer,
  [sidebar]: sidebarReducer,
  [params]: paramsReducer,
  [requests]: requestsReducer,
  [grass]: grassReducer,
  [commands]: commandsReducer,
  [udc]: udcReducer,
  [app]: appReducer,
  [explorer]: explorerReducer
}
