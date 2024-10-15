import React from 'react';
import { Table, Tag, Space } from 'antd';
import dayjs from 'dayjs'

  const users = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '1234567890',
      role: '管理员',
      status: 'active',
      registerTime: '2021-01-01 12:00:00',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      phone: '0987654321',
      role: '普通用户',
      status: 'inactive',
      registerTime: '2021-02-01 12:00:00',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      phone: '1111111111',
      role: '普通用户',
      status: 'active',
      registerTime: '2021-03-01 12:00:00',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '2222222222',
      role: '普通用户',
      status: 'inactive',
      registerTime: '2021-04-01 12:00:00',
    }
  ]


const UserList = () => {
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '注册邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text:any) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text:any) => {
        const color = text === 'active' ? 'green' : 'red';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      render: (text:any) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <Space size="middle">
          <a>编辑</a>
          <a>禁用</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(record) => record.id}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
}

export default UserList;
