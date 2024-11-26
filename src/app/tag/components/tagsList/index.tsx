"use client"
import React from "react"
import Image from "next/image"
import ImgSearchIcon from "@/public/images/search-icon.png"
import { Input, Table } from "antd"
import { columns, data } from "./mock"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TagsList = () => {
  console.log('tagslist')
  return (
    <div className={classNames("tagslist")}>
      <div className={classNames("tagslist-search")}>
        <Input 
          className={classNames("tagslist-search-input")} 
          // @ts-ignore
          prefix={<Image src={ImgSearchIcon} width={24} height={24} />} 
          placeholder="请输入标签名称" 
        />
      </div>
      <div className={classNames("tagslist-content")}>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>    
  )
}

export default TagsList