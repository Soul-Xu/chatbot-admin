"use client"
import React, { useEffect } from "react"
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

const FaqContainer = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const columns = [
    {
      title: '问题',
      dataIndex: 'fdQuestion',
      key: 'fdQuestion',
    },
    {
      title: '答案',
      dataIndex: 'fdAnswer',
      key: 'fdAnswer',
    },
    {
      title: '创建人',
      dataIndex: 'fdCreator',
      key: 'fdCreator',
    },
    {
      title: '创建时间',
      dataIndex: 'fdCreateTime',
      key: 'fdCreateTime',
    },
    {
      title: '使用量',
      dataIndex: 'fdUseCount',
      key: 'fdUseCount',
    },
    {
      title: '状态',
      dataIndex: 'fdStatus',
      key: 'fdStatus'
    }
  ]

  const dataSource = [
    {
      key: '1',
      fdQuestion: 'IT需求申请',
    },
    {
      key: '2',
      fdQuestion: '日常流程',
    },
    {
      key: '3',
      fdQuestion: '日常流程问答',
      fdAnswer: '答案1',
      fdCreator: '陈洪',
      fdCreateTime: '2022.03.22 16:47:22',
      fdUseCount: '49',
      fdStatus: '已生效'
    },
    {
      key: '4',
      fdQuestion: '日常流程问答',
      fdAnswer: '答案1',
      fdCreator: '陈洪',
      fdCreateTime: '2022.03.22 16:47:22',
      fdUseCount: '49',
      fdStatus: '已生效'
    },
    {
      key: '5',
      fdQuestion: '用章流程',
    },
    {
      key: '6',
      fdQuestion: '签报流程',
    },
  ]

  // 点击新增知识
  const handleAddKnowledge = () => {
    dispatch(setCurrentUrl('knowledge/faq/add'))
  }

  // 点击返回
  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge'))
  }

  // 知识子库FAQ列表
  const renderListAction = () => {
    return (
     <div className={classNames("faqContainer-header-right")}>
      <div className={classNames("faqContainer-header-right-action")}>
        <Button type="link" className={classNames("btn-link")}>
          <Image src={ImgTemplateIcon} alt="template" width={14} height={14} />
          <span>导入模版</span>
        </Button>
        <Button className={classNames("btn-default")}>
          导入知识
        </Button>
        <Link href="#/knowledge/faq/add" onClick={handleAddKnowledge}>
          <Button className={classNames("btn-action")}>
            新增知识
          </Button>
        </Link>
      </div>
    </div>
    )
  }
 
  return (
    <div className={classNames("faqList")}>
      <div className={classNames("faqContainer-header")}>
        <div className={classNames("faqContainer-header-left")}>
          <div className={classNames("faqContainer-header-left-icon")}>
            <Link href="#/knowledge" onClick={handleBack}>
              <Button className={classNames("icon-btn")}>
                <Image src={ImgBackIcon} alt="back-icon" width={12} height={12} />
              </Button>
            </Link>
          </div>
          <div className={classNames("faqContainer-header-left-title")}>FAQ库</div>
          <div className={classNames("faqContainer-header-left-creator")}>
            <span>创建人</span>
            <span>陈海勇</span>
          </div>
          <div className={classNames("faqContainer-header-left-createTime")}>
            <span>创建时间</span>
            <span>2022.03.22</span>
          </div>
        </div>
        { renderListAction() }
      </div>
      <div className={classNames("faqContainer-content")}>
        <div className={classNames("faqContainer-content-tree")}>
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
        <div className={classNames("faqContainer-content-main")}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default FaqContainer

