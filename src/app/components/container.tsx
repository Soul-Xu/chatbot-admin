"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { selectFaqNode, getFaqTree } from '@/lib/features/slices/faqSlice'
import { selectTemplateNode, getTemplateTree } from '@/lib/features/slices/templateSlice'
import ImgBackIcon from "@/public/images/back-icon.png"
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Dropdown, Menu, Button, Input, Tooltip } from "antd"
import type { MenuProps } from 'antd';
import type { TreeDataNode } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import AddClassify from "./addClassify";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
interface Props {
  children: React.ReactNode
}

const titleMap = {
  'faq': {
    title: 'FAQ库',
    desc: 'FAQ库用于管理《填单指引》《流程问题自动回复》两个场景下的相关知识库。FAQ库中的知识主要包含“运维流程相关的常见问题、流程表单填写指引”等内容；知识来源主要依赖人工整理。'
  },
  'template': {
    title: '流程模板知识库',
    desc: '流程模板知识库用于管理《智能启动流程实例》场景下的相关知识。流程模板知识库中的知识主要是“流程模板、相关流程描述”等内容；数据从IT运维管理系统中同步流程模板后，需要在知识库中补充完善流程描述信息。'
  }
}

const Container = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  const faqState = useSelector((state: any) => state.faq);
  const [treeData, setTreeData] = useState<any>([]);
  const { faqTree, status, error } = faqState;
  const curUrl = window.location.href;
  const [mainCard, setMainCard] = useState(titleMap['faq']);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('add');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click====menu', e);
    const keyValue = e.key
    if (keyValue === 'edit') {
      setAddType('edit')
      setShowAddModal(true)
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: 'edit',
    },
    {
      label: '删除',
      key: 'delete',
    },
  ];

  // 假设你的 Dropdown 组件可以这样使用
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // 假设你的 Dropdown 组件可以这样使用
  // @ts-ignore
  const DropdownWithTitle = ({ title }) => {
    // 定义一个样式，用于限制标题的宽度并添加省略号
    const titleStyle = {
      maxWidth: '150px', // 设置一个最大宽度，可以根据需要调整
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    // 定义 Tooltip 的样式，调整其宽度
    const tooltipOverlayStyle = {
      width: '208px', // 设置 Tooltip 的最大宽度
      borderRadius: '6px',
      overflow: 'hidden', // 确保内容不会溢出
    };

    return (
      <Tooltip 
        placement="top"
        title={title}
        overlayStyle={tooltipOverlayStyle} // 使用内联样式
      >
        <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
          <div className={classNames("tree-title")} style={titleStyle}>
            {title}
          </div>
        </Dropdown.Button>
      </Tooltip>
    );
  };


  const mockTreeData: TreeDataNode[] = [
    {
      title: "parent",
      key: '0-0',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
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

  // 定义一个函数来递归地修改树形数据的 title
  const updateTreeTitles = (nodes:any) => {
    return nodes.map((node: any) => {
      // 创建一个新的 DropdownWithTitle 组件，并将原始 title 作为属性传递
      const newNode = {
        ...node,
        title: <DropdownWithTitle title={node.title} />, // 使用原始 title
        children: node.children ? updateTreeTitles(node.children) : undefined
      };
      return newNode;
    });
  };

  // 使用 updateTreeTitles 函数更新 mockTreeData
  const updatedMockTreeData = updateTreeTitles(mockTreeData);


  // 点击新增知识
  const handleAddKnowledge = () => {
    if (currentUrl?.includes('faq')) {
      dispatch(setCurrentUrl('knowledge/faq/add'))
    } else {
      dispatch(setCurrentUrl('knowledge/template/add'))
    }
  }

  // 点击树形节点中按钮
  const handleTreeBtnClick = (node: any) => {
    console.log('handleTreeBtnClick', node)
  }

  // 点击返回
  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge'))
  }

  // 点击新增树
  const handleAddIcon = () => {
    setShowAddModal(true);
  }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
    // 调用 action 来更新选中的节点信息
    if (currentUrl?.includes('faq')) {
      dispatch(selectFaqNode(info.node));
    } else {
      dispatch(selectTemplateNode(info.node));
    }
  };

  // 头部区右侧操作按钮
  const renderListAction = () => {
    return (
     <div className={classNames("container-header-right")}>
      <div className={classNames("container-header-right-action")}>
        {/* <Button type="link" className={classNames("btn-link")}>
          <Image src={ImgTemplateIcon} alt="template" width={14} height={14} />
          <span>导入模版</span>
        </Button>
        <Button className={classNames("btn-default")}>
          导入知识
        </Button> */}
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

  // 内容区左侧树形结构
  useEffect(() => {
    setTreeData(updatedMockTreeData);
  }, [faqTree]);

  // 标题映射
  useEffect(() => {
    const hasUrl = currentUrl || curUrl 
      // 检查currentUrl中是否包含关键字
    if (hasUrl?.includes('faq')) {
      setMainCard(titleMap.faq);
    } else if (hasUrl?.includes('template')) {
      setMainCard(titleMap.template);
    }
  }, [currentUrl, curUrl])

  useEffect(() => {
    const params = {
      parentId: '',
      name: '',
    }
    if (currentUrl?.includes('faq')) {
      // @ts-ignore
      dispatch(getFaqTree(params))
    } else {
      // @ts-ignore
      dispatch(getTemplateTree(params))
    }
  }, [])
 
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
          <div className={classNames("container-header-left-title")}>{mainCard.title}</div>
          <div className={classNames("container-header-left-description")}>
            <div className={classNames("description-title")}>子库描述</div>
            <div className={classNames("description-content")}>
              <Tooltip title={mainCard.desc}>
                {mainCard.desc}
              </Tooltip>
            </div>
          </div>
        </div>
        { renderListAction() }
      </div>
      <div className={classNames("container-content")}>
        <div className={classNames("container-content-tree")}>
          <div className={classNames("tree-title")}>
            <span>目录</span>
            <Button className={classNames("tree-title-btn")} onClick={handleAddIcon}>
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
      {showAddModal && (
        <AddClassify
          type={addType}
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onOk={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}

export default Container

