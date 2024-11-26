"use client"
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { useRouter } from "next/navigation";
import { Breadcrumb, Table } from "antd"
import Container from "../../../components/container";
import AddFaq from "../add/page";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FaqEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
 
  return (
    <div className={classNames("faqEdit")}>
      <Container>
        <div className={classNames("main-content")}>
          <AddFaq /> 
        </div>
      </Container>
    </div>
  )
}

export default FaqEdit

