import React from "react"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUrl } from "@/lib/features/slices/currentUrlSlice";
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

const TemplateList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

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

  return (
    <div className={classNames("templateList")}>
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

export default TemplateList