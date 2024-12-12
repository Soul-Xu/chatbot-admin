
import React from "react"
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { Breadcrumb, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const BaseView = () => {
  return (
    <div className={classNames("baseView")}>
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
                  <div className={classNames("item-title")}>发起人</div>
                  <div className={classNames("item-text")}>陈海勇</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>发起时间</div>
                  <div className={classNames("item-text")}>2022.03.22 16:32:34</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>发起人所在部门</div>
                  <div className={classNames("item-text")}>综合业务开发部</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>审批状态</div>
                  <div className={classNames("item-text")}>待审</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BaseView

