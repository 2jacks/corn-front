import React from 'react'
import "./CornMenu.scss"
import {
   AuditOutlined,
   BuildOutlined,
   CalendarOutlined, UserOutlined,
} from '@ant-design/icons'
import {Menu, Avatar} from 'antd'

const CornMenu = ({onSelect}) => {

   return (
     <Menu theme="dark" mode="inline" defaultSelectedKeys={['researches']}>
        {/*<Menu.Item key="seasons" icon={<CalendarOutlined/>} onClick={onSelect}>*/}
        {/*   Сезоны*/}
        {/*</Menu.Item>*/}
        <Menu.Item key="researches" icon={<BuildOutlined/>} onClick={onSelect}>
           Исследования
        </Menu.Item>
     </Menu>
   )
}

export {CornMenu}
