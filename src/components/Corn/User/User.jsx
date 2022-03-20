import React from 'react';
import './User.scss'
import {Menu, Dropdown, Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const User = ({username, isMenuCollapsed}) => {
   const menu = (
     <Menu>
        <Menu.Item>
           <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
           </a>
        </Menu.Item>
        <Menu.Item>
           <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
           </a>
        </Menu.Item>
        <Menu.Item>
           <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
           </a>
        </Menu.Item>
     </Menu>
   )
   return (
     <div className={'user-menu'}>
        <Dropdown overlay={menu} placement={'topRight'}>
           <div>
              <Avatar icon={<UserOutlined/>}/>
              {!isMenuCollapsed ? <span className={'user-menu__username'}>{username}</span> : null}
           </div>
        </Dropdown>
     </div>
   );
};

export {User};
