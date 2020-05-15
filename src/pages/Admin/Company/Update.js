import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { Card } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { message } from 'antd';
import {} from './_service.Company.js';
import AdminCompanyOperatePage from './components/Operate';
import {
  getDetail,
  getTypeList,
  edit,
} from '@/pages/Admin/Company/_service.Company';

import styles from './Create.less';

function AdminCompanyUpdatePage() {
  const history = useHistory();
  const url = history.location.search;
  const id = url.split('?id=')[1];
  useEffect(() => {
    getInfoDetail();
    getList();
  }, []);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [alllist, setAllList] = useState([]);
  const [values, setValues] = useState({});

  const getInfoDetail = async () => {
    try {
      setLoading(true);
      const res = await getDetail({
        id,
      });
      if (res.code === '000000') {
        setValues({ ...res.data.reqNerchantEditVO });
        setList(res.data.stockVOS);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const res = await getTypeList({});
      if (res.code === '000000') {
        setAllList(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const store = useStore('modelAdminCompanyCreate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);
  const handleSubmitBasicInfo = async (values) => {
    try {
      setLoading(true);
      const res = await edit({
        ...values,
        id,
      });
      if (res.code === '000000') {
        message
          .success('保存成功！', 1)
          .then(() => history.push('/company/list'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(values);
  return (
    <>
      <AdminCompanyOperatePage
        handleSubmitBasicInfo={handleSubmitBasicInfo}
        getInfoDetail={getInfoDetail}
        edit={true}
        list={list}
        alllist={alllist}
        values={values}
      />
    </>
  );
}

export default observer(
  CSSModules(AdminCompanyUpdatePage, styles, {
    allowMultiple: true,
  }),
);
