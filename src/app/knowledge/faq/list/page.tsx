"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getFaqList } from "@/lib/features/slices/faqSlice";
import { useRouter } from "next/navigation";
import { Breadcrumb, Table } from "antd"
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const dataSource = [
  {
    id: '3',
    key: '3',
    question: '日常流程问答',
    answer: '答案1',
    createByName: '陈洪',
    createTime: '2022.03.22 16:47:22',
    fdUseCount: '49',
    fdStatus: '已生效'
  },
  {
    id: '4',
    key: '4',
    question: '日常流程问答',
    answer: '答案1',
    createByName: '陈洪',
    createTime: '2022.03.22 16:47:22',
    fdUseCount: '49',
    fdStatus: '已生效'
  },
]

const initialParmas = {
  pageSize: 10,
  pageNo: 0,
  question: '',
}

const FaqList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const faqState = useSelector((state: any) => state.faq);
  const { faqList } = faqState;
  const [queryParams, setQueryParams] = useState(initialParmas)
  // const [totalCount, setTotalCount] = useState<any>(0)

  // 项目列表中使用了多个@lui/core相关组件，可能是组件底层有影响，无法自动触发相关配置，需要手动添加
  const pagination = {
    current: queryParams.pageNo / queryParams.pageSize + 1,
    pageSize: queryParams.pageSize,
    // total: faqList?.totalCount,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {
      const newOffset = (page - 1) * pageSize // 计算新的偏移量
      const newQueryParams = { ...queryParams, pageSize, offset: newOffset }
      setQueryParams(newQueryParams) // 更新查询参数
      // @ts-ignore
      dispatch(getFaqList(newQueryParams))
    }
  }

  const columns = [
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: '创建人',
      dataIndex: 'createByName',
      key: 'createByName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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

  const handleRowClick = (record: any) => {
    router.replace(`#/knowledge/faq/view?id=${record.id}`);
    dispatch(setCurrentUrl('knowledge/faq/view'));
  }

  useEffect(() => {
    const params = {
      pageSize: 10,
      pageNo: 1,
      // question: '',
    }
    // @ts-ignore
    dispatch(getFaqList(params));
  }, [])
 
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
            pagination={pagination}
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

