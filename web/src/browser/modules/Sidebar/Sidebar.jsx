

import React from 'react'
import { connect } from 'react-redux'
import Search from './Search/Search'
import Relationship from './Relationship/Relationship'
import Node from './Node/Node'
import Favorites from './Favorites/favorites'
import TabNavigation from 'browser-components/TabNavigation/Navigation'
import Settings from './Settings'
import {
  PENDING_STATE,
  CONNECTED_STATE,
  DISCONNECTED_STATE
} from 'shared/modules/connections/connectionsDuck'

import {
  FavoritesIcon,
  DocumentsIcon,
  SettingsIcon,
  NodeIcon,
  RelationshipIcon
} from 'browser-components/icons/Icons'
import { Drawer, DrawerBody, DrawerHeader } from 'browser-components/drawer'

function Sidebar(props) {
  const openDrawer = props.openDrawer
  const onNavClick = props.onNavClick
  const FavoritesDrawer = () => (
    <Drawer id="db-favorites">
      <DrawerHeader>收藏</DrawerHeader>
      <DrawerBody>
        <Favorites />
      </DrawerBody>
    </Drawer>
  )
  const SearchDrawer = Search
  const NodeDrawer = Node
  const RelationshipDrawer = Relationship
  const SettingsDrawer = Settings
  const topNavItemsList = [
    {
      name: 'Search',
      title: 'Search',
      icon: isOpen => <DocumentsIcon isOpen={isOpen} title="Search" />,
      content: SearchDrawer
    },
    {
      name: 'Node',
      title: 'Node',
      icon: isOpen => <NodeIcon isOpen={isOpen} title="Node" />,
      content: NodeDrawer
    },
    {
      name: 'Relationship',
      title: 'Relationship',
      icon: isOpen => <RelationshipIcon isOpen={isOpen} title="Relationship" />,
      content: RelationshipDrawer
    },
    {
      name: 'Favorites',
      title: 'Favorites',
      icon: isOpen => <FavoritesIcon isOpen={isOpen} title="Favorites" />,
      content: FavoritesDrawer
    },
    {
      name: 'Settings',
      title: 'Settings',
      icon: isOpen => <SettingsIcon isOpen={isOpen} title="Settings" />,
      content: SettingsDrawer
    },
  ]

  return (
    <TabNavigation
      openDrawer={openDrawer}
      onNavClick={onNavClick}
      topNavItems={topNavItemsList}
    />
  )
}

const mapStateToProps = state => {
  let connectionState = 'disconnected'
  if (state.connections) {
    switch (state.connections.connectionState) {
      case PENDING_STATE:
        connectionState = 'pending'
        break
      case CONNECTED_STATE:
        connectionState = 'connected'
        break
      case DISCONNECTED_STATE:
        connectionState = 'disconnected'
        break
    }
  }
  return {
    neo4jConnectionState: connectionState,
  }
}

export default connect(mapStateToProps, null)(Sidebar)
