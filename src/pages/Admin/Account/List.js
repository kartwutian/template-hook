import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
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
} from 'antd';
import { useStore } from '@/store/index';

import styles from './List.less';

const { Search } = Input;
const { Option } = Select;

function AdminAccountListPage() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});

  useEffect(() => {
    form.setFieldsValue({ username: record.username });
  }, [visible, record]);
  const localStore = useLocalStore(() => ({
    list: [{ id: 1, username: 'asdasd', password: '13123' }],
  }));

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const columns = [
    {
      title: '账号',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '联系人',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所属商家',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '负责人',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '状态',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '创建人',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm
            title="确认要停用吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={prohibit}
          >
            <a>停用</a>
          </Popconfirm>

          <Divider type="vertical" />
          <a
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认要删除吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={handleDelete}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // const store = useStore('modelAdminAccountList'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleOk = (values) => {
    console.log('Success:', values);
  };

  const prohibit = (e) => {
    console.log(e);
  };

  const handleDelete = (e) => {
    console.log(e);
  };

  return (
    <>
      <Modal
        title={record.id ? '编辑账号' : '新增账号'}
        visible={visible}
        onOk={form.submit}
        destroyOnClose
        onCancel={handleCancel}
      >
        <Form {...layout} name="basic" onFinish={handleOk} form={form}>
          <Form.Item
            label="账号名"
            name="username"
            rules={[{ required: true, message: '请输入账号名!' }]}
          >
            <Input placeholder="请输入账号名" />
          </Form.Item>

          <Form.Item
            label="初始化密码"
            name="password"
            rules={[{ required: true, message: '请输入初始化密码!' }]}
          >
            <Input placeholder="请输入初始化密码" />
          </Form.Item>
          <Form.Item
            label="联系人"
            name="concat"
            rules={[{ required: true, message: '请输入联系人!' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="所属商家"
            name="dianjia"
            rules={[{ required: true, message: '请选择所属商家!' }]}
          >
            <Select placeholder="请选择所属商家">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="负责人"
            name="fuze"
            rules={[{ required: true, message: '请输入负责人!' }]}
          >
            <Input placeholder="请输入负责人" />
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <Row
          style={{
            marginBottom: 16,
          }}
        >
          <Search
            placeholder="请输入账号名/手机号/商家名称关键字进行搜索"
            onSearch={(value) => console.log(value)}
            style={{ width: 400 }}
          />
        </Row>
        <Row
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              setRecord({});
            }}
          >
            新增账号
          </Button>
        </Row>

        <Table columns={columns} dataSource={localStore.list} />
      </Card>
    </>
  );
}

export default observer(
  CSSModules(AdminAccountListPage, styles, {
    allowMultiple: true,
  }),
);
