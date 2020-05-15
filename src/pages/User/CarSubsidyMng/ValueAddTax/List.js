import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import moment from 'moment';
import {
  Badge,
  Card,
  Table,
  Button,
  Row,
  Form,
  Input,
  Select,
  Modal,
  Divider,
  DatePicker,
} from 'antd';
import { useStore } from '@/store/index';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ModalFeedback from '@/components/UploadFeedback/index';
import {
  subsidyList,
  subsidyRevert,
  subsidyDelete,
} from '@/pages/User/CarSubsidyMng/ValueAddTax/_service.ValueAddTax';
import { delay } from '@/utils/helper';

import styles from './List.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function UserCarSubsidyMngValueAddTaxListPage() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const globalStore = useStore('globalModel');

  const localStore = useLocalStore(() => ({}));

  const [queryParams, setQueryParams] = useState({
    startTime: undefined,
    endTime: undefined,
    keyword: undefined,
    status: undefined,
    typeId: undefined, // 补贴类型
    pageNum: 1,
    pageSize: 10,
    type: 1, // "类型,1,增值税 2 购置税"
  });

  const columns = [
    {
      title: '购买方名称',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '身份证号或者统一信用代码',
      dataIndex: 'buyerCardNo',
      key: 'buyerCardNo',
    },
    {
      title: '补贴类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '车架号',
      dataIndex: 'frameNumber',
      key: 'frameNumber',
    },
    {
      title: '价税合计金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: '发票代码',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNo',
      key: 'invoiceNo',
    },
    {
      title: '增值税审核状态',
      dataIndex: 'statusName',
      key: 'statusName',
      render: (text, record) => {
        const { status } = record;
        switch (status) {
          case 1:
            return (
              <div>
                <Badge status="default" />
                {text}
              </div>
            );
          case 2:
            return (
              <div>
                <Badge status="processing" />
                {text}
              </div>
            );
          case 3:
            return (
              <div>
                <Badge status="error" />
                {text}
              </div>
            );
          case 4:
            return (
              <div>
                <Badge status="success" />
                {text}
              </div>
            );
        }
      },
    },
    {
      title: '购置税审核状态',
      dataIndex: 'extraStatusName',
      key: 'extraStatusName',
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      render: (text, record) => {
        const time =
          (text && moment(text).format('YYYY-MM-DD HH:mm:ss')) || null;
        return time;
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => {
        const { status, extraStatus } = record;
        switch (status) {
          case 1:
            return (
              <div>
                <a onClick={() => handleToEdit(record.id)}>编辑</a>
                <Divider type="vertical" />
                <a onClick={() => handleDelete(record)}>删除</a>
                <Divider type="vertical" />
                <a onClick={() => handleToDetail(record.id)}>详情</a>
              </div>
            );
          case 2:
            return (
              <div>
                <a onClick={() => handleToDetail(record.id)}>详情</a>
                <Divider type="vertical" />
                <a onClick={() => handleWithDraw(record)}>撤回</a>
              </div>
            );
          case 3:
            return (
              <div>
                <a onClick={() => handleToEdit(record.id)}>编辑</a>
                <Divider type="vertical" />
                <a onClick={() => handleToDetail(record.id)}>详情</a>
              </div>
            );
          case 4:
            return (
              <div>
                {extraStatus !== 4 && (
                  <>
                    <a
                      onClick={() => {
                        console.log('show modal');
                        console.log(record);
                        setVisible(true);
                      }}
                    >
                      上传凭证
                    </a>
                    <Divider type="vertical" />
                  </>
                )}
                <a onClick={() => handleToDetail(record.id)}>详情</a>
              </div>
            );
        }
      },
    },
  ];

  function handleQuery(values) {
    const params = {
      ...queryParams,
      ...values,
      pageNum: 1,
    };
    setQueryParams(params);
    fetchData(params);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const store = useStore('modelUserCarSubsidyMngValueAddTaxList'); // 注意store里面的数据不要使用解构赋值
  // console.log(store);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const { page: data } = await subsidyList(params || queryParams);
      setList(data.list);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        const { dutyTime } = values;
        console.log(values);
        if (dutyTime && dutyTime.length === 2) {
          values.startTime =
            dutyTime[0] && dutyTime[0].startOf('day').valueOf();
          values.endTime = dutyTime[1] && dutyTime[1].endOf('day').valueOf();
        } else {
          values.startTime = undefined;
          values.endTime = undefined;
        }

        const curValues = { ...values };
        delete curValues.dutyTime;
        handleQuery(curValues);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  //编辑
  const handleToEdit = (id) => {
    history.push({
      pathname: '/car_subsidy_mng/value_add_tax/update',
      search: `?id=${id}`,
    });
  };

  //删除
  const handleDelete = ({ id, buyerName }) => {
    console.log('删除', id);
    Modal.confirm({
      content: `您确定要删除"${buyerName}"的购车补贴申请吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        console.log('删除');
        return await remove(id);
      },
    });
  };

  //详情
  const handleToDetail = (id) => {
    history.push(`/car_subsidy_mng/value_add_tax/detail?id=${id}`);
  };

  //撤回
  const handleWithDraw = ({ id, buyerName }) => {
    Modal.confirm({
      content: `您确定要撤回"${buyerName}"的购车补贴申请吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        console.log('撤回');
        return await revert(id);
      },
    });
  };

  const revert = async (applyItemId) => {
    try {
      await subsidyRevert({ applyItemId });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (applyItemId) => {
    try {
      await subsidyDelete({ applyItemId });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  //上报
  const handleAddValueTax = () => {
    history.push({
      pathname: '/car_subsidy_mng/value_add_tax/create',
    });
  };

  const paginationProps = {
    current: queryParams.pageNum,
    pageSize: queryParams.pageSize,
    onChange: (page) => {
      console.log(page);
      const params = {
        ...queryParams,
        pageNum: page,
      };
      setQueryParams(params);
      fetchData(params);
    },
    total,
  };

  return (
    <>
      <div styleName="content">
        <Card>
          <Row
            style={{
              marginBottom: 16,
            }}
          >
            <Form form={form} name="basic" layout="inline">
              <Form.Item name="keyword" styleName="formItem">
                <Input.Search
                  style={{ width: 750 }}
                  placeholder="请输入购买方名称/身份证号/统一信用代码/发票代码/发票号码/开票方名称/购车人纳税识别号/关键字进行搜索"
                  onSearch={handleSubmit}
                />
              </Form.Item>
              <Form.Item
                label="审核状态"
                name="status"
                styleName="formItem"
                initialValue=""
              >
                <Select
                  style={{ width: 260 }}
                  placeholder="请选择"
                  onChange={handleSubmit}
                >
                  <Option value="">不限</Option>
                  {globalStore.appEnum.reviewStatus.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="补贴类型"
                name="typeId"
                styleName="formItem"
                initialValue=""
              >
                <Select
                  style={{ width: 260 }}
                  placeholder="请选择"
                  onChange={handleSubmit}
                >
                  <Option value="">不限</Option>
                  {globalStore.appEnum.subsidy.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="提交时间" name="dutyTime" styleName="formItem">
                <RangePicker
                  style={{ width: 260 }}
                  onChange={() => {
                    handleSubmit();
                  }}
                />
              </Form.Item>
            </Form>
          </Row>

          <div styleName="addBtn">
            <Button type="primary" onClick={handleAddValueTax}>
              新增购车发票审核
            </Button>
          </div>
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={list}
            scroll={{ x: 1500 }}
            pagination={paginationProps}
          />
        </Card>
        <ModalFeedback
          visible={visible}
          confirmLoading={modalLoading}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={async () => {
            try {
              setModalLoading(true);
              await delay(2);
              setVisible(false);
            } catch (error) {
              console.error(error);
            } finally {
              setModalLoading(false);
            }
          }}
        ></ModalFeedback>
      </div>
    </>
  );
}

export default observer(
  CSSModules(UserCarSubsidyMngValueAddTaxListPage, styles, {
    allowMultiple: true,
  }),
);
