import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import QuestionManagement from './components/questionManage';
import AnswerManagement from './components/answerManage';
import TopicManagement from './components/topicManage';

const Knowledge = () => {
  const items: TabsProps['items'] = [
    {
      key: 'question',
      label: '问题管理',
      children: <QuestionManagement />,
    },
    {
      key: 'answer',
      label: '回答管理',
      children: <AnswerManagement />,
    },
    {
      key: 'topic',
      label: '话题管理',
      children: <TopicManagement />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <div>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;
};

export default Knowledge;