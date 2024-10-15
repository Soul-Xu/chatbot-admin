import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import BotConfig from './components/botConf'
import BotStatus from './components/botStatus'

const Robots = () => {
  const items: TabsProps['items'] = [
    {
      key: 'config',
      label: '机器人配置',
      children: <BotConfig />,
    },
    {
      key: 'status',
      label: '机器人状态',
      children: <BotStatus />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <div>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;
};

export default Robots;