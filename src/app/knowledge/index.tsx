"use client"
import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import KnowledgeList from './list';
// FAQ库
import FaqList from './faq/list';
import FaqView from './faq/view';
import FaqEdit from './faq/edit';
import AddFaq from './faq/add'
// 流程实例知识库
import BaseList from './base/list';
import BaseView from './base/view';
// 流程模版知识库
import TemplateList from './template/list';
import TemplateView from './template/view';
import TemplateEdit from './template/edit';
import AddTemplate from './template/add';
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Knowledge = () => {
  // 从store中获取当前url
  const currentUrl = useSelector((state: any) => state.currentUrl);
  // 当前页面上的url
  const [curUrl, setCurUrl] = useState('');

  const renderContent = useCallback(() => {
    // 定义URL到组件的映射关系
    const urlToComponentMap:any = {
      '/': KnowledgeList,
      '/knowledge': KnowledgeList,
      '/knowledge/faq/list': FaqList,
      '/knowledge/faq/view': FaqView,
      '/knowledge/faq/add': AddFaq,
      '/knowledge/faq/edit': FaqEdit,
      '/knowledge/base/list': BaseList,
      '/knowledge/base/view': BaseView,
      '/knowledge/template/list': TemplateList,
      '/knowledge/template/view': TemplateView,
      '/knowledge/template/add': AddTemplate,
      '/knowledge/template/edit': TemplateEdit
    };
    // 获取curUrl中的路径部分，忽略查询参数
    const mainHost = curUrl.includes('?') ? curUrl.split('?')[0] : curUrl;

    // 根据curUrl查找对应的组件
    let ComponentToRender = urlToComponentMap['/' + mainHost] || KnowledgeList; // 默认组件
    // 渲染组件
    return <ComponentToRender />;
  }, [curUrl]); // 依赖项是 curUrl

  useEffect(() => {
    currentUrl && setCurUrl(currentUrl)
  }, [currentUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url:any = window.location.hash.replace(/^#\/?/, '')
      setCurUrl(url)
    }
  }, [])

  return (
    <div className={classNames("knowledge")}>
      <div className={classNames("knowledge-content")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Knowledge;