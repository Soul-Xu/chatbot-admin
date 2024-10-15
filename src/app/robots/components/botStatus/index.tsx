import React from 'react';
import { Table, Space, Popconfirm, message, Tag } from 'antd';
import dayjs from 'dayjs';

// 示例数据
const botStatusData = [
  {
    botId: 'b001',
    botName: '客服机器人A',
    status: '在线',
    lastOnlineTime: '2024-09-01 10:00:00',
  },
  {
    botId: 'b002',
    botName: '营销机器人B',
    status: '离线',
    lastOnlineTime: '2024-09-02 11:00:00',
  },
  {
    botId: 'b003',
    botName: '技术支持机器人C',
    status: '在线',
    lastOnlineTime: '2024-09-03 12:00:00',
  },
];

const BotStatus = () => {
  const columns = [
    {
      title: '机器人ID',
      dataIndex: 'botId',
      key: 'botId',
    },
    {
      title: '机器人名称',
      dataIndex: 'botName',
      key: 'botName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status:any) => (
        <Tag color={status === '在线' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '最后在线时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
      render: (lastOnlineTime:any) => dayjs(lastOnlineTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text:any, record:any) => (
        <Space size="middle">
          {record.status === '在线' ? (
            <Popconfirm
              title="确定要下线这个机器人吗？"
              onConfirm={() => handleOffline(record.botId)}
              okText="是"
              cancelText="否"
            >
              <a>下线</a>
            </Popconfirm>
          ) : (
            <a onClick={() => handleOnline(record.botId)}>上线</a>
          )}
          <a onClick={() => handleEdit(record.botId)}>编辑</a>
        </Space>
      ),
    },
  ];

  // 上线操作
  const handleOnline = (botId:any) => {
    console.log('机器人上线:', botId);
    // 这里可以添加机器人上线的逻辑
    message.success('机器人已上线');
  };

  // 下线操作
  const handleOffline = (botId:any) => {
    console.log('机器人下线:', botId);
    // 这里可以添加机器人下线的逻辑
    message.success('机器人已下线');
  };

  // 编辑操作
  const handleEdit = (botId:any) => {
    console.log('编辑机器人信息:', botId);
    // 这里可以添加编辑机器人信息的逻辑
  };

  return (
    <Table
      columns={columns}
      dataSource={botStatusData}
      rowKey={(record) => record.botId}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
}

export default BotStatus;
