import React, { createElement, useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import styles from './index.less';
import { useStore } from '@/store/index';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import Upload from 'rc-upload';
import { uploadPic } from '../_service.ValueAddTax';
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
  InputNumber,
  message,
} from 'antd';

const { Option } = Select;
const ValueForm = ({ detailInfo, handleFinish }) => {
  const [form] = Form.useForm();
  const globalStore = useStore('globalModel');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        // status为1的时候保存 status为2的时候提交审核
        values.actionType = type;
        values.invoiceType = 1;
        handleFinish && handleFinish(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

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
                rules={[{ required: true, message: '请输入购买者名称' }]}
              >
                <Input placeholder="请输入购买者名称" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="身份证号或者统一信用代码"
                name="buyerCardNo"
                rules={[
                  { required: true, message: '请输入身份证号或者统一信用代码' },
                ]}
              >
                <Input
                  placeholder="请输入身份证号或者统一信用代码"
                  style={{ width: 280 }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="补贴类型"
                name="typeId"
                rules={[{ required: true, message: '请选择补贴类型' }]}
              >
                <Select placeholder="请选择补贴类型" style={{ width: 280 }}>
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
                  { required: true, message: '请输入车辆识别代码(车架号码)' },
                ]}
              >
                <Input
                  disabled={detailInfo && detailInfo.frameNumber}
                  placeholder="请输入"
                  style={{ width: 280 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <div styleName="gup"></div>
        <Card title="增值税发票信息">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                label="发票代码"
                name="invoiceCode"
                rules={[{ required: true, message: '请输入发票代码' }]}
              >
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
                label="开票方名称(必须与白名单企业名称一致)"
                name="opName"
                rules={[
                  {
                    required: true,
                    message: '开票方名称(必须与白名单企业名称一致)',
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
            <Col span={8}>
              <Form.Item
                label="开票方识别号"
                name="opCode"
                rules={[{ required: true, message: '请输入开票方识别号' }]}
              >
                <Input placeholder="请输入" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="税价合计金额"
                name="totalAmount"
                rules={[{ required: true, message: '请输入购车税价合计金额' }]}
              >
                <Input
                  type="number"
                  placeholder="请输入购车税价合计金额"
                  style={{ width: 280 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Alert
                message="提醒：提交前请将“消费者承诺书 、购车发票 、合同签名页 、消费者身份证正反面或营业执照”等4种文件类型的文件，按文件类型命名规范后上传，以免审核不通过。附件命名格式：消费者名称+文件类型 。"
                type="warning"
                showIcon
              />
            </Col>
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
                  <Button loading={uploading}>上传附件</Button>
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
        <div styleName="gup"></div>
        <Card title="发放补贴银行账号信息">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                label="开户行"
                name="bank"
                rules={[{ required: true, message: '请输入开户行' }]}
              >
                <Input placeholder="请输入" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="开户银行账号"
                name="bankAccount"
                rules={[{ required: true, message: '请输入银行卡号' }]}
              >
                <Input placeholder="请输入银行卡号" style={{ width: 280 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="开户人姓名（必须与购买方名称一致）"
                name="accountName"
                rules={[{ required: true, message: '请输入开户人姓名' }]}
              >
                <Input placeholder="请输入开户人姓名" style={{ width: 280 }} />
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
  CSSModules(ValueForm, styles, {
    allowMultiple: true,
  }),
);
