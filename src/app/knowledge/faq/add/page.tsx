"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import ImgTemplateIcon from "@/public/images/template-icon.png"
import ImgBackIcon from "@/public/images/back-icon.png"
import ImgAddIcon from "@/public/images/add-icon.png"
import { Tree, Button, Input, Breadcrumb, Table } from "antd"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const AddFaq = () => {
  return (
    <div className={classNames("addFaq")}>
      <div className={classNames("addFaq-header")}>
        <div className={classNames("addFaq-header-left")}>
          <div className={classNames("addFaq-header-left-icon")}>
            <Link href="#/knowledge/faq/list">
              <Button className={classNames("icon-btn")}>
                <Image src={ImgBackIcon} alt="back-icon" width={12} height={12} />
              </Button>
            </Link>
          </div>
          <div className={classNames("addFaq-header-left-title")}>新增知识</div>
        </div>
      </div>
      <div className={classNames("addFaq-content")}>

      </div>
    </div>
  )
}

export default AddFaq