import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserActivityStats from './components/userActivity';

const Statistics = () => {
  const items: TabsProps['items'] = [
    {
      key: 'userActivity',
      label: '用户活跃度',
      children: <UserActivityStats />,
    },
    // {
    //   key: 'status',
    //   label: '机器人状态',
    //   children: <BotStatus />,
    // },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <div>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;
};

export default Statistics;