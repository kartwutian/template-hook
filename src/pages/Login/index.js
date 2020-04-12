import React, { useRef } from 'react';
import CSSModules from 'react-css-modules';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '@/store/index';
import { observer, useLocalStore } from 'mobx-react';

import styles from './index.less';

function LoginPage() {
  const store = useStore('modelLogin');
  const localStore = useLocalStore(() => ({}));
  const history = useHistory();
  const formRef = useRef(null);
  const handleSubmit = (values) => {
    message.success('登录成功');
    history.push('/home');
  };
  const onFinishFailed = () => {};
  console.log(process);
  console.log(process.env.NODE_ENV);
  return (
    <div styleName="page">
      <div styleName="content">
        <div styleName="top">
          <div styleName="header">
            <Link to="/">
              <img
                styleName="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="logo"
              />
              <span styleName="title">基于 Ant Design</span>
            </Link>
          </div>
          <div styleName="desc">万博通用后台管理系统模板</div>
          <img src={`${__PUBLIC_PATH__}logo.png`} />
        </div>
        <div styleName="login">
          <Form
            name="basic"
            ref={formRef}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入账号名',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button size="large" block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default observer(CSSModules(LoginPage, styles));
