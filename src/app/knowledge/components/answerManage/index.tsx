import React, { useState } from 'react';
import { Table, Popconfirm, Button, message } from 'antd';

const AnswerManagement = () => {
  // 示例数据
  const [answers, setAnswers] = useState([
    {
      id: 'a1',
      content: 'React是一个用于构建用户界面的JavaScript库。',
      topic: 'React',
      questionId: '1',
    },
    // ...可以添加更多回答示例数据
  ]);

  const handleDelete = (answerId:any) => {
    setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== answerId));
    message.success('回答已删除');
  };

  const handleEdit = (answer:any) => {
    // 这里可以添加编辑回答的逻辑，例如弹出一个模态框进行编辑
    console.log('编辑回答:', answer);
    // 示例：假设我们只是打印出要编辑的回答
  };

  const columns = [
    {
      title: '回答ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '回答内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '话题',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: '关联问题',
      dataIndex: 'questionId',
      key: 'questionId',
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
            title="您确定要删除这个回答吗？"
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
      dataSource={answers}
      columns={columns}
      rowKey="id"
      pagination={{ position: ['bottomCenter'] }}
    />
  );
};

export default AnswerManagement;
