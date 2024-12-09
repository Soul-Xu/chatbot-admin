"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getFaqDetail } from "@/lib/features/slices/faqSlice";
import { useRouter } from "next/navigation";
import { Breadcrumb, Button, Dropdown } from "antd"
import type { MenuProps } from 'antd';
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FaqView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const faqState = useSelector((state: any) => state.faq);
  const { faqList, selectedNode } = faqState;
  // 使用useState创建面包屑项的状态
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  // 获取hash部分，去掉前面的'#'符号
  // const hash = window.location.hash.substring(1);
  // // 使用URLSearchParams解析参数
  // const params = new URLSearchParams(hash.split('?')[1]);
  // // 获取id参数
  // const idFromHash = params.get('id');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  const handleLinkClick = (url: string) => {
    dispatch(setCurrentUrl(url));
  }

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
    const currenId = window.location.href.split('?')[1].split('=')[1];
    router.push(`#/knowledge/faq/edit?id=${currenId}`);
    dispatch(setCurrentUrl('knowledge/faq/edit'));
  }

  useEffect(() => {
    // 获取hash部分，去掉前面的'#'符号
    const hash = window.location.hash.substring(1);
    // 使用URLSearchParams解析参数
    const params = new URLSearchParams(hash.split('?')[1]);
    // 获取id参数
    const idFromHash = params.get('id');
    // @ts-ignore
    idFromHash && dispatch(getFaqDetail(idFromHash));
  }, [])

  // 当selectedNode变化时，更新面包屑项
  useEffect(() => {
    if (selectedNode) {
      const pathParts = selectedNode.path.split('/');
      const newBreadcrumbItems = pathParts.map((part:any, index:any) => {
        if (index === pathParts.length - 1) {
          return {
            title: <a href="#/knowledge/faq/list" style={{ color: '#000', fontWeight: 500 }}>{part}</a>,
          };
        }
        return {
          title: part,
        };
      });
      setBreadcrumbItems(newBreadcrumbItems);
    }
  }, [selectedNode]);
  
  return (
    <div className={classNames("faqView")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb items={breadcrumbItems}/>
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
      </Container>
    </div>
  )
}

export default FaqView

