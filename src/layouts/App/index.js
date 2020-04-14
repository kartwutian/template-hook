import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Tooltip, Dropdown, Menu, PageHeader } from 'antd';
import {
  MenuFoldOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useStore } from '@/store/index';
import SiderMenu from './SiderMenu';

import styles from './index.less';

const { Header, Sider, Content, Footer } = Layout;

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const globalStore = useStore('globalModel');
  const menu = (
    <Menu className="user-menu" selectedKeys={[]} onClick={handleMenuClick}>
      <Menu.Item key="userCenter">
        <Link to="/">
          <UserAddOutlined />
          个人中心
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="userinfo">
        <Link to="/">
          <SettingOutlined />
          个人设置
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        onClick={() => {
          history.push('/logout');
          globalStore.logout();
        }}
      >
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = () => {};

  const getBreadData = () => {
    const { pathname } = location;
    const { router } = globalStore;
    const curPathArr = pathname.split('/').slice(1);
    console.log(curPathArr);
    let curRouter = router;
    const breads = [];
    curPathArr.reduce((prefix, next) => {
      prefix = `${prefix}/${next}`;
      console.log(prefix);
      const curItem = curRouter.find((item) => item.route === prefix);
      console.log(curItem);
      if (curItem) {
        breads.push(curItem);
        curRouter = curItem.routes;
      }
      return prefix;
    }, '');
    return breads;
  };

  const renderSubHeader = () => {
    const sourceData = getBreadData();
    console.log(sourceData);
    const routes =
      sourceData.length > 1
        ? sourceData.map((item) => {
            return {
              path: item.path ? item.route : './',
              breadcrumbName: item.name,
            };
          })
        : [];
    const curRoute = sourceData[sourceData.length - 1];

    return sourceData.length && curRoute.hasBread ? (
      <PageHeader
        ghost={false}
        title={curRoute && curRoute.name}
        breadcrumb={{ routes }}
        subTitle={curRoute.subTitle || ''}
      />
    ) : null;
  };

  return (
    <Layout styleName="app-layout">
      <Sider collapsed={collapsed}>
        <SiderMenu collapsed={collapsed}></SiderMenu>
      </Sider>
      <Layout>
        <Header>
          <div styleName="header-item">
            {collapsed ? (
              <MenuUnfoldOutlined
                styleName="icon-size--primary"
                onClick={() => {
                  console.log(1);
                  setCollapsed(false);
                }}
              />
            ) : (
              <MenuFoldOutlined
                styleName="icon-size--primary"
                onClick={() => {
                  console.log(2);
                  setCollapsed(true);
                }}
              />
            )}
            {collapsed}
          </div>
          <div styleName="header-item--main"></div>
          <div styleName="header-item">
            <Tooltip title="使用文档">
              <a
                target="_blank"
                href="https://ywinvesttest.zjbdos.com/static-resource/wb-uni-pro/"
                rel="noopener noreferrer"
                title="使用文档"
              >
                <QuestionCircleOutlined styleName="icon-size--primary" />
              </a>
            </Tooltip>
          </div>

          <div styleName="header-item">
            <Dropdown overlay={menu}>
              <span>
                {/* <Avatar
                      size="small"
                      styleName="avatar"
                      // src={userInfo.avatar}
                      // src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                      alt="avatar"
                    /> */}
                <span>{globalStore.USER_INFO.name}</span>
              </span>
            </Dropdown>
          </div>
        </Header>

        <Content>
          {renderSubHeader()}
          <div styleName="app-layout__content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          万博大数据 ©2020 Created by XX
        </Footer>
      </Layout>
    </Layout>
  );
};

export default observer(
  CSSModules(App, styles, {
    allowMultiple: true,
  }),
);
