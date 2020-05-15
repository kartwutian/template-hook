import React, { createElement, useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import styles from './index.less';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import Upload from 'rc-upload';
import { uploadPic } from '../_service.PurchaseTax';
import { getExtName } from '@/utils/helper';
import {
  Card,
  Form,
  Select,
  Alert,
  Row,
  Col,
  Input,
  Button,
  message,
} from 'antd';
const { Option } = Select;
import { useStore } from '@/store/index';

const PurchaseForm = ({ detailInfo, handleFinish }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const globalStore = useStore('globalModel');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleKeep = (type) => {
    form
      .validateFields()
      .then((values) => {
        if (!fileList.length) {
          message.error('请上传相关附件');
          return;
        }
        values.fileList = fileList.map((item) => ({
          showPath: item.showPath,
          fileName: item.fileName,
        }));
        values.invoiceType = 2;
        values.actionType = type;
        handleFinish && handleFinish(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    form.setFieldsValue(detailInfo);

    if (detailInfo && detailInfo.fileList) {
      const temp = detailInfo.fileList.map((item, index) => ({
        ...item,
        id: index,
      }));
      setFileList(temp);
    }
  }, [detailInfo]);

  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Col span={24}>
          <Alert
            message="注：所有购买车辆的个人或企业只能享受一个名额"
            type="warning"
            showIcon
          />
        </Col>
      </Card>
      <div styleName="gup"></div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={detailInfo}
      >
        <Card title="消费者信息">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                label="购买方名称"
                name="buyerName"
                rules={[
                  {
                    required: true,
                    message: '请输入购买者名称',
                  },
                ]}
              >
                <Input
                  placeholder="请输入购买者名称"
                  style={{
                    width: 280,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="身份证号或者统一信用代码"
                name="buyerCardNo"
                rules={[
                  {
                    required: true,
                    message: '请输入身份证号或者统一信用代码',
                  },
                ]}
              >
                <Input
                  placeholder="请输入身份证号或者统一信用代码"
                  style={{
                    width: 280,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="补贴类型"
                name="typeId"
                rules={[
                  {
                    required: true,
                    message: '请选择补贴类型',
                  },
                ]}
              >
                <Select
                  placeholder="请选择补贴类型"
                  style={{
                    width: 280,
                  }}
                >
                  {globalStore.appEnum.subsidy.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="车辆识别代码(车架号码)"
                name="frameNumber"
                rules={[
                  {
                    required: true,
                    message: '请输入车辆识别代码(车架号码)',
                  },
                ]}
              >
                <Input
                  disabled={detailInfo && detailInfo.frameNumber}
                  placeholder="请输入"
                  style={{
                    width: 280,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <div styleName="gup"></div>
        <Card title="购置税发票信息">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item label="发票代码" name="invoiceCode">
                <Input placeholder="请输入发票代码" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="发票号码"
                name="invoiceNo"
                rules={[{ required: true, message: '请输入发票号码' }]}
              >
                <Input placeholder="请输入" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="税务机关(必须是义乌税务机关)"
                name="taxOrg"
                rules={[
                  {
                    required: true,
                    message: '请输入税务机关(必须是义乌税务机关)',
                  },
                ]}
              >
                <Input placeholder="请输入" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="开票日期"
                name="invoiceDate"
                rules={[{ required: true, message: '请输入开票日期' }]}
              >
                <Input
                  placeholder="请输入开票日期，格式20200202"
                  style={{ width: 280 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* <Col span={24}>
              <Alert
                message="提醒：提交前请将“消费者承诺书 、购车发票 、合同签名页 、消费者身份证正反面或营业执照”等4种文件类型的文件，按文件类型命名规范后上传，以免审核不通过。附件命名格式：消费者名称+文件类型 。"
                type="warning"
                showIcon
              />
            </Col> */}
            <Col span={16} style={{ paddingTop: 30 }}>
              <Form.Item label="附件" required>
                <Upload
                  name="multipartFile"
                  action={uploadPic()}
                  onStart={() => {
                    setUploading(true);
                  }}
                  onError={(e) => {
                    message.error('上传失败');
                    setUploading(false);
                  }}
                  onSuccess={(res) => {
                    message.success('上传成功');
                    setUploading(false);
                    const { data } = res;
                    setFileList([...fileList, data]);
                    console.log(fileList);
                  }}
                >
                  <Button loading={uploading}>上传完税凭证</Button>
                  <div style={{ marginTop: 10 }}>
                    支持扩展名: .jpg .png .pdf .doc ...
                  </div>
                </Upload>
                {fileList &&
                  !!fileList.length &&
                  fileList.map((file, index) => (
                    <Row key={file.id} style={{ marginTop: 10 }} gutter={10}>
                      <Col flex="auto">
                        <a
                          title={file.showPath}
                          href={file.showPath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.fileName + '.' + getExtName(file.showPath)}
                        </a>
                      </Col>
                      <Col
                        title="删除"
                        onClick={() => {
                          const tempFileList = fileList.filter(
                            (item) => item.id !== file.id,
                          );
                          setFileList(tempFileList);
                        }}
                      >
                        <CloseOutlined style={{ color: '#40a9ff' }} />
                      </Col>
                    </Row>
                  ))}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Row justify="end" align="middle" gutter={8} styleName="pageBottom">
          <Col>
            <Button onClick={handleGoBack}>取消</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => handleKeep(1)}>
              保存
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => handleKeep(2)}>
              提交申请
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default observer(
  CSSModules(PurchaseForm, styles, {
    allowMultiple: true,
  }),
);
