import React from 'react';
import CSSModules from 'react-css-modules';
import { Button, Table, Tag } from 'antd';
import { useStore } from '@/store/index';
import { observer, useLocalStore } from 'mobx-react';

import styles from './index.less';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a style={{ marginRight: 16 }}>Invite {record.name}</a>
        <a>Delete</a>
      </span>
    ),
  },
];

function LoginPage() {
  // const curStore = useLocalStore(() => ({
  //   data: [
  //     {
  //       key: '1',
  //       name: 'John Brown',
  //       age: 32,
  //       address: 'New York No. 1 Lake Park',
  //       tags: ['nice', 'developer'],
  //     },
  //   ],
  //   addData() {
  //     curStore.data = [
  //       ...curStore.data,
  //       {
  //         key: '1',
  //         name: 'John Brown',
  //         age: 32,
  //         address: 'New York No. 1 Lake Park',
  //         tags: ['nice', 'developer'],
  //       },
  //     ];
  //   },
  // }));
  // const [data, setData] = useState([
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  // ]);

  const store = useStore('modelLogin');
  console.log(store);
  // const data = curStore.data;
  // const addData = curStore.addData;
  return (
    <div>
      <Button
        styleName="bg"
        onClick={() => {
          store.changeName();
        }}
      >
        {store.name}
      </Button>
      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
}

export default observer(CSSModules(LoginPage, styles));
