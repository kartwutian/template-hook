import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import { StoreProvider } from '@/store/index';
import AppRouter from './AppRouter';

import 'assets/styles/app.less';
import 'assets/styles/animate.css';

export default function Root() {
  return (
    <StoreProvider>
      <ConfigProvider locale={zh_CN}>
        <AppRouter />
      </ConfigProvider>
    </StoreProvider>
  );
}
