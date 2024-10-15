import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserList from './components/userList';
import PermissionList from './components/permissionList';

const Users = () => {
  const items: TabsProps['items'] = [
    {
      key: 'user',
      label: '用户列表',
      children: <UserList />,
    },
    {
      key: 'permission',
      label: '权限管理',
      children: <PermissionList />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <div>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;
};

export default Users;