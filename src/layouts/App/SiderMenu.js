import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import { Menu } from 'antd';
import WbIcon from 'components/WbIcon/index';

import { useStore } from '@/store/index';

// import { MenuFoldOutlined } from '@ant-design/icons';
import auth from 'utils/auth';
import fetchMenusRouter, { queryRouteNode } from 'utils/fetchMenusRouter';

const { SubMenu } = Menu;

// import style from './style.less';

const renderSubMenu = (route) => {
  return (
    <SubMenu
      key={route.route}
      title={
        <span>
          {route.icon ? <WbIcon type={route.icon}></WbIcon> : null}
          <span>{route.name}</span>
        </span>
      }
    >
      {renderMenus(route.routes)}
    </SubMenu>
  );
};

const renderMenuItem = (route) => {
  return (
    <Menu.Item key={route.route}>
      <Link to={route.route}>
        {route.icon ? <WbIcon type={route.icon}></WbIcon> : null}
        <span>{route.name}</span>
      </Link>
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

function SiderMenu(props) {
  const { collapsed } = props;
  const globalStore = useStore('globalModel');
  const history = useHistory();
  const location = useLocation();
  console.log(collapsed);
  console.log('-------------------------');
  const menusRouter = fetchMenusRouter(globalStore.router);
  console.log(menusRouter);

  // const localStore = useLocalStore(() => ({}));

  const menuNode = queryRouteNode(menusRouter, location.pathname);
  // console.log(location.pathname);
  // console.log(menuNode);
  if (menuNode && menuNode.route !== globalStore.MENU_SELECTKEYS[0]) {
    globalStore.commit({
      MENU_SELECTKEYS: [menuNode.route],
    });
  }
  // const handleMenuClick = ({ key }) => {

  //   if (key === '/project') {
  //     history.push(key);
  //   }
  // };

  return (
    <Menu
      defaultOpenKeys={[menusRouter[0].route]}
      defaultSelectedKeys={['/home']}
      selectedKeys={globalStore.MENU_SELECTKEYS}
      // defaultOpenKeys={['exchangemgr']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      // onClick={handleMenuClick}
    >
      {renderMenus(menusRouter)}
    </Menu>
  );
}

export default observer(SiderMenu);
