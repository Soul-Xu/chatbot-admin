"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { UserOutlined } from '@ant-design/icons';
import ImgHomeIcon from '@/public/images/home-icon.png'
import ImgKnowledgeIcon from '@/public/images/knowledge-icon.png'
import ImgTagIcon from '@/public/images/tag-icon.png'
import ImgStatisticsIcon from '@/public/images/statistics-icon.png'
import ImgSettingIcon from '@/public/images/setting-icon.png'
import ImgHomeActiveIcon from '@/public/images/home-active-icon.png'
import ImgKnowledgeActiveIcon from '@/public/images/knowledge-active-icon.png'
import ImgTagActiveIcon from '@/public/images/tag-active-icon.png'
import ImgStatisticsActiveIcon from '@/public/images/statistics-active-icon.png'
import ImgSettingActiveIcon from '@/public/images/setting-active-icon.png'
import { Layout, Menu, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import ImgSysIcon from '@/public/images/chatbot-admin.png'
// import Dashboard from './dashboard';
// import Knowledge from './knowledge';
// import Tag from './tag';
// import Statistics from './statistics';
// import Settings from './settings';
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;

// 动态导入 Image 组件
const DynamicImage = dynamic(() => import('next/image'), {
  ssr: false // 确保在服务器端不渲染 Image 组件
});

// 动态导入组件
const Dashboard = dynamic(() => import('./dashboard')); // 确保不在服务器端渲染这个组件
const Knowledge = dynamic(() => import('./knowledge')); // 确保不在服务器端渲染这个组件
const Tag = dynamic(() => import('./tag')); // 确保不在服务器端渲染这个组件
const Statistics = dynamic(() => import('./statistics')); // 确保不在服务器端渲染这个组件
const Settings = dynamic(() => import('./settings')); // 确保不在服务器端渲染这个组件

// 定义菜单项类型
type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState('knowledge')
  const router = useRouter();
  let curHash

  // 根据README.md内容定义菜单项
  const items: MenuItem[] = [
    { key: 'dashboard', icon: <DynamicImage src={currentKey === 'dashboard' ? ImgHomeActiveIcon : ImgHomeIcon} alt="home-icon" width={20} height={20} />, label: '首页' },
    { key: 'knowledge', icon: <DynamicImage src={currentKey === 'knowledge' ? ImgKnowledgeActiveIcon : ImgKnowledgeIcon} alt="knowledge-icon" width={20} height={20} />, label: '知识集' },
    { key: 'tag', icon: <DynamicImage src={currentKey === 'tag' ? ImgTagActiveIcon : ImgTagIcon} alt="tag-icon" width={20} height={20} />, label: '标签库' },
    { key: 'statistics', icon: <DynamicImage src={currentKey === 'statistics' ? ImgStatisticsActiveIcon : ImgStatisticsIcon} alt="statistics-icon" width={20} height={20} />, label: '分析' },
    { key: 'setting', icon: <DynamicImage src={currentKey === 'setting' ? ImgSettingActiveIcon : ImgSettingIcon} alt="setting-icon" width={20} height={20}/>, label: '设置' },
    // 可以继续添加其他菜单项
  ];

  // 菜单点击事件处理函数
  const handleMenuClick = (e: { key: string }) => {
    setCurrentKey(e.key); // 更新状态
    router.push(`/#/${e.key}`);
  };

  // 使用 useEffect 监听路由变化
  useEffect(() => {
    if (window && typeof window === 'undefined') {
      // @ts-ignore
      const curHash = window.location.hash;
      const hash = curHash.replace('#/', '');
      console.log('hash', hash);
      dispatch(setCurrentUrl(hash));

      // 使用对象映射来简化条件判断
      const keyMap = {
        knowledge: 'knowledge',
        tag: 'tag',
        statistics: 'statistics',
        setting: 'setting'
      };

      // 默认设置为 'knowledge'
      // @ts-ignore
      setCurrentKey(keyMap[hash.split('/')[0]] || 'knowledge');
    }
  }, [curHash]);

  // 根据路由渲染不同组件
  const renderContent = () => {
    if (typeof window === 'undefined') return null; // 如果是服务器端渲染，则不渲染内容
    if (typeof window !== 'undefined') {
      switch (currentKey) {
        case 'dashboard':
          return <Dashboard />;
        case 'knowledge':
          return <Knowledge />;
        case 'tag':
          return <Tag />;
        case 'statistics':
          return <Statistics />;
        case 'setting':
          return <Settings />;
        default:
          return <Dashboard />;
      }
    }
  };

  return (
    <Layout className={classNames("layout")}>
      <Header className={classNames("header")}>
        {typeof window !== 'undefined' && (
          <div className={classNames("header-title")}>
            <Image src={ImgSysIcon} alt="logo" width={157} height={19} />
          </div>
        )}
        <div className={classNames("header-avatar")}>
          <Avatar size={30} icon={<UserOutlined />} />
        </div>
      </Header>
      <Layout>
        <Sider className={classNames("sider")} theme='light' width={64}>
          <Menu 
            className={classNames("sider-menu")} 
            theme="light" 
            defaultSelectedKeys={[currentKey]} 
            selectedKeys={[currentKey]}
            mode="vertical" 
            items={items} 
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Content className={classNames("content")}>
           {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
