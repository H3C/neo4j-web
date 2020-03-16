

import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { StyledStream } from './styled'
import CypherFrame from './CypherFrame/index'
import HistoryFrame from './HistoryFrame'
import Frame from '../Frame/Frame'
import PreFrame from './PreFrame'
import ParamsFrame from './ParamsFrame'
import ErrorFrame from './ErrorFrame'
import CypherScriptFrame from './CypherScriptFrame/CypherScriptFrame'
import StyleFrame from './StyleFrame'
import SysInfoFrame from './SysInfoFrame'
import ConnectionFrame from './Auth/ConnectionFrame'
import DisconnectFrame from './Auth/DisconnectFrame'
import ServerStatusFrame from './Auth/ServerStatusFrame'
import ServerSwitchFrame from './Auth/ServerSwitchFrame'
import UseDbFrame from './Auth/UseDbFrame'
import ChangePasswordFrame from './Auth/ChangePasswordFrame'
import QueriesFrame from './Queries/QueriesFrame'
import UserList from '../User/UserList'
import UserAdd from '../User/UserAdd'
import { getFrames } from 'shared/modules/stream/streamDuck'
import { getActiveConnectionData } from 'shared/modules/connections/connectionsDuck'
import { getScrollToTop } from 'shared/modules/settings/settingsDuck'
import DbsFrame from './Auth/DbsFrame'

const getFrame = type => {
  const trans = {
    error: ErrorFrame,
    cypher: CypherFrame,
    'cypher-script': CypherScriptFrame,
    'user-list': UserList,
    'user-add': UserAdd,
    'change-password': ChangePasswordFrame,
    pre: PreFrame,
    history: HistoryFrame,
    param: ParamsFrame,
    params: ParamsFrame,
    connection: ConnectionFrame,
    disconnect: DisconnectFrame,
    queries: QueriesFrame,
    sysinfo: SysInfoFrame,
    status: ServerStatusFrame,
    'switch-success': ServerSwitchFrame,
    'switch-fail': ServerSwitchFrame,
    'use-db': UseDbFrame,
    'reset-db': UseDbFrame,
    dbs: DbsFrame,
    style: StyleFrame,
    default: Frame
  }
  return trans[type] || trans.default
}

class Stream extends PureComponent {
  componentDidMount() {
    this.base = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.framesSignature !== this.props.framesSignature &&
      this.props.scrollToTop &&
      this.base &&
      this.base.current
    ) {
      this.base.current.scrollTop = 0
    }
  }

  render() {
    return (
      <StyledStream ref={this.base}>
        {this.props.frames.map(frame => {
          const frameProps = {
            frame,
            activeConnectionData: this.props.activeConnectionData
          }
          let MyFrame = getFrame(frame.type)
          if (frame.type === 'error') {
            try {
              const cmd = frame.cmd.replace(/^:/, '')
              const Frame = cmd[0].toUpperCase() + cmd.slice(1) + 'Frame'
              MyFrame = require('./Extras/index.js')[Frame]
              if (!MyFrame) {
                MyFrame = getFrame(frame.type)
              }
            } catch (e) {}
          }
          return <MyFrame {...frameProps} key={frame.id} />
        })}
      </StyledStream>
    )
  }
}

const mapStateToProps = state => {
  const frames = getFrames(state)
  return {
    framesSignature: frames
      .map(frame => frame.id + (frame.requestId || ''))
      .join(''),
    frames,
    activeConnectionData: getActiveConnectionData(state),
    scrollToTop: getScrollToTop(state)
  }
}

export default connect(mapStateToProps)(Stream)
