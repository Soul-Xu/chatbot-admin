"use client"
import React, { useEffect } from "react"
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getTemplateDetail } from '@/lib/features/slices/templateSlice';
import { useRouter } from "next/navigation";
import { Breadcrumb, Button } from "antd"
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TemplateView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const templateDetail = useSelector((state: any) => state.template);
  // 获取hash部分，去掉前面的'#'符号
  const hash = window.location.hash.substring(1);
  // 使用URLSearchParams解析参数
  const params = new URLSearchParams(hash.split('?')[1]);
  // 获取id参数
  const idFromHash = params.get('id');

  const handleLinkClick = (url: string) => {
    dispatch(setCurrentUrl(url));
  }

  const handleEditClick = () => {
    const currenId = window.location.href.split('?')[1].split('=')[1];
    router.push(`#/knowledge/template/edit?id=${currenId}`);
    dispatch(setCurrentUrl('knowledge/template/edit'));
  }

  useEffect(() => {
    // @ts-ignore
    idFromHash && dispatch(getTemplateDetail(idFromHash));
  }, [idFromHash])

  return (
    <div className={classNames("templateView")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb
            items={[
              {
                title: <Link href="" style={{ color: '#000'}}>数字化办公室</Link>,
              },
              {
                title: 
                  <Link 
                    href="#/knowledge/template/list" 
                    style={{ color: '#000'}}
                    onClick={() => handleLinkClick('knowledge/template/list')}
                  >
                    金科中心常用
                  </Link>,
              },
            ]}
          />
        </div>
        <div className={classNames("main-content")}>
          <div className={classNames("main-content-title")}>
            <div className={classNames("content-title-text")}>
              IT需求申请流程
            </div>
            <div className={classNames("content-title-action")}>
              <Button className={classNames("action-item")}>删除</Button>
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
                  <div className={classNames("item-text")}>流程开发、开发指南</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>可使用者</div>
                  <div className={classNames("item-text")}>综合业务开发部</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>流程链接</div>
                  <div className={classNames("item-text")}>https://workflow-uat.newone.com.cn/web/#/mklogin</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>流程描述</div>
                  <div className={classNames("item-text")}>描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TemplateView

