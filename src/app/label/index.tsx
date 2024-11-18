"use client"
import React, { useState } from 'react';
import Image from "next/image"
import ImgTemplateIcon from "@/public/images/template-icon.png"
import { Button, Input, Tabs } from "antd"
import type { TabsProps } from 'antd'
import ClassifyManage from './components/classifyManage';
import TagsList from './components/tagsList';
import AddClassifyModal from './components/classifyManage/addClassify';
import AddTagModal from './components/tagsList/addTag'
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Label = () => {
  const [currentkey, setCurrentKey] = useState('classify')
  const [showAddClassifyModal, setShowAddClassifyModal] = useState(false)
  const [showAddTagModal, setShowAddTagModal] = useState(false)

  const items: TabsProps['items'] = [
    {
      key: 'classify',
      label: '分类管理',
    },
    {
      key: 'tags',
      label: '标签列表',
    },
  ];

  const onChange = (key: string) => {
    setCurrentKey(key)
  };

  const onShowAddModal = () => {
    console.log('currentkey', currentkey)
    if (currentkey === 'classify') {
      setShowAddClassifyModal(true)
    } else {
      setShowAddTagModal(true)
    }
  }

  return (
    <div className={classNames("label")}>
      <div className={classNames("label-header")}>
        <div className={classNames("label-header-left")}>
          <div className={classNames("label-header-left-title")}>标签库</div>
          <div className={classNames("label-header-left-divide")}></div>
          <div className={classNames("label-header-left-tabs")}> 
            <Tabs className={classNames("tabs-container")} defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
        <div className={classNames("label-header-right")}>
          <div className={classNames("label-header-right-action")}>
            <Button type="link" className={classNames("btn-link")}>
              <Image src={ImgTemplateIcon} alt="template" width={14} height={14} />
              <span>导入模版</span>
            </Button>
            <Button className={classNames("btn-default")}>
              { currentkey === 'classify' ? '导入分类' : '导入标签'}
            </Button>
            <Button className={classNames("btn-action")} onClick={() => onShowAddModal()}>
              { currentkey === 'classify' ? '新增分类' : '新增标签'}
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames("label-content")}>
        {currentkey === 'classify' && <ClassifyManage />}
        {currentkey === 'tags' && <TagsList />}
      </div>
      { showAddClassifyModal && 
        <AddClassifyModal
          show={showAddClassifyModal}
          onClose={() => setShowAddClassifyModal(false)}
          onOk={() => setShowAddClassifyModal(false)}
        />
      }
      {
        showAddTagModal && 
        <AddTagModal
          show={showAddTagModal}
          onClose={() => setShowAddTagModal(false)}
          onOk={() => setShowAddTagModal(false)}
        />
      }
    </div>
  );
};

export default Label;
