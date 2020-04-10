import React from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {} from 'antd';
import { useStore } from '@/store/index';

import styles from './List.less';

function ProjectListPage() {
  // const localStore = useLocalStore(() => ({
  // }));

  const store = useStore('modelProjectList'); // 注意store里面的数据不要使用解构赋值
  console.log(store);

  return (
    <div>
      <p>{store.name}</p>
    </div>
  );
}

export default observer(CSSModules(ProjectListPage, styles));
