import React, { useState } from 'react';
import { Table, Popconfirm, Button, message } from 'antd';

const QuestionManagement = () => {
  // 示例数据
  const [questions, setQuestions] = useState([
    {
      id: '1',
      description: '如何使用React？',
      topic: 'React',
      answers: [],
    },
    // ...可以添加更多问题示例数据
  ]);

  const handleDelete = (questionId:any) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    message.success('问题已删除');
  };

  const handleEdit = (question:any) => {
    // 这里可以添加编辑问题的逻辑，例如弹出一个模态框进行编辑
    console.log('编辑问题:', question);
    // 示例：假设我们只是打印出要编辑的问题
  };

  const columns = [
    {
      title: '问题ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '话题',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: '关联回答',
      dataIndex: 'answers',
      key: 'answers',
      render: (answers:any) => `${answers.length} 条回答`,
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="您确定要删除这个问题吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Table
      dataSource={questions}
      columns={columns}
      rowKey="id"
      pagination={{ position: ['bottomCenter'] }}
    />
  );
};

export default QuestionManagement;
