
import React from 'react';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { Button, Input, Tooltip } from "antd"
import Image from "next/image"
import ImgSearchIcon from "@/public/images/search-icon.png"
import ImgPic1 from "@/public/images/pic1.png"
import ImgPic2 from "@/public/images/pic2.png"
import ImgPic3 from "@/public/images/pic3.png"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const KnowledgeList = () => {
  const dispatch = useDispatch();

  const cardList = [
    {
      id: "faq",
      title: "FAQ库",
      ImgUrl: ImgPic1,
      link: "#/knowledge/faq/list",
      description: "FAQ库用于管理《填单指引》《流程问题自动回复》两个场景下的相关知识库。FAQ库中的知识主要包含“运维流程相关的常见问题、流程表单填写指引”等内容；知识来源主要依赖人工整理。",
      creator: "陈海勇",
      createdTime: '2022-01-01 12:00:00'
    },
    {
      id: "template",
      title: "流程模版知识库",
      ImgUrl: ImgPic3,
      link: "#/knowledge/template/list",
      description: "流程模板知识库用于管理《智能启动流程实例》场景下的相关知识。流程模板知识库中的知识主要是“流程模板、相关流程描述”等内容；数据从IT运维管理系统中同步流程模板后，需要在知识库中补充完善流程描述信息。",
      creator: "陈海勇",
      createdTime: '2022-01-01 12:00:00'
    },
  ]

  const renderDescription = (description:any) => {
    // 设置一个最大长度，超过这个长度的文本将被省略
    const maxLength = 50;
    return (
      <Tooltip title={description} style={{ width: "300px", wordWrap: 'break-word'}} overlayStyle={{ wordWrap: 'break-word', maxWidth: 'none' }}>
        <div className={classNames("card-description", "card-description-ellipsis")}>
          {description.length > maxLength ? `${description.substring(0, maxLength)}...` : description}
        </div>
      </Tooltip>
    );
  };

  const handleCardClick = (idx:any) => {
    const redirectUrl = cardList[idx]?.link.split("#/")[1]
    dispatch(setCurrentUrl(`${redirectUrl}`))
  }

  return (
    <div className={classNames("knowledgeList")}>
      <div className={classNames("knowledgeList-header")}>
        <div className={classNames("knowledgeList-header-title")}>知识库</div>
        {/* <div className={classNames("knowledgeList-header-action")}>
          <Button className={classNames("btn-action")}>导入子库</Button>
        </div> */}
      </div>
      {/* <div className={classNames("knowledgeList-search")}>
        <Input 
          className={classNames("knowledgeList-search-input")} 
          // @ts-ignore
          prefix={<Image src={ImgSearchIcon} alt="search" width={24} height={24} />} 
          placeholder="请输入子库名称" 
        />
      </div> */}
      <div className={classNames("knowledgeList-content")}>
        {
          cardList.map((item, idx) => {
            return (
              <Link
                href={item?.link}
                key={item?.id}
                onClick={() => handleCardClick(idx)}
              >
                <section 
                  key={item?.id} 
                  className={classNames("knowledgeList-content-card")}
                >
                  <div className={classNames("card-pic")}>
                    {/* @ts-ignore */}
                    <Image src={item?.ImgUrl} alt={item?.title} width={292} height={112} />
                  </div>
                  <div className={classNames("card-title")}>
                    {item?.title}
                  </div>
                  {renderDescription(item?.description)}
                  {/* <div className={classNames("card-created")}>
                    <span>{"创建人：" + item?.creator }</span>
                    <span>{"创建时间：" + item?.createdTime }</span>
                  </div> */}
                </section>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
};

export default KnowledgeList;