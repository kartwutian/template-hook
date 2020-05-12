import React from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {} from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import {} from './_service.Settings.js';

import styles from './PasswordChange.less';

function SettingsPasswordChangePage() {
  const localStore = useLocalStore(() => ({}));

  // const store = useStore('modelSettingsPasswordChange'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  return (
    <div styleName="page">
      <p>SettingsPasswordChangePage</p>
    </div>
  );
}

export default observer(
  CSSModules(SettingsPasswordChangePage, styles, {
    allowMultiple: true,
  }),
);
