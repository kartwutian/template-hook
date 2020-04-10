import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Menu } from 'antd';
import {useStore} from '@/store/index'
// import { MenuFoldOutlined } from '@ant-design/icons';
import auth from 'utils/auth';

const { SubMenu } = Menu;

// import style from './style.less';

const renderSubMenu = (route) => {
  if (route.isHideInMenus) return null; // 如果设置了隐藏，则菜单不显示
  if (route.authority && !auth(route.authority)) return null; // 如果有设置权限，则只展示有权限的菜单

  return (
    <SubMenu
      key={route.route}
      title={
        <span>
          <span>{route.name}</span>
        </span>
      }
    >
      {renderMenus(route.routes)}
    </SubMenu>
  );
};

const renderMenuItem = (route) => {
  if (route.isHideInMenus) return null; // 如果设置了隐藏，则菜单不显示
  if (route.authority && !auth(route.authority)) return null; // 如果有设置权限，则只展示有权限的菜单
  return (
    <Menu.Item key={route.route}>
      <Link to={route.route}>{route.name}</Link>
    </Menu.Item>
  );
};

const renderMenus = (routes) => {
  return routes.map((route) => {
    if (route.routes.length) {
      return renderSubMenu(route);
    }
    return renderMenuItem(route);
  });
};

function SiderMenu(){
  const globalStore = useStore('globalModel');
  const history = useHistory();
  const location = useLocation();

  // const handleMenuClick = ({ key }) => {

  //   if (key === '/project') {
  //     history.push(key);
  //   }
  // };

  return (
    <Menu
      defaultSelectedKeys={['/home']}
      selectedKeys={[location.pathname]}
      // defaultOpenKeys={['exchangemgr']}
      mode="inline"
      theme="dark"
      // inlineCollapsed={collapsed}
      // onClick={handleMenuClick}
    >
      {renderMenus(globalStore.router)}
    </Menu>
  );
}

export default observer(SiderMenu);
