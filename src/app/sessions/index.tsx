import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SessionList from './components/sessionList';
import QuestionList from './components/questionList';

const Sessions = () => {
  const items: TabsProps['items'] = [
    {
      key: 'session',
      label: '会话列表',
      children: <SessionList />,
    },
    {
      key: 'permission',
      label: '问题列表',
      children: <QuestionList />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <div>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;
};

export default Sessions;