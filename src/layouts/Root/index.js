import React from 'react';
import { StoreProvider } from '@/store/index';
import Login from 'pages/Login/index';
import App from '../App/index';
import 'assets/styles/app.less';

export default function Root() {
  return (
    <StoreProvider>
      <App></App>
      <Login></Login>
    </StoreProvider>
  );
}
