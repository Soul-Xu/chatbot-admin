import React from "react"
import Image from "next/image"
import ImgSearchIcon from "@/public/images/search-icon.png"
import Container from "./container"
import { Input, Table } from "antd"
import { columns, data } from "./mock"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const ClassifyManage = () => {
  return (
    <div className={classNames("classify")}>
      <Container>
        分类
      </Container>
    </div>    
  )
}

export default ClassifyManage