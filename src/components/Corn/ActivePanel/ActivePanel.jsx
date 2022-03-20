import React from 'react'
import './ActivePanel.css'

import {Layout} from 'antd'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import {FieldsList} from "./FieldsList/FieldsList";

const {Sider} = Layout

const ActivePanel = ({currentPanel, onToggleMenu, isMenuCollapsed}) => {

   let panel = {}
   if (currentPanel === 'fields') {
      panel.header = 'Поля'
      panel.content = <FieldsList/>
   }

   return (
     <div className="active-panel">
        <header className="active-panel__header">
           {React.createElement(
             isMenuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
             {
                className: 'trigger active-panel__collapse-trigger',
                onClick: onToggleMenu,
             }
           )}
           {panel.header}
        </header>
        <hr/>
        <div className="active-panel__body">
           {panel.content}
        </div>
     </div>

   )
}

export {ActivePanel}
