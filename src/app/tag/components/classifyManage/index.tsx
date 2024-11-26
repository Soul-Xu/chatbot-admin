import React from "react"
import Image from "next/image"
import ImgSearchIcon from "@/public/images/search-icon.png"
import { Input, Table } from "antd"
import { columns, data } from "./mock"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const ClassifyManage = () => {
  return (
    <div className={classNames("classify")}>
      <div className={classNames("classify-search")}>
        <Input 
          className={classNames("classify-search-input")} 
          // @ts-ignore
          prefix={<Image src={ImgSearchIcon} width={24} height={24} />} 
          placeholder="请输入分类名称" 
        />
      </div>
      <div className={classNames("classify-content")}>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>    
  )
}

export default ClassifyManage