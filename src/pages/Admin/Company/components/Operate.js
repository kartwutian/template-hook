import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  message,
} from 'antd';
import { useStore } from '@/store/index';
import { reduceOrAdd } from '@/pages/Admin/Company/_service.Company';
import { delay } from 'utils/helper';
import Distribution from './Distribution';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
function AdminCompanyOperatePage(props) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  useEffect(() => {
    if (props.values) {
      form.setFieldsValue({
        name: props.values.name,
        socialCreditCode: props.values.socialCreditCode,
        principal: props.values.principal,
        principalPhone: props.values.principalPhone,
        contactName: props.values.contactName,
        contactPhone: props.values.contactPhone,
        type: props.values.type,
        address: props.values.address,
      });
    }
  }, [props.values]);
  // const store = useStore('modelAdminCompanyCreate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 12 },
  };

  const onFinish = (values) => {
    props.handleSubmitBasicInfo(values);
  };

  const columns = props.edit
    ? [
        {
          title: '补贴名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '补贴名额数',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '当前可用补贴名额',
          dataIndex: 'residueCount',
          key: 'residueCount',
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          render: (text, record) => (
            <div>
              <a
                onClick={() => {
                  setVisible(1);
                  setRecord(record);
                }}
              >
                增加名额
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setRecord(record);
                  setVisible(2);
                }}
              >
                减少名额
              </a>
            </div>
          ),
        },
      ]
    : [
        {
          title: '补贴名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '补贴名额数',
          dataIndex: 'countTheory',
          key: 'countTheory',
          render: (text, record) => (
            <div>
              <InputNumber
                min={0}
                defaultValue={0}
                onChange={(value) => handleChangeInputNumber(value, record.id)}
              />
              <span style={{ marginLeft: 25 }}>
                当前剩余名额数: <span style={{ color: 'red' }}>{text}</span>个
              </span>
            </div>
          ),
        },
      ];

  const handleChangeInputNumber = (value, id) => {
    props.handleChangeInput(value, id);
  };

  const handleAddBT = async (values) => {
    try {
      const res = await reduceOrAdd({
        ...values,
        id: props.values && props.values.id,
      });
      if (res.code === '000000') {
        message.success('操作成功', 1).then(() => {
          setVisible(false);
          props.getInfoDetail();
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <Card title="企业基本信息" style={{ marginBottom: 20 }}>
        <Form {...layout} name="basic" form={form} onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item
                label="商家名称"
                name="name"
                rules={[{ required: true, message: '请输入汽车销售企业名称!' }]}
              >
                <Input placeholder="请输入汽车销售企业名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="统一社会信用代码" name="socialCreditCode">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="负责人"
                name="principal"
                rules={[{ required: true, message: '请输入姓名!' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="负责人联系方式"
                name="principalPhone"
                rules={[{ required: true, message: '请输入手机号或座机!' }]}
              >
                <Input placeholder="请输入手机号或座机" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="联系人"
                name="contactName"
                rules={[{ required: true, message: '请输入姓名!' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="联系人联系方式（登录名）"
                name="contactPhone"
                rules={[{ required: true, message: '请输入手机号或座机!' }]}
              >
                <Input placeholder="请输入手机号或座机" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="企业类型"
                name="type"
                rules={[{ required: true, message: '请选择企业类型!' }]}
              >
                <Select placeholder="请选择企业类型">
                  <Option value={1}>限上企业</Option>
                  <Option value={2}>非限上企业</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="经营地址"
                name="address"
                rules={[{ required: true, message: '请输入经营地址!' }]}
              >
                <Input placeholder="请输入经营地址" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      {/*<Card*/}
      {/*title={*/}
      {/*<div style={{ display: 'flex', alignItems: 'center' }}>*/}
      {/*<div style={{ marginRight: 30 }}>补贴信息</div>*/}
      {/*/!*<Button*!/*/}
      {/*/!*type="primary"*!/*/}
      {/*/!*icon={<PlusOutlined />}*!/*/}
      {/*/!*onClick={() => {*!/*/}
      {/*/!*setVisible(true);*!/*/}
      {/*/!*}}*!/*/}
      {/*/!*>*!/*/}
      {/*/!*分配补贴名额*!/*/}
      {/*/!*</Button>*!/*/}
      {/*</div>*/}
      {/*}*/}
      {/*>*/}
      {/*<Table dataSource={props.list} columns={columns} pagination={false} />*/}
      {/*</Card>*/}
      {/*<Card style={{ marginTop: 20, textAlign: 'right' }}>*/}
      {/*<Button type="primary" onClick={form.submit}>*/}
      {/*保存*/}
      {/*</Button>*/}
      {/*</Card>*/}
      {/*<Distribution*/}
      {/*visible={visible}*/}
      {/*handleCancel={() => setVisible(false)}*/}
      {/*handleAddBT={handleAddBT}*/}
      {/*record={record}*/}
      {/*alllist={props.alllist}*/}
      {/*/>*/}
    </>
  );
}

export default observer(
  CSSModules(AdminCompanyOperatePage, {
    allowMultiple: true,
  }),
);
