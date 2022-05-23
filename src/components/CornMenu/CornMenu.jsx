import React, {useState} from 'react'
import "./CornMenu.scss"
import {
   AuditOutlined,
   BuildOutlined,
   CalendarOutlined, DoubleLeftOutlined, DoubleRightOutlined, UserOutlined,
} from '@ant-design/icons'
import {Menu, Avatar} from 'antd'
import {User} from "../User/User";
import {useSelector} from "react-redux";
import {Layout} from "antd";

const {Sider} = Layout

const CornMenu = ({sections, onSelect}) => {
   const user = useSelector(state => state.user)

   const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
   const onToggleMenu = () => {
      setIsMenuCollapsed(!isMenuCollapsed)
   }

   let menuItems = [];
   for (let key in sections) {
      menuItems.push(
        <Menu.Item key={key} icon={sections[key].menuIcon} onClick={onSelect}>{sections[key].header}</Menu.Item>)
   }

   return (
     <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['researches']}>
           {menuItems}
           {isMenuCollapsed ?
             <DoubleRightOutlined className="trigger corn-menu__collapse-trigger" onClick={onToggleMenu}/> :
             <DoubleLeftOutlined className="trigger corn-menu__collapse-trigger" onClick={onToggleMenu}/>
           }
        </Menu>
        <User username={user.username || 'Гость'} isMenuCollapsed={isMenuCollapsed}/>
     </Sider>


   )
}

export {CornMenu}
