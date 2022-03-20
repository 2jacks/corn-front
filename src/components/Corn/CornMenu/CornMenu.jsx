import React from 'react'
import {
   AuditOutlined,
   BuildOutlined,
   CalendarOutlined, UserOutlined,
} from '@ant-design/icons'
import {Menu, Avatar} from 'antd'

const CornMenu = ({onSelect}) => {
   return (
     <Menu theme="dark" mode="inline" defaultSelectedKeys={['fields']}>
        {/*<Menu.Item key="seasons" icon={<CalendarOutlined/>} onClick={onSelect}>*/}
        {/*   Сезоны*/}
        {/*</Menu.Item>*/}
        <Menu.Item key="fields" icon={<BuildOutlined/>} onClick={onSelect}>
           Поля
        </Menu.Item>
        {/*<Menu.Item key="stats" icon={<AuditOutlined/>} onClick={onSelect}>*/}
        {/*   Статистика*/}
        {/*</Menu.Item>*/}
     </Menu>
   )
}

export {CornMenu}
