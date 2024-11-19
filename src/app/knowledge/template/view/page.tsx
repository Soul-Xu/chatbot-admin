"use client"
import React from "react"
import { setCurrentUrl } from '@/lib/features/slices/currentUrlSlice';
import { Breadcrumb, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TemplateView = () => {
  return (
    <div className={classNames("templateView")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb
            items={[
              {
                title: <a href="" style={{ color: '#000'}}>数字化办公室</a>,
              },
              {
                title: '金科中心常用',
              },
            ]}
          />
        </div>
        <div className={classNames("main-content")}>
          <div className={classNames("main-content-title")}>
            <div className={classNames("content-title-text")}>
              IT需求申请流程
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

