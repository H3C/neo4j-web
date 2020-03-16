

import { combineEpics } from 'redux-observable'
import {
  handleCommandEpic,
  handleSingleCommandEpic,
  postConnectCmdEpic,
  fetchGuideFromWhitelistEpic
} from './modules/commands/commandsDuck'
import {
  retainCredentialsSettingsEpic,
  connectEpic,
  disconnectEpic,
  startupConnectEpic,
  disconnectSuccessEpic,
  verifyConnectionCredentialsEpic,
  startupConnectionSuccessEpic,
  startupConnectionFailEpic,
  detectActiveConnectionChangeEpic,
  connectionLostEpic,
  switchConnectionEpic,
  switchConnectionSuccessEpic,
  switchConnectionFailEpic,
  silentDisconnectEpic,
  useDbEpic
} from './modules/connections/connectionsDuck'
import {
  dbMetaEpic,
  serverInfoEpic,
  clearMetaOnDisconnectEpic
} from './modules/dbMeta/dbMetaDuck'
import { cancelRequestEpic } from './modules/requests/requestsDuck'
import {
  discoveryOnStartupEpic,
  injectDiscoveryEpic
} from './modules/discovery/discoveryDuck'
import { clearLocalstorageEpic } from './modules/localstorage/localstorageDuck'
import { populateEditorFromUrlEpic } from './modules/editor/editorDuck'
import {
  adHocCypherRequestEpic,
  cypherRequestEpic,
  clusterCypherRequestEpic,
  handleForcePasswordChangeEpic
} from './modules/cypher/cypherDuck'
import { featuresDiscoveryEpic } from './modules/features/featuresDuck'
import { credentialsTimeoutEpic } from './modules/credentialsPolicy/credentialsPolicyDuck'
import { maxFramesConfigEpic } from './modules/stream/streamDuck'
import {
  getCurrentUserEpic,
  clearCurrentUserOnDisconnectEpic
} from './modules/currentUser/currentUserDuck'

export default combineEpics(
  handleCommandEpic,
  handleSingleCommandEpic,
  postConnectCmdEpic,
  fetchGuideFromWhitelistEpic,
  connectionLostEpic,
  switchConnectionEpic,
  switchConnectionSuccessEpic,
  switchConnectionFailEpic,
  retainCredentialsSettingsEpic,
  connectEpic,
  disconnectEpic,
  silentDisconnectEpic,
  useDbEpic,
  startupConnectEpic,
  disconnectSuccessEpic,
  verifyConnectionCredentialsEpic,
  startupConnectionSuccessEpic,
  startupConnectionFailEpic,
  detectActiveConnectionChangeEpic,
  dbMetaEpic,
  serverInfoEpic,
  clearMetaOnDisconnectEpic,
  cancelRequestEpic,
  discoveryOnStartupEpic,
  injectDiscoveryEpic,
  populateEditorFromUrlEpic,
  adHocCypherRequestEpic,
  cypherRequestEpic,
  clusterCypherRequestEpic,
  clearLocalstorageEpic,
  handleForcePasswordChangeEpic,
  featuresDiscoveryEpic,
  credentialsTimeoutEpic,
  maxFramesConfigEpic,
  getCurrentUserEpic,
  clearCurrentUserOnDisconnectEpic
)
