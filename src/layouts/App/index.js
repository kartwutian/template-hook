import React from 'react';
import CSSModules from 'react-css-modules';
import { observer } from 'mobx-react';
import { Layout } from 'antd';

import styles from './index.less';

const App = () => {
  return <Layout>123</Layout>;
};

export default observer(CSSModules(App, styles));
