import React from 'react';
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
import { subsidyAddVax } from './_service.ValueAddTax.js';
const { Option } = Select;
import styles from './Create.less';
import ValueForm from './components/index';
// import { Row } from 'node_modules/antd/lib/index.js';

function UserCarSubsidyMngValueAddTaxCreatePage() {
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
            pathname: '/car_subsidy_mng/value_add_tax',
          });
        }, 500);
      } catch (e) {
        console.error(e);
      }
    },
  }));

  // const store = useStore('modelUserCarSubsidyMngValueAddTaxCreate'); // 注意store里面的数据不要使用解构赋值
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

  const handleChange = (info) => {
    console.log(info);
  };

  return (
    <div styleName="page">
      <ValueForm handleFinish={onFinish} />
    </div>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngValueAddTaxCreatePage, styles, {
    allowMultiple: true,
  }),
);
