import React, { useRef, useState } from 'react';
import CSSModules from 'react-css-modules';
import { observer, useLocalStore } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Alert, message } from 'antd';
import { useStore } from '@/store/index';
import { delay } from 'utils/helper';
import { sendSms, resetPwd } from './_service.Login.js';

import styles from './Forget.less';

function LoginForgetPage() {
  const [hasSend, setHasSend] = useState(false);
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const history = useHistory();
  const localStore = useLocalStore(() => ({
    munites: 60,
    params: {},
    cannotNext: true,
    setMunites() {
      this.munites = this.munites - 1;
    },
  }));

  const formRef = useRef(null);

  const sendCode = async () => {
    try {
      const value = form.getFieldsValue();
      if (value.phone) {
        setHasSend('ture');
        await sendSms(value.phone);
        const countdown = setInterval(() => {
          if (localStore.munites > 1) {
            localStore.setMunites();
          } else {
            clearInterval(countdown);
            setHasSend(false);
            localStore.munites = 60;
          }
        }, 1000);
      } else {
        message.error('请先输入手机号');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => {
    // e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        localStore.params = values;
        setStep(2);
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  const septOneChange = () => {
    const value = form.getFieldsValue();
    if (
      value.phone &&
      value.phone !== '' &&
      value.validateCode &&
      value.validateCode !== ''
    ) {
      localStore.cannotNext = false;
    } else {
      localStore.cannotNext = true;
    }
  };

  const handleSubmit = async (values) => {
    try {
      const value = form.getFieldsValue();
      const params = {
        ...localStore.params,
        password: value.newPassword,
        confirmPassword: value.rePassword,
      };
      await resetPwd(params);
      message.success('密码重置成功！');
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div styleName="page">
      <div styleName="content">
        <div styleName="login">
          <Alert
            message="为确认是你本人操作，请输入绑定手机号验证码："
            type="info"
            showIcon
            styleName="alert"
          />
          <Form form={form} name="basic" ref={formRef} onFinish={handleSubmit}>
            {step === 1 ? (
              <div>
                <Form.Item
                  label="手机号"
                  name="phone"
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
                  label="验证码"
                  name="validateCode"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}
                >
                  <div styleName="getcode">
                    <Input />
                    {hasSend ? (
                      <Button size="" type="primary" disabled>
                        {localStore.munites}s后获取
                      </Button>
                    ) : (
                      <Button size="" type="primary" onClick={sendCode}>
                        获取验证码
                      </Button>
                    )}
                  </div>
                </Form.Item>

                <Button
                  size="large"
                  block
                  type="primary"
                  onClick={nextStep}
                  htmlType="submit"
                >
                  下一步
                </Button>
              </div>
            ) : (
              <div>
                <Form.Item
                  label="新密码"
                  name="newPassword"
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
                  label="确认密码"
                  name="rePassword"
                  dependencies={['newPassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请再次输入密码',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('newPassword') === value) {
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
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default observer(
  CSSModules(LoginForgetPage, styles, {
    allowMultiple: true,
  }),
);
