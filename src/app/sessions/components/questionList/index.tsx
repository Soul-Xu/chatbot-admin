import React from 'react';
import { Table, Space, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';

// 示例数据
const questionData = [
  {
    questionId: 'q001',
    description: '系统登录失败',
    userId: 'u001',
    submitTime: '2024-09-01 10:00:00',
  },
  {
    questionId: 'q002',
    description: '文章无法发布',
    userId: 'u002',
    submitTime: '2024-09-02 11:00:00',
  },
  {
    questionId: 'q003',
    description: '账号密码找回问题',
    userId: 'u003',
    submitTime: '2024-09-03 12:00:00',
  },
];

const QuestionList = () => {
  const columns = [
    {
      title: '问题ID',
      dataIndex: 'questionId',
      key: 'questionId',
    },
    {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      render: (submitTime:any) => dayjs(submitTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <Space size="middle">
          <a onClick={() => handleMarkSolved(record.questionId)}>标记解决</a>
          <a onClick={() => handleEdit(record.questionId)}>编辑</a>
          <Popconfirm
            title="确定要删除这个问题吗？"
            onConfirm={() => handleDelete(record.questionId)}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 标记解决操作
  const handleMarkSolved = (questionId:any) => {
    console.log('标记问题解决:', questionId);
    // 这里可以添加标记问题解决的逻辑
    message.success('问题已标记为解决');
  };

  // 编辑操作
  const handleEdit = (questionId:any) => {
    console.log('编辑问题:', questionId);
    // 这里可以添加编辑问题的逻辑
  };

  // 删除操作
  const handleDelete = (questionId:any) => {
    console.log('删除问题:', questionId);
    // 这里可以添加删除问题的逻辑
  };

  return (
    <Table
      columns={columns}
      dataSource={questionData}
      rowKey={(record) => record.questionId}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
}

export default QuestionList;
