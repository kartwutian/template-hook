import React, { useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { message } from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { subsidyDetail, subsidyUpdate } from './_service.ValueAddTax.js';
import ValueForm from './components/index';
import { useHistory, useLocation, Link } from 'react-router-dom';
import styles from './Update.less';
import qs from 'qs';

function UserCarSubsidyMngValueAddTaxUpdatePage() {
  const globalStore = useStore('globalModel');
  const history = useHistory();
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
    async getSubsidyUpdataVax(values) {
      try {
        //编辑
        const params = {
          ...values,
        };
        const res = await subsidyUpdate(params);
        message.info('编辑成功');
        setTimeout(() => {
          history.push({
            pathname: '/car_subsidy_mng/value_add_tax',
          });
        }, 500);
      } catch (e) {
        console.log(e);
      }
    },
  }));

  // const store = useStore('modelUserCarSubsidyMngValueAddTaxUpdate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  useEffect(() => {
    const searchArr = qs.parse(search.split('?')[1]);
    localStore.getDetailInfo(searchArr.id);
  }, []);

  //编辑
  const onFinish = (values) => {
    const searchArr = qs.parse(search.split('?')[1]);
    values.applyItemId = searchArr.id;
    globalStore.appEnum.subsidy.map((item, index) => {
      if (item.id === values.typeId) {
        values.type = item.type;
      }
    });
    localStore.getSubsidyUpdataVax(values);
  };

  return (
    <div styleName="page">
      <ValueForm detailInfo={localStore.detailInfo} handleFinish={onFinish} />
    </div>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngValueAddTaxUpdatePage, styles, {
    allowMultiple: true,
  }),
);
