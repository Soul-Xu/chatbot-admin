"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import KnowledgeList from './list';
import FaqList from './faq/list/page';
import FaqView from './faq/view/page';
import FaqEdit from './faq/edit/page';
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

  const renderContent = useCallback(() => {
    if (curUrl === '') {
      return <KnowledgeList />
    } else if (curUrl === 'knowledge') {
      return <KnowledgeList />;
    } else if (curUrl === 'knowledge/faq/list') {
      return <FaqList />;
    } else if (curUrl === 'knowledge/faq/add') {
      return <AddList />;
    } else if (curUrl.includes('knowledge/faq/view')) {
      return <FaqView />;
    } else if (curUrl.includes('knowledge/faq/edit')) {
      return <FaqEdit />;
    }
  }, [curUrl]); // 依赖项是 curUrl

  useEffect(() => {
    currentUrl && setCurUrl(currentUrl)
  }, [currentUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.title = "AI管理后台";
    }
  }, [curUrl])

  return (
    <div className={classNames("knowledge")}>
      <div className={classNames("knowledge-content")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Knowledge;