
import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'shared/modules/settings/settingsDuck'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSection,
  DrawerSectionBody,
  DrawerSubHeader
} from 'browser-components/drawer'
import { RadioSelector, CheckboxSelector } from 'browser-components/Form'
import {
  StyledSetting,
  StyledSettingLabel,
  StyledSettingInlineLabel,
  StyledSettingTextInput
} from './styled'
import { toKeyString } from 'services/utils'

const visualSettings = [
  {
    title: 'User Interface',
    settings: [
      {
        theme: {
          tooltip:
            'Use "Auto" to have be detected system dark vs. light mode if available.',
          displayName: 'Theme',
          type: 'radio',
          options: [
            actions.AUTO_THEME,
            actions.LIGHT_THEME,
            actions.DARK_THEME
          ]
        }
      },
      {
        codeFontLigatures: {
          displayName: 'Code font ligatures',
          tooltip: 'Use font ligatures for the command bar and cypher snippets',
          type: 'checkbox'
        }
      },
      {
        editorAutocomplete: {
          displayName: 'Enhanced query editor',
          tooltip: 'Autocomplete and syntax highlighting in query editor',
          type: 'checkbox'
        }
      },
      {
        enableMultiStatementMode: {
          displayName: 'Enable multi statement query editor',
          tooltip: 'Allows query editor to execute multiple statements',
          type: 'checkbox'
        }
      }
    ]
  },
  {
    title: 'Result Frames',
    settings: [
      {
        maxFrames: {
          displayName: 'Maximum number of result frames',
          tooltip:
            'Max number of result frames. When reached, old frames gets retired.'
        }
      },
      {
        maxHistory: {
          displayName: 'Max History',
          tooltip:
            'Max number of history entries. When reached, old entries gets retired.'
        }
      },
      {
        scrollToTop: {
          displayName: 'Scroll To Top',
          tooltip: 'Automatically scroll stream to top on new frames.',
          type: 'checkbox'
        }
      }
    ]
  },
  {
    title: 'Graph Visualization',
    settings: [
      {
        initialNodeDisplay: {
          displayName: 'Initial Node Display',
          tooltip:
            'Limit number of nodes displayed on first load of the graph visualization.'
        }
      },
      {
        maxNeighbours: {
          displayName: 'Max Neighbours',
          tooltip: 'Limit exploratory queries to this limit.'
        }
      },
      {
        maxRows: {
          displayName: 'Max Rows',
          tooltip: "Max number of rows to render in 'Rows' result view"
        }
      },
      {
        autoComplete: {
          displayName: 'Connect result nodes',
          tooltip:
            'If this is checked, after a cypher query result is retrieved, a second query is executed to fetch relationships between result nodes.',
          type: 'checkbox'
        }
      }
    ]
  }
]

export const Settings = ({ settings, visualSettings,  onSettingsSave = () => {} }) => {
  if (!settings) return null
  const mappedSettings = visualSettings.map(visualSetting => {
    const title = <DrawerSubHeader>{visualSetting.title}</DrawerSubHeader>
    const mapSettings = visualSetting.settings
      .map(settingObj => {
        const setting = Object.keys(settingObj)[0]
        if (typeof settings[setting] === 'undefined') return false
        const visual = settingObj[setting].displayName
        const tooltip = settingObj[setting].tooltip || ''

        if (!settingObj[setting].type || settingObj[setting].type === 'input') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <StyledSettingLabel title={tooltip}>{visual}</StyledSettingLabel>
              <StyledSettingTextInput
                onChange={event => {
                  settings[setting] = event.target.value
                  onSettingsSave(settings)
                }}
                defaultValue={settings[setting]}
                title={[tooltip]}
                className={setting}
              />
            </StyledSetting>
          )
        } else if (settingObj[setting].type === 'radio') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <StyledSettingLabel title={tooltip}>{visual}</StyledSettingLabel>
              <RadioSelector
                options={settingObj[setting].options}
                onChange={event => {
                  settings[setting] = event.target.value
                  onSettingsSave(settings)
                }}
                selectedValue={settings[setting]}
              />
            </StyledSetting>
          )
        } else if (settingObj[setting].type === 'checkbox') {
          return (
            <StyledSetting key={toKeyString(visual)}>
              <CheckboxSelector
                onChange={event => {
                  settings[setting] = event.target.checked
                  onSettingsSave(settings)
                }}
                checked={settings[setting]}
                data-testid={setting}
              />
              <StyledSettingInlineLabel title={tooltip}>{visual}</StyledSettingInlineLabel>
            </StyledSetting>
          )
        }
      })
      .filter(setting => setting !== false)
    return (
      <React.Fragment key={toKeyString(visualSetting.title)}>
        {title}
        {mapSettings}
      </React.Fragment>
    )
  })
  return (
    <Drawer id="db-settings">
      <DrawerHeader>设置</DrawerHeader>
      <DrawerBody>
        <DrawerSection>
          <DrawerSectionBody key="settings">{mappedSettings}</DrawerSectionBody>
        </DrawerSection>
      </DrawerBody>
    </Drawer>
  )
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    visualSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSettingsSave: settings => {
      dispatch(actions.update(settings))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
