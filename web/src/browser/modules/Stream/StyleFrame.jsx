
import React from 'react'
import { connect } from 'react-redux'
import FrameTemplate from '../Frame/FrameTemplate'
import { PaddedDiv, StyledOneRowStatsBar, StyledRightPartial } from './styled'
import { StyledFrameTitlebarButtonSection } from 'browser/modules/Frame/styled'
import { FrameButton } from 'browser-components/buttons'
import { objToCss } from 'services/grassUtils'
import {
  executeSystemCommand,
  executeCommand
} from 'shared/modules/commands/commandsDuck'
import { getCmdChar } from 'shared/modules/settings/settingsDuck'
import { FireExtinguisherIcon } from 'browser-components/icons/Icons'
import { InfoView } from './InfoView'

const StyleFrame = ({ frame }) => {
  let grass = ''
  let contents = (
    <InfoView
      title="No styles yet"
      description="No style generated or set yet. Run a query and return a few nodes and
    relationships to generate some styling."
    />
  )
  if (frame.result) {
    grass = objToCss(frame.result)
    contents = (
      <PaddedDiv>
        <pre>
          {grass ||
            'Something went wrong when parsing the GraSS. Please reset and try again.'}
        </pre>
      </PaddedDiv>
    )
  }
  return (
    <FrameTemplate
      header={frame}
      numRecords={1}
      getRecords={() => grass}
      contents={contents}
      statusbar={<Statusbar frame={frame} />}
    />
  )
}

const StyleStatusbar = ({ resetStyleAction, rerunAction, onResetClick }) => {
  return (
    <StyledOneRowStatsBar>
      <StyledRightPartial>
        <StyledFrameTitlebarButtonSection>
          <FrameButton
            data-testid="styleResetButton"
            onClick={() => onResetClick(resetStyleAction, rerunAction)}
          >
            <FireExtinguisherIcon title="Reset style" />
          </FrameButton>
        </StyledFrameTitlebarButtonSection>
      </StyledRightPartial>
    </StyledOneRowStatsBar>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    resetStyleAction: executeSystemCommand(`${getCmdChar(state)}style reset`),
    rerunAction: executeCommand(ownProps.frame.cmd, ownProps.frame.id)
  }
}
const mapDispatchToProps = dispatch => ({
  onResetClick: (resetStyleAction, rerunAction) => {
    dispatch(resetStyleAction)
    dispatch(rerunAction)
  }
})

const Statusbar = connect(mapStateToProps, mapDispatchToProps)(StyleStatusbar)

export default StyleFrame
