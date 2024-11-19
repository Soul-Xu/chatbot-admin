"use client"
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/currentUrlSlice';
import { useRouter } from "next/navigation";
import { Breadcrumb, Table } from "antd"
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FaqList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);

  const columns = [
    {
      title: '问题',
      dataIndex: 'fdQuestion',
      key: 'fdQuestion',
    },
    {
      title: '答案',
      dataIndex: 'fdAnswer',
      key: 'fdAnswer',
    },
    {
      title: '创建人',
      dataIndex: 'fdCreator',
      key: 'fdCreator',
    },
    {
      title: '创建时间',
      dataIndex: 'fdCreateTime',
      key: 'fdCreateTime',
    },
    {
      title: '使用量',
      dataIndex: 'fdUseCount',
      key: 'fdUseCount',
    },
    {
      title: '状态',
      dataIndex: 'fdStatus',
      key: 'fdStatus'
    }
  ]

  const dataSource = [
    {
      id: '1',
      key: '1',
      fdQuestion: 'IT需求申请',
    },
    {
      id: '2',
      key: '2',
      fdQuestion: '日常流程',
    },
    {
      id: '3',
      key: '3',
      fdQuestion: '日常流程问答',
      fdAnswer: '答案1',
      fdCreator: '陈洪',
      fdCreateTime: '2022.03.22 16:47:22',
      fdUseCount: '49',
      fdStatus: '已生效'
    },
    {
      id: '4',
      key: '4',
      fdQuestion: '日常流程问答',
      fdAnswer: '答案1',
      fdCreator: '陈洪',
      fdCreateTime: '2022.03.22 16:47:22',
      fdUseCount: '49',
      fdStatus: '已生效'
    },
    {
      id: '5',
      key: '5',
      fdQuestion: '用章流程',
    },
    {
      id: '6',
      key: '6',
      fdQuestion: '签报流程',
    },
  ]

  const handleRowClick = (record: any) => {
    router.replace(`#/knowledge/faq/view?id=${record.id}`);
    dispatch(setCurrentUrl('knowledge/faq/view'));
  }
 
  return (
    <div className={classNames("faqList")}>
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
        <div className={classNames("main-table")}>
          <Table 
            columns={columns} 
            dataSource={dataSource} 
            onRow={(record) => {
              return {
                onClick: () => {
                  handleRowClick(record);
                },
              };
            }}
          />
        </div>
      </Container>
    </div>
  )
}

export default FaqList

