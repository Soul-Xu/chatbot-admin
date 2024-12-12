"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getTagTree, saveTagNodePaths, selectTagNode } from '@/lib/features/slices/tagSlice'
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Dropdown, Menu, Button, Input } from "antd"
import type { MenuProps } from 'antd';
import AddClassify from "./addClassify";
import DeleteClassify from "./deleteClassify";
import AddTagModal from "./addTagModal";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
const { Search } = Input
interface Props {
  children: React.ReactNode
}

const Container = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  let curUrl
  const tagState = useSelector((state: any) => state.tag);
  const { tagTree, nodeTagPaths } = tagState;
  const [treeData, setTreeData] = useState<any>([]);
  const [selectTreeNode, setSelectTreeNode] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [modalType, setModalType] = useState('add');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const keyValue = e.key
    if (keyValue !== 'delete') {
      setModalType(keyValue)
      setShowAddModal(true)
    } else {
      setModalType(keyValue)
      setShowDeleteModal(true)
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '新增',
      key: 'add',
    },
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

  // 点击弹窗确认按钮
  const handleOk = () => {
    if (modalType === 'add') {
      setShowAddModal(false)
    } else if (modalType === 'edit') {
      setShowAddModal(false)
    } else if (modalType === 'delete') {
      setShowDeleteModal(false)
    }
    setTimeout(() => {
      getTreeData()
    }, 2000)
  }

  // 获取树形数据
  const getTreeData = async (value?: any) => {
    const params = {
      parentId: '',
      name: value || '', 
    }
    // @ts-ignore
    dispatch(getTagTree(params))
  }

  // 点击新增树
  const handleAddIcon = () => {
    setModalType('add')
    setSelectTreeNode(null)
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

  // onSelect function
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selectedKeys', selectedKeys); // Debug: Check selected keys
    curUrl = window.location.href;
    const hasUrl = currentUrl || curUrl
    if (!info.node) {
      console.error('info.node is undefined. onSelect function may not be called correctly.');
      return;
    }
    if (selectedKeys.length > 0) {
      // 更新 Redux 中的选中节点路径
      const selectedNodeMap = nodeTagPaths.find((item: any) => item.id === selectedKeys[0])
      const selectedNodeInfo = nodeTagPaths.find((item: any) => item.id === selectedKeys[0])
      setSelectTreeNode(selectedNodeInfo);
      dispatch(selectTagNode(selectedNodeMap));
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
  const convertToNodePath = (nodes:any, currentPath = '', paths:any = []) => {
    nodes.forEach((node:any) => {
      const newPath = currentPath ? `${currentPath}/${node.name}` : node.name;
      paths.push({
        parentId: node.parentId,
        id: node.id,
        pathId: newPath.replace(/\//g, '/'),
        path: newPath,
        level: node.level
      });
      if (node.children && node.children.length > 0) {
        convertToNodePath(node.children, newPath, paths);
      }
    });
    return paths;
  };

  useEffect(() => {
    const treeData = convertToTreeData(tagTree);
    // 接口返回的树形结构转化成可以使用的路径结构
    const nodePath = convertToNodePath(tagTree);
    dispatch(saveTagNodePaths(nodePath));
    setTreeData(treeData);
  }, [tagTree]);

  useEffect(() => {
    getTreeData()
  }, [currentUrl])
 
  return (
    <div className={classNames("container")}>
      <div className={classNames("container-content")}>
        <div className={classNames("container-content-tree")}>
          <div className={classNames("tree-title")}>
            <span>目录</span>
            <Button className={classNames("tree-title-btn")} onClick={handleAddIcon}>
              <Image src={ImgAddIcon} alt="add-icon" width={12} height={12} />
            </Button>
          </div>
          <div className={classNames("tree-search")}>
            <Search placeholder="请输入关键字" onSearch={getTreeData} />
          </div>
          <div className={classNames("tree-content")}>
            <Tree
              showLine={false}
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
          nodeInfo={selectTreeNode}
          type={modalType}
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onOk={() => handleOk()}
        />
      )}
      {showDeleteModal && (
        <DeleteClassify
          nodeInfo={selectTreeNode}
          type={modalType}
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onOk={() => handleOk()}
        />
      )}
    </div>
  )
}

export default Container

