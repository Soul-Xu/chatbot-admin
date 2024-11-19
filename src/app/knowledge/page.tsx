"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import KnowledgeList from './list';
// FAQ库
import FaqList from './faq/list/page';
import FaqView from './faq/view/page';
import FaqEdit from './faq/edit/page';
import AddFaq from './faq/add/page'
// 流程实例知识库
import BaseList from './base/list/page';
import BaseView from './base/view/page';
// 流程模版知识库
import TemplateList from './template/list/page';
import TemplateView from './template/view/page';
import AddTemplate from './template/add/page';
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

  // const renderContent = useCallback(() => {
  //   if (typeof window !== 'undefined') {
  //     window.document.title = "AI管理后台";
  //   }
  //   if (curUrl === '') {
  //     return <KnowledgeList />
  //   } else if (curUrl === 'knowledge') {
  //     return <KnowledgeList />;
  //   } else if (curUrl === 'knowledge/faq/list') {
  //     return <FaqList />;
  //   } else if (curUrl === 'knowledge/faq/add') {
  //     return <AddList />;
  //   } else if (curUrl.includes('knowledge/faq/view')) {
  //     return <FaqView />;
  //   } else if (curUrl.includes('knowledge/faq/edit')) {
  //     return <FaqEdit />;
  //   } else if (curUrl.includes('knowledge/base/list')) {
  //     return <BaseList />;
  //   } else if (curUrl.includes('knowledge/base/view')) {
  //     return <BaseView />
  //   }
  // }, [curUrl]); // 依赖项是 curUrl

  const renderContent = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.document.title = "AI管理后台";
    }

    // 定义URL到组件的映射关系
    const urlToComponentMap = {
      '': KnowledgeList,
      'knowledge': KnowledgeList,
      'knowledge/faq/list': FaqList,
      'knowledge/faq/add': AddFaq,
      'knowledge/faq/view': FaqView,
      'knowledge/faq/edit': FaqEdit,
      'knowledge/base/list': BaseList,
      'knowledge/base/view': BaseView,
      'knowledge/template/list': TemplateList,
      'knowledge/template/view': TemplateView,
      'knowledge/template/add': AddTemplate,
    };

    // 根据curUrl查找对应的组件
    // @ts-ignore
    let ComponentToRender = urlToComponentMap[curUrl] || KnowledgeList; // 默认组件

    // 对于包含特定字符串的URL，需要特别处理
    if (curUrl.includes('knowledge/faq/view')) {
      ComponentToRender = FaqView;
    } else if (curUrl.includes('knowledge/faq/add')) {
      ComponentToRender = AddFaq;
    } else if (curUrl.includes('knowledge/faq/edit')) {
      ComponentToRender = FaqEdit;
    } else if (curUrl.includes('knowledge/base/list')) {
      ComponentToRender = BaseList;
    } else if (curUrl.includes('knowledge/base/view')) {
      ComponentToRender = BaseView;
    } else if (curUrl.includes('knowledge/template/list')) {
      ComponentToRender = TemplateList;
    } else if (curUrl.includes('knowledge/template/view')) {
      ComponentToRender = TemplateView;
    } else if (curUrl.includes('knowledge/template/add')) {
      ComponentToRender = AddTemplate;
    }

    // 渲染组件
    return <ComponentToRender />;
  }, [curUrl]); // 依赖项是 curUrl

  useEffect(() => {
    currentUrl && setCurUrl(currentUrl)
  }, [currentUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.title = "AI管理后台";
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