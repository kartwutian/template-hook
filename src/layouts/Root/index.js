import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import { StoreProvider } from '@/store/index';
import AppRouter from './AppRouter';
import Login from 'pages/Login/index';
import App from '../App/index';

import 'assets/styles/app.less';

export default function Root() {
  return (
    <StoreProvider>
      <ConfigProvider locale={zh_CN}>
        <AppRouter />
        <App></App>
        <Login></Login>
      </ConfigProvider>
    </StoreProvider>
  );
}
