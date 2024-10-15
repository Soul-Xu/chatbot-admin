import React from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import dayjs from 'dayjs';

// 示例数据
const permissionsData = [
  {
    id: 1,
    roleName: '系统管理员',
    description: '拥有系统最高管理权限',
    permissions: ['用户管理', '权限分配', '系统设置'],
  },
  {
    id: 2,
    roleName: '内容管理员',
    description: '管理网站内容',
    permissions: ['文章发布', '评论管理'],
  },
  {
    id: 3,
    roleName: '普通用户',
    description: '普通用户权限',
    permissions: ['查看文章', '发表评论'],
  },
];

const PermissionList = () => {
  const columns = [
    {
      title: '角色ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限列表',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions:any) => (
        <div>
          {permissions.map((permission:any, index:any) => (
            <Tag key={index} color="geekblue">{permission}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <Space size="middle">
          <a>编辑</a>
          <Popconfirm
            title="确定要删除这个角色吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 删除操作
  const handleDelete = (roleId:any) => {
    console.log('删除角色:', roleId);
    // 这里可以添加删除角色的逻辑
  };

  return (
    <Table
      columns={columns}
      dataSource={permissionsData}
      rowKey={(record) => record.id}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
}

export default PermissionList;
