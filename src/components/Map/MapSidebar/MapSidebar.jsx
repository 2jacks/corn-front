import React from 'react'
import './MapSidebar.css'

import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Sider } = Layout

const MapSidebar = ({ currentAside, onToggleMenu, isMenuCollapsed }) => {
  let asides = {
    fields: {
      header: 'Поля',
      body: 'Поля',
    },
    seasons: {
      header: 'Сезоны',
      body: 'Сезоны',
    },
    stats: {
      header: 'Статистика',
      body: 'Статистика',
    },
  }
  return (
    <Sider width={300} theme={'light'}>
      <div className="map-aside">
        <header className="map-aside__header">
          {React.createElement(
            isMenuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger map-aside__collapse-trigger',
              onClick: onToggleMenu,
            }
          )}
          {asides[currentAside].header}
        </header>
        <hr />
        <div className="map-aside__body">{asides[currentAside].body}</div>
      </div>
    </Sider>
  )
}

export { MapSidebar }
