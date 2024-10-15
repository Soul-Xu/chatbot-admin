import React, { useState } from 'react';
import { Table, Popconfirm, Button, message, Input, Modal } from 'antd';

const TopicManagement = () => {
  // 示例数据
  const [topics, setTopics] = useState([
    {
      id: 't1',
      name: 'React最佳实践',
      description: '关于React最佳实践的话题讨论',
    },
    // ...可以添加更多话题示例数据
  ]);

  const [editingTopic, setEditingTopic] = useState<any>(null);

  const handleDelete = (topicId:any) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== topicId));
    message.success('话题已删除');
  };

  const handleEdit = (topic:any) => {
    setEditingTopic({ ...topic });
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    setTopics((prevTopics:any) => prevTopics.map((topic:any) =>
      topic.id === editingTopic.id ? editingTopic : topic
    ));
    setIsModalVisible(false);
    message.success('话题已更新');
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '话题ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '话题名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
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
            title="您确定要删除这个话题吗？"
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
    <>
      <Table
        dataSource={topics}
        columns={columns}
        rowKey="id"
        pagination={{ position: ['bottomCenter'] }}
      />
      <Modal
        title="编辑话题"
        visible={isModalVisible}
        onOk={handleSaveEdit}
        onCancel={handleCancelEdit}
      >
        <Input
          value={editingTopic?.name}
          onChange={e => setEditingTopic((prev:any) => ({ ...prev, name: e.target.value }))}
          placeholder="话题名称"
        />
        <Input
          value={editingTopic?.description}
          onChange={e => setEditingTopic((prev:any) => ({ ...prev, description: e.target.value }))}
          placeholder="话题描述"
          style={{ marginTop: 16 }}
        />
      </Modal>
    </>
  );
};

export default TopicManagement;
