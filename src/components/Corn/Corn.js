import React, { useEffect, useState } from 'react'

import { Layout } from 'antd'
import { Map } from './Map/Map'
import { CornMenu } from './CornMenu/CornMenu'
import { MapSidebar } from './Map/MapSidebar/MapSidebar'
import { verifyUser } from '../../api/user'
import { useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout

const Corn = () => {
  const navigate = useNavigate()

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const [currentAside, setCurrentAside] = useState('fields')

  const onToggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed)
  }
  const onSelectMenu = (e) => {
    setCurrentAside(e.key)
  }

  function checkUser(data) {
    let access = window.sessionStorage.getItem('access_token')
    verifyUser(access)
      .then((res) => {
        console.log('token is fresh')
      })
      // Перенести catch в api?
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
  }

  useEffect(() => {
    checkUser()
  }, [])

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

export { Corn }
