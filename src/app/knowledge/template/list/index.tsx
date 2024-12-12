"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUrl } from "@/lib/features/slices/urlSlice";
import { getTemplateList } from "@/lib/features/slices/templateSlice";
import { Breadcrumb, Table } from "antd"
import Container from "@/app/components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const dataSource = [
  {
    id: 1,
    key: 1,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 2,
    key: 2,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 3,
    key: 3,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 4,
    key: 4,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 5,
    key: 5,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 6,
    key: 6,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
  {
    id: 7,
    key: 7,
    fdProcessTitle: 'IT需求申请',
    fdDescription: 'IT需求申请流程',
    fdTag: 'IT,需求,申请',
    fdUser: '海勇',
    fdLink: 'https://workflow-uat.newone.com.cn/web/#/mklogin'
  },
]

const initialParmas = {
  pageSize: 10,
  pageNo: 0,
  searchCount: true,
  offset: 0,
  subject: '',
  categoryId: ''
}

const TemplateList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const templateState = useSelector((state: any) => state.template);
  const { templateList } = templateState;
  const [queryParams, setQueryParams] = useState(initialParmas)

   // 项目列表中使用了多个@lui/core相关组件，可能是组件底层有影响，无法自动触发相关配置，需要手动添加
  const pagination = {
    current: queryParams.pageNo / queryParams.pageSize + 1,
    pageSize: queryParams.pageSize,
    total: templateList.totalCount,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {
      const newOffset = (page - 1) * pageSize // 计算新的偏移量
      const newQueryParams = { ...queryParams, pageSize, offset: newOffset }
      setQueryParams(newQueryParams) // 更新查询参数
      // @ts-ignore
      dispatch(getTemplateList(newQueryParams))
    }
  }

  const columns = [
    {
      title: '流程标题',
      dataIndex: 'fdProcessTitle',
      key: 'fdProcessTitle',
    },
    {
      title: '流程描述',
      dataIndex: 'fdDescription',
      key: 'fdDescription',
    },
    {
      title: '知识标签',
      dataIndex: 'fdTag',
      key: 'fdTag',
    },
    {
      title: '可使用者',
      dataIndex: 'fdUser',
      key: 'fdUser',
    },
    {
      title: '流程链接',
      dataIndex: 'fdLink',
      key: 'fdLink'
    }
  ]

  const handleRowClick = (record: any) => {
    router.push(`#/knowledge/template/view?id=${record.id}`)
    dispatch(setCurrentUrl('knowledge/template/view'))
  }

  useEffect(() => {
    const params = {
      pageSize: 10,
      pageNo: 0,
      searchCount: true,
      offset: 0,
      subject: '',
      categoryId: ''
    }
    // @ts-ignore
    dispatch(getTemplateList(params));
  }, [])

  return (
    <div className={classNames("templateList")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb
            items={[
              {
                title: <Link href="" style={{ color: '#000'}}>数字化办公室</Link>,
              },
              {
                title: <Link href="/knowledge/template/list" style={{ color: '#000'}}>金科中心常用</Link>,
              },
            ]}
          />
        </div>
        <div className={classNames("main-table")}>
          <Table 
            columns={columns} 
            dataSource={templateList.data || dataSource} 
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

export default TemplateList