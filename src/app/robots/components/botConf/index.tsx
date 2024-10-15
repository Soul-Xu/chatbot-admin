import React, { useState } from 'react';
import { Form, Input, Switch, Select, Button, Checkbox, message, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const BotConfig = () => {
  const [form] = Form.useForm();
  const [additionalSettings, setAdditionalSettings] = useState([{ key: '', value: '' }]);

  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
    message.success('机器人配置已保存');
  };

  const onReset = () => {
    form.resetFields();
    setAdditionalSettings([{ key: '', value: '' }]);
    message.info('表单已重置');
  };

  const handleAddSetting = () => {
    setAdditionalSettings([...additionalSettings, { key: '', value: '' }]);
  };

  const handleRemoveSetting = (index:any) => {
    const newSettings = [...additionalSettings];
    newSettings.splice(index, 1);
    setAdditionalSettings(newSettings);
  };

  const handleSettingChange = (index:any, field:any, value:any) => {
    const newSettings = [...additionalSettings];
    // @ts-ignore
    newSettings[index][field] = value;
    setAdditionalSettings(newSettings);
  };

  return (
    <Form
      form={form}
      name="robot_config"
      onFinish={onFinish}
      initialValues={{
        robotName: '',
        welcomeMessage: '您好，我是AI助手，有什么可以帮助您的吗？',
        defaultReply: '很抱歉，我暂时无法理解您的问题，请您详细描述或尝试其他问题。',
        enableGreeting: true,
        enableDefaultReply: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="机器人名称"
        name="robotName"
        rules={[{ required: true, message: '请输入机器人名称!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="欢迎消息"
        name="welcomeMessage"
        rules={[{ required: true, message: '请输入欢迎消息!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="默认回复"
        name="defaultReply"
        rules={[{ required: true, message: '请输入默认回复!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="启用欢迎消息" name="enableGreeting" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="启用默认回复" name="enableDefaultReply" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* 扩展内容 */}
      <Form.Item label="其他自定义设置">
        {additionalSettings.map((setting, index) => (
          <Space key={index} align="baseline">
            <Form.Item
              name={['additionalSettings', index, 'key']}
              rules={[{ required: true, message: '请输入设置键名!' }]}
            >
              <Input
                value={setting.key}
                onChange={(e) => handleSettingChange(index, 'key', e.target.value)}
                placeholder="键名"
              />
            </Form.Item>
            <Form.Item
              name={['additionalSettings', index, 'value']}
              rules={[{ required: true, message: '请输入设置值!' }]}
            >
              <Input
                value={setting.value}
                onChange={(e) => handleSettingChange(index, 'value', e.target.value)}
                placeholder="值"
              />
            </Form.Item>
            {index > 0 && (
              <MinusCircleOutlined onClick={() => handleRemoveSetting(index)} />
            )}
          </Space>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={handleAddSetting} icon={<PlusOutlined />}>
            添加设置
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>
          保存
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BotConfig;
