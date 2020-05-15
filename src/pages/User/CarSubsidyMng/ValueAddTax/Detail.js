import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {} from 'antd';
import { useStore } from '@/store/index';
import { useLocation } from 'react-router-dom';
import { delay } from 'utils/helper';
import {} from './_service.ValueAddTax.js';
import CommonDetail from '@/components/Detail/index';
import { getDetail } from '@/pages/Admin/CarSubsidyReview/ValueAddTax/_service.ValueAddTax';
import qs from 'qs';

import styles from './Detail.less';

function UserCarSubsidyMngValueAddTaxDetailPage() {
  const { search } = useLocation();
  const [detailDate, setDetail] = useState({});
  const localStore = useLocalStore(() => ({}));

  // const store = useStore('modelUserCarSubsidyMngValueAddTaxDetail'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);
  useEffect(() => {
    const applyItem = qs.parse(search.split('?')[1]);
    initDetail(applyItem.id);
  }, []);

  const initDetail = async (id) => {
    try {
      const params = {
        applyItemId: id,
      };
      const { data } = await getDetail(params);
      setDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div styleName="page">
      <CommonDetail data={detailDate} type="valueAdd" />
    </div>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngValueAddTaxDetailPage, styles, {
    allowMultiple: true,
  }),
);
