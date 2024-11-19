"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/currentUrlSlice';
import ImgTemplateIcon from "@/public/images/template-icon.png"
import ImgBackIcon from "@/public/images/back-icon.png"
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Button, Input, Breadcrumb, Table } from "antd"
import type { TreeDataNode } from 'antd';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  children: React.ReactNode
}

const titleMap = {
  'faq': 'FAQ库',
  'base': '流程实例知识库',
  'template': '流程模板知识库'
}

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const Container = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  const curUrl = window.location.href;
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  const [mainTitle, setMainTitle] = useState('FAQ库');

  // 点击新增知识
  const handleAddKnowledge = () => {
    console.log('currentUrl', currentUrl, currentUrl?.includes('faq'))
    if (currentUrl?.includes('faq')) {
      return
      dispatch(setCurrentUrl('knowledge/faq/add'))
    } else {
      dispatch(setCurrentUrl('knowledge/template/add'))
    }
  }

  // 点击返回
  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge'))
  }

  // 知识子库FAQ列表
  const renderListAction = () => {
    return (
     <div className={classNames("container-header-right")}>
      <div className={classNames("container-header-right-action")}>
        <Button type="link" className={classNames("btn-link")}>
          <Image src={ImgTemplateIcon} alt="template" width={14} height={14} />
          <span>导入模版</span>
        </Button>
        <Button className={classNames("btn-default")}>
          导入知识
        </Button>
        {
          !currentUrl?.includes('base') && (
            <Link 
              href={ 
                currentUrl?.includes('faq') ? '#/knowledge/faq/add' : '#/knowledge/template/add'
              } 
              onClick={handleAddKnowledge}>
              <Button className={classNames("btn-action")}>
                新增知识
              </Button>
            </Link>
          )
        }
      </div>
    </div>
    )
  }

  useEffect(() => {
    const hasUrl = currentUrl || curUrl 
      // 检查currentUrl中是否包含关键字
    let foundTitle = '';
    if (hasUrl?.includes('faq')) {
      foundTitle = titleMap.faq;
    } else if (hasUrl?.includes('base')) {
      foundTitle = titleMap.base;
    } else if (hasUrl?.includes('template')) {
      foundTitle = titleMap.template;
    }

    // 更新mainTitle状态
    setMainTitle(foundTitle);
  }, [currentUrl, curUrl])
 
  return (
    <div className={classNames("container")}>
      <div className={classNames("container-header")}>
        <div className={classNames("container-header-left")}>
          <div className={classNames("container-header-left-icon")}>
            <Link href="#/knowledge" onClick={handleBack}>
              <Button className={classNames("icon-btn")}>
                <Image src={ImgBackIcon} alt="back-icon" width={12} height={12} />
              </Button>
            </Link>
          </div>
          <div className={classNames("container-header-left-title")}>{mainTitle}</div>
          <div className={classNames("container-header-left-creator")}>
            <span>创建人</span>
            <span>陈海勇</span>
          </div>
          <div className={classNames("container-header-left-createTime")}>
            <span>创建时间</span>
            <span>2022.03.22</span>
          </div>
        </div>
        { renderListAction() }
      </div>
      <div className={classNames("container-content")}>
        <div className={classNames("container-content-tree")}>
          <div className={classNames("tree-title")}>
            <span>目录</span>
            <Button className={classNames("tree-title-btn")}>
              <Image src={ImgAddIcon} alt="add-icon" width={12} height={12} />
            </Button>
          </div>
          <div className={classNames("tree-search")}>
            <Input placeholder="请输入关键字" />
          </div>
          <div className={classNames("tree-content")}>
            <Tree
              showLine={false}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div>
        </div>
        <div className={classNames("container-content-main")}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Container

