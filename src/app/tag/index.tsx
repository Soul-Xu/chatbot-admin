
import React, { useState } from 'react';
import Image from "next/image"
import ImgTemplateIcon from "@/public/images/template-icon.png"
import { Button } from "antd"
import Container from './components/container';
import TagList from './components/tagList'
import AddTagModal from './components/addTagModal'
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Tag = () => {
  const [showAddTagModal, setShowAddTagModal] = useState(false)

  const onShowAddModal = () => {
    setShowAddTagModal(true)
  }

  const handleOk = () => {
    setShowAddTagModal(false)
  }

  return (
    <div className={classNames("tag")}>
      <div className={classNames("tag-header")}>
        <div className={classNames("tag-header-left")}>
          <div className={classNames("tag-header-left-title")}>标签库</div>
        </div>
        <div className={classNames("tag-header-right")}>
          <div className={classNames("tag-header-right-action")}>
            <Button type="link" className={classNames("btn-link")}>
              <Image src={ImgTemplateIcon} alt="template" width={14} height={14} />
              <span>导入模版</span>
            </Button>
            <Button className={classNames("btn-default")}>
              导入标签
            </Button>
            <Button className={classNames("btn-action")} onClick={() => onShowAddModal()}>
              新增标签
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames("tag-content")}>
        <Container>
          <TagList />
        </Container>
      </div>
      {
        showAddTagModal && 
          <AddTagModal  
            show={showAddTagModal}
            onClose={() => setShowAddTagModal(false)}
            onOk={() => handleOk()}
          />
      }
    </div>
  );
};

export default Tag;
