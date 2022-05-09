import React from 'react'
import './ActivePanel.scss'

import {Layout} from 'antd'
import {
   DoubleLeftOutlined, DoubleRightOutlined
} from '@ant-design/icons'
import {FieldsList} from "./FieldsList/FieldsList";

const {Sider} = Layout

const ActivePanel = ({currentPanel, onToggleMenu, isMenuCollapsed}) => {

   let panel = {}
   if (currentPanel === 'researches') {
      panel.header = 'Исследования'
      panel.content = <FieldsList/>
   }

   return (
     <div className="active-panel">
        <header className="active-panel__header">

           {panel.header}
        </header>
        <hr/>
        <div className="active-panel__body">
           {React.createElement(
             isMenuCollapsed ? DoubleRightOutlined : DoubleLeftOutlined,
             {
                className: 'trigger active-panel__collapse-trigger',
                onClick: onToggleMenu,
             }
           )}
           {panel.content}
        </div>
     </div>

   )
}

export {ActivePanel}
