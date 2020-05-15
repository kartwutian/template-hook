import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react';
import moment from 'moment';
import {
  Badge,
  Card,
  Table,
  Tag,
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
import { subsidyList } from '@/pages/User/CarSubsidyMng/ValueAddTax/_service.ValueAddTax';
import {
  subsidyAudit,
  exportUrl,
} from '@/pages/Admin/CarSubsidyReview/PurchaseTax/_service.PurchaseTax';

import styles from './List.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function AdminCarSubsidyReviewPurchaseTaxListPage() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [auditLoading, setAuditLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [note, setNote] = useState('');

  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);

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
    type: 2, // "类型,1,增值税 2 购置税"
  });

  const columns = [
    {
      title: '购买方名称',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '身份证号',
      dataIndex: 'buyerCardNo',
      key: 'buyerCardNo',
    },
    {
      title: '补贴类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '车辆识别号码/车架号码',
      dataIndex: 'frameNumber',
      key: 'frameNumber',
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
      title: '购置税审核状态',
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
      title: '增值税审核状态',
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
        const { status } = record;
        switch (status) {
          case 2:
            return (
              <div>
                <a onClick={() => handleReview(record)}>审核</a>
                <Divider type="vertical" />
                <a onClick={() => handleToDetail(record.id)}>详情</a>
              </div>
            );
          case 3:
            return (
              <div>
                <a onClick={() => handleToDetail(record.id)}>详情</a>
              </div>
            );
          case 4:
            return (
              <div>
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
    console.log('=====', localStore.params);
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

  //详情
  const handleToDetail = (id) => {
    console.log('详情', id);
    history.push(`/car_subsidy_review/purchase_tax/detail?id=${id}`);
  };

  const handleReview = (record) => {
    console.log(record);
    setVisible(true);
    setCurrentRecord(record);
  };

  const handleOk = async (e) => {
    const { id } = currentRecord;
    try {
      setAuditLoading(true);
      await subsidyAudit({ applyItemId: id, status: 4, note }); //3 审核不通过 4 审核通过
      setVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setAuditLoading(false);
      setNote('');
    }
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleReject = async (e) => {
    const { id } = currentRecord;
    try {
      setAuditLoading(true);
      await subsidyAudit({ applyItemId: id, status: 3, note }); //3 审核不通过 4 审核通过
      setVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setAuditLoading(false);
      setNote('');
    }
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
                  style={{ width: 700 }}
                  placeholder="请输入购买方名称/身份证号/发票代码/发票号码/开票方名称/购车人纳税识别号/关键字进行搜索"
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
                  {globalStore.appEnum.reviewStatus
                    .filter((item) => item.id !== 1)
                    .map((item) => (
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
            <Button type="primary" style={{ marginRight: 10 }}>
              <a
                href={exportUrl({ type: 1 })}
                download="出购置税发票（待审核）"
                target="_blank"
                rel="noopener noreferrer"
              >
                导出购置税发票（待审核）
              </a>
            </Button>
            <Button type="primary">
              <a
                href={exportUrl({ type: 2 })}
                download="购车补贴名单"
                target="_blank"
                rel="noopener noreferrer"
              >
                导出购车补贴名单
              </a>
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
        <Modal
          title="审核"
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="reject" onClick={handleReject} loading={auditLoading}>
              驳回
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={auditLoading}
              onClick={handleOk}
            >
              审核通过
            </Button>,
          ]}
        >
          <Input.TextArea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          ></Input.TextArea>
        </Modal>
      </div>
    </>
  );
}

export default observer(
  CSSModules(AdminCarSubsidyReviewPurchaseTaxListPage, styles, {
    allowMultiple: true,
  }),
);
