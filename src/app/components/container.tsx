"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { saveFaqNodePaths, selectFaqNode, getFaqTree } from '@/lib/features/slices/faqSlice'
import { getTemplateTree } from '@/lib/features/slices/templateSlice'
import ImgBackIcon from "@/public/images/back-icon.png"
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Dropdown, Menu, Button, Input, Tooltip } from "antd"
import type { MenuProps } from 'antd';
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
  const { faqTree, nodePaths } = faqState;
  const [treeData, setTreeData] = useState<any>([]);
  // const curUrl = window.location.href;
  const [mainCard, setMainCard] = useState(titleMap['faq']);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('add');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
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
      maxWidth: '208px', // 设置 Tooltip 的最大宽度
      borderRadius: '6px',
      overflow: 'hidden', // 确保内容不会溢出
    };

    return (
      <Dropdown.Button menu={menuProps}>
        <div className={classNames("tree-title")} style={titleStyle}>
          {title}
        </div>
      </Dropdown.Button>
    );
  };

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

  // 点击新增知识
  const handleAddKnowledge = () => {
    if (currentUrl?.includes('faq')) {
      dispatch(setCurrentUrl('knowledge/faq/add'))
    } else {
      dispatch(setCurrentUrl('knowledge/template/add'))
    }
  }

  // 点击返回
  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge'))
  }

  // 点击新增树
  const handleAddIcon = () => {
    setShowAddModal(true);
  }

 // Helper function to add parent property to each node
  const addParentToTreeData = (data: any, parent: any) => {
    return data.map((item: any) => {
      const node = {
        ...item,
        parent, // Set the parent of the current node
        children: item.children ? addParentToTreeData(item.children, item) : undefined,
      };
      return node;
    });
  };

  // onSelect function with additional console.log for debugging
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selectedKeys', selectedKeys); // Debug: Check selected keys

    // Check if info.node is defined
    if (!info.node) {
      console.error('info.node is undefined. onSelect function may not be called correctly.');
      return;
    }
    if (selectedKeys.length > 0) {
      // 构建节点路径数组
      const selectedNodeInfo = nodePaths.find((item: any) => item.id === selectedKeys[0])

      // 更新 Redux 中的选中节点路径
      if (currentUrl?.includes('faq')) {
        // dispatch(selectFaqNode({ ...info.node, nodePath }));
        dispatch(selectFaqNode(selectedNodeInfo));
      } else {
        // dispatch(selectTemplateNode({ ...info.node, nodePath }));
    }
    }
  };

  // Adjust the buildNodePath function to handle the case where parent is null
  const buildNodePath = (node: any, nodesMap: Map<string, any> = new Map()): string[] => {
    let path = [];

    // 如果当前节点有 name 属性，则添加到路径数组
    if (node.name) {
      path.unshift(node.name);
    }

    // 如果当前节点有父节点 ID，并且节点映射中存在该父节点，则递归构建路径
    if (node.parentId && nodesMap.has(node.parentId)) {
      const parentNode = nodesMap.get(node.parentId);
      path = buildNodePath(parentNode, nodesMap).concat(path);
    }

    return path;
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

  // Helper function to convert faqList to TreeDataNode format
  const convertToTreeData = (data: any) => {
    return data?.map((item:any) => {
      const node = {
        title: item.name,
        key: item.id,
        children: item.children ? convertToTreeData(item.children) : undefined,
      };
      // 更新节点标题以包含下拉菜单
      node.title = <DropdownWithTitle title={node.title} />;
      return node;
    });
  };

  // 将treeData转化成路径数组
  const convertToNodePath = (treeData: any,) => {
    // 初始化一个空数组来存储处理后的数据
    let processedData:any = [];

    // 遍历每个顶级节点
    treeData.forEach((item:any) => {
      // 检查是否有子节点
      if (item.children && item.children.length > 0) {
        // 遍历每个子节点
        item.children.forEach((child:any) => {
          // 创建新的对象来存储处理后的子节点信息
          let childInfo = {
            parentId: item.id,
            id: child.id,
            pathId: `${item.id}/${child.id}`,
            path: `${item.name}/${child.name}`
          };
          // 将处理后的子节点信息添加到数组中
          processedData.push(childInfo);
        });
      }
    });

    // 返回处理后的数据数组
    return processedData;
  }

  // 在 useEffect 中使用 convertToTreeData 函数来设置树形数据，并添加 parent 属性
  useEffect(() => {
    if (Array.isArray(faqTree)) {
      // 接口返回的树形结构转化成可以渲染的树形结构
      const treeData = convertToTreeData(faqTree);
      // 接口返回的树形结构转化成可以使用的路径结构
      const nodePath = convertToNodePath(faqTree);
      dispatch(saveFaqNodePaths(nodePath));
      setTreeData(treeData);
    } else {
      setTreeData([]);
    }
  }, [faqTree]);

  // 标题映射
  useEffect(() => {
    const curUrl = window.location.href;
    const hasUrl = currentUrl || curUrl 
      // 检查currentUrl中是否包含关键字
    if (hasUrl?.includes('faq')) {
      setMainCard(titleMap.faq);
    } else if (hasUrl?.includes('template')) {
      setMainCard(titleMap.template);
    }
  }, [currentUrl])

  useEffect(() => {
    const curUrl = window.location.href;
    const params = {
      parentId: '',
      name: '',
    }
    if (curUrl?.includes('faq')) {
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

