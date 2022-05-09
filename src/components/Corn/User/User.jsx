import React from 'react';
import './User.scss'
import {Menu, Dropdown, Avatar} from "antd";
import {CaretUpOutlined, UserOutlined} from "@ant-design/icons";

const User = ({username, isMenuCollapsed}) => {
   const menu = (
     <Menu>
        <Menu.Item key={'profile'}>
           <a target="_blank" rel="noopener noreferrer" href="">
              Профиль
           </a>
        </Menu.Item>
        {/*<Menu.Item key={}>*/}
        {/*   <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">*/}
        {/*      Вы*/}
        {/*   </a>*/}
        {/*</Menu.Item>*/}
        <Menu.Item key={'exit'}>
           <a target="_blank" rel="noopener noreferrer" href="">
              Выйти
           </a>
        </Menu.Item>
     </Menu>
   )
   return (
     <div className={'user-menu'}>
        <Dropdown overlay={menu} placement={'topRight'} trigger={'click'}>
           <div>
              <Avatar icon={<UserOutlined/>}/>
              {!isMenuCollapsed ?
                <span className={'user-menu__username user-menu__username--visible'}>{username}</span> :
                <span className={'user-menu__username user-menu__username--collapsed'}>{username}</span>}
              <span className={'user-menu__fake-button'}><CaretUpOutlined/></span>

           </div>

        </Dropdown>
     </div>
   );
};

export {User};
