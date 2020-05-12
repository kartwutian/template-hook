import React from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {} from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import {} from './_service.Company.js';

import styles from './Update.less';

function AdminCompanyUpdatePage() {
  const localStore = useLocalStore(() => ({}));

  // const store = useStore('modelAdminCompanyUpdate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  return (
    <div styleName="page">
      <p>AdminCompanyUpdatePage</p>
    </div>
  );
}

export default observer(
  CSSModules(AdminCompanyUpdatePage, styles, {
    allowMultiple: true,
  }),
);
