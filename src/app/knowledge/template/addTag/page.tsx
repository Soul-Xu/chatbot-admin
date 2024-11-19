"use client"
import React, { useMemo, useState } from "react"
import { Modal, Button, theme, Transfer, Tree } from "antd"
import type { GetProp, TransferProps, TreeDataNode } from 'antd'
import classnames from "classnames/bind"
import styles from "./index.module.scss"
const classNames = classnames.bind(styles)

type TransferItem = GetProp<TransferProps, 'dataSource'>[number]

interface TreeTransferProps {
  dataSource: TreeDataNode[];
  targetKeys: TransferProps['targetKeys'];
  onChange: TransferProps['onChange'];
}

interface Props {
  show: boolean
  onClose: () => void
  onOk: () => void
}

// Customize Table Transfer
const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) =>
  selectedKeys.includes(eventKey);

const generateTree = (
  treeNodes: TreeDataNode[] = [],
  checkedKeys: TreeTransferProps['targetKeys'] = [],
): TreeDataNode[] =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key as string),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer: React.FC<TreeTransferProps> = ({
  dataSource,
  targetKeys = [],
  ...restProps
}) => {
  const { token } = theme.useToken();

  const transferDataSource: TransferItem[] = [];
  function flatten(list: TreeDataNode[] = []) {
    list.forEach((item) => {
      transferDataSource.push(item as TransferItem);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  const handleSearch: TransferProps['onSearch'] = (dir, value) => {
    console.log('search:', dir, value);
  };

  // const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
  //   setTargetKeys(newTargetKeys);
  // };

  return (
    <Transfer
      {...restProps}
      locale={{ itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容' }}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      showSearch
      onSearch={handleSearch}
      // onChange={handleChange}
      className="tree-transfer"
      render={(item) => item.title!}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key as string, !isChecked(checkedKeys, key));
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key as string, !isChecked(checkedKeys, key));
                }}
              />
            </div>
          );
        }
      }}
    </Transfer>
  );
};

const treeData: TreeDataNode[] = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' },
    ],
  },
  { key: '0-2', title: '0-2' },
  { key: '0-3', title: '0-3' },
  { key: '0-4', title: '0-4' },
]

const AddTag = (props: Props) => {
  const { show, onClose, onOk } = props
  const [targetKeys, setTargetKeys] = useState<TreeTransferProps['targetKeys']>([])
  const onChange: TreeTransferProps['onChange'] = (keys) => {
    setTargetKeys(keys)
  }

  const footer = useMemo(() => {
    return (
      <div className={classNames("add-tag-footer")}>
        <Button 
          className={classNames("footer-cancel")}
          onClick={onClose}
        >
          取消
        </Button>
        <Button
          type='primary'
          className={classNames("footer-ok")}
          onClick={onOk}
        >
          确定
        </Button>
      </div>
    )
  }, [])

  return (
    <Modal
      title={
        <div className={classNames("add-tag-title")}>
          <span>知识标签</span>
        </div>
      }
      width={760}
      visible={show}
      onCancel={onClose}
      // onOk={handleOk}
      className={classNames("add-tag")}
      footer={footer}
    >
      <div className={classNames("add-tag-content")}>
        <div className={classNames("content-title")}>
          <span>选择标签</span>
          <span>已选择标签</span>
        </div>
        <div className={classNames("content-main")}>
          <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />
        </div>
      </div>
    </Modal>
  )
}

export default AddTag