"use client"
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentUrl } from '../../feature/currentUrl/currentUrlSlice';
import KnowledgeList from './list';
import FaqList from './faq/list/page';
import AddList from './faq/add/page'
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Knowledge = () => {
  // const dispatch = useDispatch();
  // const storeCurrentUrl = useSelector((state: any) => state.currentUrl);
  const [currentUrl, setCurrentUrl] = useState(() => {
    // 初始状态使用当前URL的hash
    return window.location.hash.replace(/^#\/?/, '');
  });

  const renderContent = () => {
    switch (currentUrl) {
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

  // useEffect(() => {
  //   console.log('storeCurrentUrl', storeCurrentUrl)
  // }, [storeCurrentUrl])

  return (
    <div className={classNames("knowledge")}>
      <div className={classNames("knowledge-content")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Knowledge;