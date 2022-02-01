import React, { useState } from 'react'
import './App.css'

import { Layout } from 'antd'

import { Map } from './components/Map/Map'
import { CornMenu } from './components/CornMenu/CornMenu'
import { MapSidebar } from './components/Map/MapSidebar/MapSidebar'

const { Sider, Content } = Layout

const App = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const [currentAside, setCurrentAside] = useState('fields')

  const onToggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed)
  }
  const onSelectMenu = (e) => {
    setCurrentAside(e.key)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
        <CornMenu onSelect={onSelectMenu} />
      </Sider>

      <Layout className="site-layout">
        <MapSidebar
          isMenuCollapsed={isMenuCollapsed}
          onToggleMenu={onToggleMenu}
          currentAside={currentAside}
        />
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
            background: '#FFF',
          }}
        >
          <Map />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
