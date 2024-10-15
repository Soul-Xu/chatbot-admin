'use client'
import React, { useState, useEffect } from 'react';
import {
  // 导入需要的图标
  DashboardOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  // 其他需要的组件
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import Dashboard from './dashboard';
import Users from './users';
import Sessions from './sessions';
import Robots from './robots';
import Knowledge from './knowledge';
import Statistics from './statistics';
import Settings from './settings';

const { Header, Content, Footer, Sider } = Layout;

// 定义菜单项类型
type MenuItem = Required<MenuProps>['items'][number];

// 根据README.md内容定义菜单项
const items: MenuItem[] = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: '首页' },
  { key: 'users', icon: <UserOutlined />, label: '用户管理' },
  { key: 'sessions', icon: <LaptopOutlined />, label: '会话管理' },
  { key: 'robots', icon: <NotificationOutlined />, label: '机器人管理' },
  { key: 'knowledge', icon: <SettingOutlined />, label: '知识库管理' },
  { key: 'statistics', icon: <SettingOutlined />, label: '统计分析' },
  { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
  // 可以继续添加其他菜单项
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('dashboard')
  const router = useRouter();
  const pathname = usePathname();

  // 菜单点击事件处理函数
  const handleMenuClick = (e: { key: string }) => {
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      setCurrentKey(e.key); // 更新状态
      router.push(`/#/${e.key}`);
    }
  };

  // 使用 useEffect 监听路由变化
  useEffect(() => {
    const hash = pathname.split('#/')[1];
    setCurrentKey(hash || 'dashboard'); // 当路由变化时更新状态
  }, [pathname]);

  // 根据路由渲染不同组件
  const renderContent = () => {
    if (typeof window === 'undefined') return null; // 如果是服务器端渲染，则不渲染内容

    switch (currentKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'sessions':
        return <Sessions />;
      case 'robots':
        return <Robots />;
      case 'knowledge':
        return <Knowledge />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Sider collapsible collapsed={collapsed} theme='light' onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['dashboard']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background" style={{ padding: 16, minHeight: 360 }}>
            {/* 根据路由渲染不同组件 */}
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>AI Chat App ©2024 Created by Your Company</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
