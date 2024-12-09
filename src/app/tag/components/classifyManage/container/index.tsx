
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { selectFaqNode, getFaqTree } from '@/lib/features/slices/faqSlice'
import { selectTemplateNode, getTemplateTree } from '@/lib/features/slices/templateSlice'
import AddClassify from "../addClassify";
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Button, Input, Tooltip } from "antd"
import type { TreeDataNode } from 'antd';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
interface Props {
  children: React.ReactNode
}

const mockTreeData: TreeDataNode[] = [
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
  const faqState = useSelector((state: any) => state.faq);
  const { faqTree, status, error } = faqState;
  const [treeData, setTreeData] = useState<any>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // 点击新增树
  const handleAddIcon = () => {
    setShowAddModal(true);
  }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
    // 调用 action 来更新选中的节点信息
    if (currentUrl?.includes('faq')) {
      // dispatch(selectFaqNode(info.node));
    } else {
      dispatch(selectTemplateNode(info.node));
    }
  };

  // 内容区左侧树形结构
  useEffect(() => {
    setTreeData(mockTreeData);
  }, [faqTree]);

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
      <div className={classNames("container-content")}>
        <div className={classNames("container-content-tree")}>
          <div className={classNames("tree-title")}>
            <span>目录</span>
            <Button className={classNames("tree-title-btn")} onClick={handleAddIcon} >
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
        {showAddModal && (
          <AddClassify
            show={showAddModal}
            onClose={() => setShowAddModal(false)}
            onOk={() => setShowAddModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Container

