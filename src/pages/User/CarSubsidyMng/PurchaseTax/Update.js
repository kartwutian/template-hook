import React, { useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { message } from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { subsidyDetail, subsidyUpdate } from './_service.PurchaseTax.js';
import PurchaseForm from './components/index';
import styles from './Update.less';
import { useHistory, useLocation, Link } from 'react-router-dom';
import qs from 'qs';

function UserCarSubsidyMngPurchaseTaxUpdatePage() {
  const history = useHistory();
  const globalStore = useStore('globalModel');
  const { search } = useLocation();
  const localStore = useLocalStore(() => ({
    detailInfo: {},
    async getDetailInfo(id) {
      try {
        //详情
        const res = await subsidyDetail(id);
        const { data } = res;
        this.detailInfo = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getSubsidyAddVax(values) {
      try {
        //编辑
        const params = {
          ...values,
        };
        const res = await subsidyUpdate(params);
        message.info('编辑成功');
        setTimeout(() => {
          history.push({
            pathname: '/car_subsidy_mng/purchase_tax',
          });
        }, 500);
      } catch (e) {
        console.log(e);
      }
    },
  }));

  // const store = useStore('modelUserCarSubsidyMngPurchaseTaxUpdate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  useEffect(() => {
    //获取详情
    const searchArr = qs.parse(search.split('?')[1]);
    localStore.getDetailInfo(searchArr.id);
  }, []);

  //确定
  const onFinish = (values) => {
    const searchArr = qs.parse(search.split('?')[1]);
    values.applyItemId = searchArr.id;
    globalStore.appEnum.subsidy.map((item, index) => {
      if (item.id === values.typeId) {
        values.type = item.type;
      }
    });
    localStore.getSubsidyAddVax(values);
  };

  return (
    <div styleName="page">
      <PurchaseForm
        detailInfo={localStore.detailInfo}
        handleFinish={onFinish}
      />
    </div>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngPurchaseTaxUpdatePage, styles, {
    allowMultiple: true,
  }),
);
