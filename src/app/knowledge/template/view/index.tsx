"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getTemplateDetail } from '@/lib/features/slices/templateSlice';
import { useRouter } from "next/navigation";
import { Breadcrumb, Button } from "antd"
import Container from "../../../components/container";
import DeleteTemplate from "../delete";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TemplateView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const templateState = useSelector((state: any) => state.template);
  const { templateDetail, selectedTemplateNode } = templateState;
  // 使用useState创建面包屑项的状态
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
    // 获取hash部分，去掉前面的'#'符号
  const hash = window.location.hash.substring(1);
  // 使用URLSearchParams解析参数
  const params = new URLSearchParams(hash.split('?')[1]);
  // 获取id参数
  const idFromHash = params.get('id');

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleEditClick = () => {
    const currenId = window.location.href.split('?')[1].split('=')[1];
    router.push(`/#/knowledge/template/edit?id=${currenId}`);
    dispatch(setCurrentUrl('knowledge/template/edit'));
  }

    // 点击弹窗确认按钮
  const handleOk = () => {
    setShowDeleteModal(false)
    dispatch(setCurrentUrl('knowledge/template/list'));
    router.push(`/#/knowledge/template/list`);
  }

  // 渲染可使用者
  const renderUsers = (content: any) => {
    if (content?.readerFlag === 'ALL') {
      return <div>所有人</div>
    } else if (content?.readerFlag === 'RANGE') {
      return <div>{content?.readers.map((item:any) => item.name).join(', ')}</div>
    } else if (content?.readerFlag === null) {
      return <div>无</div>
    }
  }

  // 当selectedTemplateNode变化时，更新面包屑项
  useEffect(() => {
    console.log('detail', selectedTemplateNode)
    if (selectedTemplateNode) {
      const pathParts = selectedTemplateNode.path.split('/');
      const newBreadcrumbItems = pathParts.map((part:any, index:any) => {
        if (index === pathParts.length - 1) {
          return {
            title: <a href="#/knowledge/template/list" style={{ color: '#000', fontWeight: 500 }}>{part}</a>,
          };
        }
        return {
          title: part,
        };
      });
      console.log('newBreadcrumbItems', newBreadcrumbItems)
      setBreadcrumbItems(newBreadcrumbItems);
    }
  }, [selectedTemplateNode]);

  useEffect(() => {
    if (idFromHash) {
      // @ts-ignore
      dispatch(getTemplateDetail(idFromHash)) 
    }
  }, [idFromHash])

  return (
    <div className={classNames("templateView")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className={classNames("main-content")}>
          <div className={classNames("main-content-title")}>
            <div className={classNames("content-title-text")}>
              { templateDetail?.subject }
            </div>
            <div className={classNames("content-title-action")}>
              <Button 
                className={classNames("action-item")}
                onClick={handleDeleteClick}
              >
                删除
              </Button>
              <Button 
                className={classNames("action-item")}
                type="primary"
                onClick={handleEditClick}
              >编辑</Button>
            </div>
          </div>
          <div className={classNames("main-content-detail")}>
            <div className={classNames("content-detail-info")}>
              <div className={classNames("info-content")}>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>知识标签</div>
                  <div className={classNames("item-text")}>{templateDetail?.tagList.map((item:any) => item.name).join(', ')}</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>可使用者</div>
                  <div className={classNames("item-text")}>{renderUsers(templateDetail)}</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>流程链接</div>
                  <div className={classNames("item-text")}>{templateDetail?.url}</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>流程描述</div>
                  <div 
                    className={classNames("item-text")}
                    dangerouslySetInnerHTML={{__html: templateDetail?.description}}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {showDeleteModal && (
        <DeleteTemplate
          // @ts-ignore
          id={idFromHash}
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onOk={() => handleOk()}
        />
      )}
    </div>
  )
}

export default TemplateView

