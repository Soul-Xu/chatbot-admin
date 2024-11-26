import React from "react"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUrl } from "@/lib/features/slices/urlSlice";
import { Breadcrumb, Table } from "antd"
import Container from "@/app/components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const data = [
  {
    id: 1,
    key: 1,
    fdProcessTitle: 'IT需求申请',
    fdCreator: '陈海勇',
    fdCreateTime: '2023-11-01 10:00:00',
    fdDepartment: '综合业务开发部',
    fdStatus: '审批中'
  },
  {
    id: 2,
    key: 2,
    fdProcessTitle: 'IT需求申请',
    fdCreator: '陈海勇',
    fdCreateTime: '2023-11-01 10:00:00',
    fdDepartment: '综合业务开发部',
    fdStatus: '审批中'
  },
  {
    id: 3,
    key: 3,
    fdProcessTitle: 'IT需求申请',
    fdCreator: '陈海勇',
    fdCreateTime: '2023-11-01 10:00:00',
    fdDepartment: '综合业务开发部',
    fdStatus: '审批中'
  },
  {
    id: 4,
    key: 4,
    fdProcessTitle: 'IT需求申请',
    fdCreator: '陈海勇',
    fdCreateTime: '2023-11-01 10:00:00',
    fdDepartment: '综合业务开发部',
    fdStatus: '审批中'
  },
  {
    id: 5,
    key: 5,
    fdProcessTitle: 'IT需求申请',
    fdCreator: '陈海勇',
    fdCreateTime: '2023-11-01 10:00:00',
    fdDepartment: '综合业务开发部',
    fdStatus: '审批中'
  },
]

const BaseList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const columns = [
    {
      title: '流程标题',
      dataIndex: 'fdProcessTitle',
      key: 'fdProcessTitle',
    },
    {
      title: '发起人',
      dataIndex: 'fdCreator',
      key: 'fdCreator',
    },
    {
      title: '创建时间',
      dataIndex: 'fdCreateTime',
      key: 'fdCreateTime',
    },
    {
      title: '发起人所在部门',
      dataIndex: 'fdDepartment',
      key: 'fdDepartment',
    },
    {
      title: '审批状态',
      dataIndex: 'fdStatus',
      key: 'fdStatus'
    }
  ]

  const handleRowClick = (record: any) => {
    router.push(`#/knowledge/base/view?id=${record.id}`)
    dispatch(setCurrentUrl('knowledge/base/view'))
  }

  return (
    <div className={classNames("baseList")}>
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
            dataSource={data} 
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

export default BaseList