"use client"
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/currentUrlSlice';
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import FaqContainer from "../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FaqView = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  }]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleEditClick = () => {
    console.log('2', window.location.href)
    const currenId = window.location.href.split('?')[1].split('=')[1];
    router.push(`#/knowledge/faq/edit?id=${currenId}`);
    dispatch(setCurrentUrl('/knowledge/faq/edit'));
  }
  
  return (
    <div className={classNames("faqView")}>
      <FaqContainer>
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
              日常流程回答
            </div>
            <div className={classNames("content-title-btn")}>
              <Button 
                className={classNames("action-btn")} 
                type="primary"
                onClick={handleEditClick}
              >编辑</Button>
              <Dropdown.Button 
                menu={menuProps} 
                onClick={handleButtonClick}
                className={classNames("action-more")}
              >
              </Dropdown.Button>
            </div>
          </div>
          <div className={classNames("main-content-detail")}>
            <div className={classNames("content-detail-text")}>
              知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容
              知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容
              知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容知识内容
            </div>
            <div className={classNames("content-detail-info")}>
              <div className={classNames("info-title")}>
                <div className={classNames("info-title-icon")}></div>
                <div className={classNames("info-title-text")}>FAQ信息</div>
              </div>
              <div className={classNames("info-content")}>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>创建人</div>
                  <div className={classNames("item-text")}>陈海勇</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>更新时间</div>
                  <div className={classNames("item-text")}>2022.03.22 16:32:34</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>问题类型</div>
                  <div className={classNames("item-text")}>金科中心常用-流程开发规范</div>
                </div>
                <div className={classNames("content-item")}>
                  <div className={classNames("item-title")}>生效时间</div>
                  <div className={classNames("item-text")}>永久</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FaqContainer>
    </div>
  )
}

export default FaqView
