"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import KnowledgeList from './list';
import FaqList from './faq/list/page';
import AddList from './faq/add/page'
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Knowledge = () => {
  // 从store中获取当前url
  const currentUrl = useSelector((state: any) => state.currentUrl);
  // 当前页面上的url
  const [curUrl, setCurUrl] = useState(() => {
    // 初始状态使用当前URL的hash
    return window.location.hash.replace(/^#\/?/, '');
  });

  const renderContent = () => {
    // 根据当前url渲染不同的组件
    switch (curUrl) {
      case 'knowledge':
        return <KnowledgeList />;
      case 'knowledge/faq/list':
        return <FaqList />
      case 'knowledge/faq/add':
        return <AddList />
      default:
        return <KnowledgeList />; // 或者返回默认的组件或者内容
    }
  };

  useEffect(() => {
    setCurUrl(currentUrl)
  }, [currentUrl])

  return (
    <div className={classNames("knowledge")}>
      <div className={classNames("knowledge-content")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Knowledge;