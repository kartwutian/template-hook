import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import {
  Card,
  Table,
  Tag,
  Button,
  Row,
  Input,
  Modal,
  Form,
  Select,
  Divider,
  Popconfirm,
  DatePicker,
} from 'antd';
import { useStore } from '@/store/index';
import moment from 'moment';
import { getList, getdetailInfo } from '@/pages/Admin/Company/_service.Company';

import styles from './List.less';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

function AdminCompanyListPage() {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [type, setType] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => {
    getCompanyList();
  }, [keyword, pageNum, type, startTime, endTime]);

  const getCompanyList = async () => {
    try {
      setLoading(true);
      const res = await getList({
        keyword,
        pageNum,
        pageSize: 10,
        type,
        startTime,
        endTime,
      });
      if (res.code === '000000') {
        setData(res.page);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '商家名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'socialCreditCode',
      key: 'socialCreditCode',
    },
    {
      title: '企业类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      key: 'principal',
    },
    {
      title: '负责人联系方式',
      dataIndex: 'principalPhone',
      key: 'principalPhone',
    },
    {
      title: '联络人',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: '联络人联系方式',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => (
        <div>{text && moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      ),
    },
    // {
    //   title: '补贴信息',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text, record) => (
    //     <Button size="small" onClick={() => subsidyInfo(text, record.name)}>
    //       查看补贴信息
    //     </Button>
    //   ),
    // },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              history.push(`/company/update?id=${record.id}`);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          {/*<Popconfirm*/}
          {/*title="确认要删除吗？"*/}
          {/*okText="确认"*/}
          {/*cancelText="取消"*/}
          {/*onConfirm={handleDelete}*/}
          {/*>*/}
          {/*<a>删除</a>*/}
          {/*</Popconfirm>*/}
        </span>
      ),
    },
  ];

  const subsidyInfo = async (id, name) => {
    try {
      setLoading(true);
      const res = await getdetailInfo({
        id,
      });
      if (res.code === '000000') {
        setList(res.data);
        setVisible(name);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const infoColumns = [
    {
      title: '补贴名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '补贴名额数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '已申请补贴名额数',
      dataIndex: 'applyCount',
      key: 'applyCount',
    },
    {
      title: '当前可用补贴名额',
      dataIndex: 'residueCount',
      key: 'residueCount',
    },
  ];

  const handleDelete = (e) => {
    console.log(e);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setType(value);
    setPageNum(1);
  };

  const createDate = (dates, dateStrings) => {
    setPageNum(1);
    setStartTime(
      dateStrings && moment(dateStrings[0]).startOf('day').valueOf(),
    );
    setEndTime(dateStrings && moment(dateStrings[1]).endOf('day').valueOf());
  };

  // const store = useStore('modelAdminCompanyList'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  return (
    <>
      <Modal
        title="查看补贴信息"
        visible={visible}
        footer={null}
        width={600}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <p style={{ paddingLeft: 16 }}>{visible}</p>
        <Table
          columns={infoColumns}
          dataSource={list}
          loading={loading}
          pagination={false}
        />
      </Modal>
      <Card>
        <Row style={{}}>
          <Search
            placeholder="请输入商家名称/统一信用证代码/负责人/负责人联系方式/联络人/地址关键字进行搜索"
            onSearch={(value) => {
              setKeyword(value);
              setPageNum(1);
            }}
            style={{ width: 650, marginBottom: 16, marginRight: 24 }}
          />
          <Select
            style={{ width: 220, marginBottom: 16, marginRight: 24 }}
            onChange={handleChange}
            allowClear
            placeholder="请选择企业类型"
          >
            <Option value={1}>限上企业</Option>
            <Option value={2}>非限上企业</Option>
          </Select>
          <div style={{ marginBottom: 16, marginRight: 24 }}>
            <span>创建时间：</span>
            <RangePicker onChange={createDate} allowClear />
          </div>
        </Row>
        {/*<Row*/}
        {/*style={{*/}
        {/*marginBottom: 16,*/}
        {/*}}*/}
        {/*>*/}
        {/*<Button*/}
        {/*type="primary"*/}
        {/*onClick={() => {*/}
        {/*history.push('/company/create');*/}
        {/*}}*/}
        {/*>*/}
        {/*新增商家名单*/}
        {/*</Button>*/}
        {/*</Row>*/}

        <Table
          columns={columns}
          dataSource={data.list || []}
          loading={loading}
          pagination={
            data.list && data.list.length
              ? {
                  total: data.total,
                  current: data.current,
                  pageSize: data.pageSize,
                  onChange: (pageNum, pageSize) => {
                    setPageNum(pageNum);
                  },
                }
              : false
          }
        />
      </Card>
    </>
  );
}

export default observer(
  CSSModules(AdminCompanyListPage, styles, {
    allowMultiple: true,
  }),
);
