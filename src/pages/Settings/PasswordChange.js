import React, { useRef } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { Button, Form, Input, Card, message } from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { updatePwd } from './_service.Settings.js';

import styles from './PasswordChange.less';

function SettingsPasswordChangePage() {
  const [form] = Form.useForm();
  const localStore = useLocalStore(() => ({
    data: '',
  }));

  const formRef = useRef(null);

  // const store = useStore('modelSettingsPasswordChange'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);
  const handleSubmit = async () => {
    try {
      const value = form.getFieldsValue();
      const { code } = await updatePwd(value);
      if (code === '000000') message.success('密码修改成功！');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div styleName="page">
      <div styleName="content">
        <Card styleName="card">
          <div styleName="login">
            <Form
              form={form}
              name="basic"
              ref={formRef}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="新密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入8-16位包含数字、字母的密码',
                  },
                  {
                    pattern: '^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$',
                    message: '请输入8-16位包含数字、字母的密码',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="修改密码"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次输入密码不一致');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button size="large" block type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default observer(
  CSSModules(SettingsPasswordChangePage, styles, {
    allowMultiple: true,
  }),
);
