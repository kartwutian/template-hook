import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
function AdminDistributionPage(props) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const localStore = useLocalStore(() => ({}));
  useEffect(() => {
    console.log(props.visible);
    form.setFieldsValue({
      count: '',
      typeId: props.record.typeId,
    });
  }, [props.visible]);

  // const store = useStore('modelAdminCompanyCreate'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const handleCancel = (e) => {
    props.handleCancel();
  };

  const onFinish = (values) => {
    props.handleAddBT({ ...values, type: props.visible });
  };

  return (
    <>
      <Modal
        title={props.visible === 1 ? '增加补贴名额' : '减少补贴名额'}
        visible={props.visible}
        onOk={form.submit}
        destroyOnClose
        onCancel={handleCancel}
      >
        <Form {...layout} name="basic" onFinish={onFinish} form={form}>
          <Form.Item
            label="补贴类型"
            name="typeId"
            rules={[{ required: true, message: '请选择补贴类型!' }]}
          >
            <Select placeholder="请选择补贴类型" disabled>
              {props.alllist &&
                props.alllist.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="补贴名额数"
            name="count"
            rules={[{ required: true, message: '请输入补贴名额数!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default observer(
  CSSModules(AdminDistributionPage, {
    allowMultiple: true,
  }),
);
