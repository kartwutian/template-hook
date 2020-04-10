import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Tooltip, Dropdown, Menu } from 'antd';
import {
  MenuFoldOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import SiderMenu from './SiderMenu';

import loginUtil from 'utils/login';

import styles from './index.less';

const { Header, Sider, Content, Footer } = Layout;

const App = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const userInfo = loginUtil.getUserInfo() || {};
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
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = () => {};

  return (
    <Layout>
      <Sider styleName="app-layout__sider">
        <SiderMenu></SiderMenu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="https://ywinvesttest.zjbdos.com/static-resource/wb-uni-pro/"
              rel="noopener noreferrer"
              title="使用文档"
            >
              <QuestionCircleOutlined />
            </a>
          </Tooltip>
          <Dropdown overlay={menu}>
            <span>
              {/* <Avatar
                    size="small"
                    styleName="avatar"
                    // src={userInfo.avatar}
                    // src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt="avatar"
                  /> */}
              <span>{userInfo.name}</span>
            </span>
          </Dropdown>
        </Header>
        <Content>
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
