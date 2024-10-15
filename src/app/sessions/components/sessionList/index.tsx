import React from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import dayjs from 'dayjs';

// 示例数据
const sessionData = [
  {
    sessionId: '001',
    userId: 'u001',
    username: '张三',
    botId: 'b001',
    sessionStatus: '进行中',
    startTime: '2024-09-01 10:00:00',
    endTime: '2024-09-01 10:30:00',
  },
  {
    sessionId: '002',
    userId: 'u002',
    username: '李四',
    botId: 'b002',
    sessionStatus: '已完成',
    startTime: '2024-09-02 11:00:00',
    endTime: '2024-09-02 11:30:00',
  },
  {
    sessionId: '003',
    userId: 'u003',
    username: '王五',
    botId: 'b003',
    sessionStatus: '未开始',
    startTime: '2024-09-03 12:00:00',
    endTime: '2024-09-03 12:30:00',
  },
];

const SessionList = () => {
  const columns = [
    {
      title: '会话ID',
      dataIndex: 'sessionId',
      key: 'sessionId',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '机器人ID',
      dataIndex: 'botId',
      key: 'botId',
    },
    {
      title: '会话状态',
      dataIndex: 'sessionStatus',
      key: 'sessionStatus',
      render: (sessionStatus:any) => (
        <Tag color={sessionStatus === '进行中' ? 'blue' : sessionStatus === '已完成' ? 'green' : 'red'}>
          {sessionStatus}
        </Tag>
      ),
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime:any) => dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime:any) => dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <Space size="middle">
          <a>查看</a>
          <Popconfirm
            title="确定要删除这个会话吗？"
            onConfirm={() => handleDelete(record.sessionId)}
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
  const handleDelete = (sessionId:any) => {
    console.log('删除会话:', sessionId);
    // 这里可以添加删除会话的逻辑
  };

  return (
    <Table
      columns={columns}
      dataSource={sessionData}
      rowKey={(record) => record.sessionId}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
}

export default SessionList;
