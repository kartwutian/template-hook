import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  Input,
  Upload,
  Button,
  message,
} from 'antd';
import { useStore } from '@/store/index';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { delay } from 'utils/helper';
import { subsidyAddVax } from './_service.PurchaseTax.js';
const { Option } = Select;
import styles from './Create.less';
import PurchaseForm from './components/index';

function UserCarSubsidyMngPurchaseTaxCreatePage() {
  const [form] = Form.useForm();
  const history = useHistory();
  const globalStore = useStore('globalModel');
  const localStore = useLocalStore(() => ({
    async getSubsidyAddVax(values) {
      try {
        const params = {
          ...values,
        };
        const res = await subsidyAddVax(params);
        message.info('添加成功');
        setTimeout(() => {
          history.push({
            pathname: '/car_subsidy_mng/purchase_tax',
          });
        }, 500);
      } catch (e) {
        console.error(e);
      }
    },
  }));

  // const store = useStore('modelUserCarSubsidyMngPurchaseTaxCreate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  //确定
  const onFinish = (values) => {
    globalStore.appEnum.subsidy.map((item, index) => {
      if (item.id === values.typeId) {
        values.type = item.type;
      }
    });
    localStore.getSubsidyAddVax(values);
  };

  return (
    <div styleName="page">
      <PurchaseForm handleFinish={onFinish} />
    </div>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngPurchaseTaxCreatePage, styles, {
    allowMultiple: true,
  }),
);
