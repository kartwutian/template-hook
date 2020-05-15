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
import { getTypeList, add } from '@/pages/Admin/Company/_service.Company';

import styles from './Create.less';

function AdminCompanyCreatePage() {
  const history = useHistory();
  useEffect(() => {
    getList();
  }, []);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [arr, setArr] = useState([]);

  const getList = async () => {
    try {
      setLoading(true);
      const res = await getTypeList({});
      if (res.code === '000000') {
        setList(res.data);
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
    const newArr = [];
    list.map((item) => {
      newArr.push({
        typeId: item.id,
        name: item.name,
        count: item.count || 0,
      });
    });
    try {
      setLoading(true);
      const res = await add({
        ...values,
        stockVOS: arr.length ? arr : newArr,
      });
      if (res.code === '000000') {
        message
          .success('新增成功！', 1)
          .then(() => history.push('/company/list'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeInput = (value, id) => {
    const arr = [];
    list.map((item) => {
      if (item.id === id) {
        item.count = value;
      }
      arr.push({
        typeId: item.id,
        name: item.name,
        count: item.count || 0,
      });
    });
    setArr(arr);
  };

  return (
    <>
      <AdminCompanyOperatePage
        handleSubmitBasicInfo={handleSubmitBasicInfo}
        list={list}
        handleChangeInput={handleChangeInput}
      />
    </>
  );
}

export default observer(
  CSSModules(AdminCompanyCreatePage, styles, {
    allowMultiple: true,
  }),
);
