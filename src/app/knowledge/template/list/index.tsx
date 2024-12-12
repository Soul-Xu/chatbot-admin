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

const initialParmas = {
  pageSize: 10,
  pageNo: 1,
  subject: '',
  categoryId: ''
}

const TemplateList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const templateState = useSelector((state: any) => state.template);
  const { templateList, selectedTemplateNode } = templateState;
  // 使用useState创建面包屑项的状态
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [queryParams, setQueryParams] = useState(initialParmas)
  const [tableData, setTableData] = useState<any>([])

   // 项目列表中使用了多个@lui/core相关组件，可能是组件底层有影响，无法自动触发相关配置，需要手动添加
  const pagination = {
    current: queryParams.pageNo / queryParams.pageSize + 1,
    pageSize: queryParams.pageSize,
    total: templateList?.totalCount,
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
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: '流程描述',
      dataIndex: 'description',
      key: 'description',
      render: (_:any, record: any) => {
        return <div dangerouslySetInnerHTML={{__html: record?.description}}></div>
      }
    },
    {
      title: '知识标签',
      dataIndex: 'tagList',
      key: 'tagList',
      render: (_:any, record: any) => {
        return <div>{record?.tagList.map((item:any) => item.name).join(', ')}</div>
      }
    },
    {
      title: '可使用者',
      dataIndex: 'readerFlag',
      key: 'readerFlag',
      render: (_:any, record: any) => {
        if (record.readerFlag === 'ALL') {
          return <div>所有人</div>
        } else if (record.readerFlag === 'RANGE') {
          return <div>{record?.readers.map((item:any) => item.name).join(', ')}</div>
        } else if (record.readerFlag === null) {
          return <div>无</div>
        }
      }
    },
    {
      title: '流程链接',
      dataIndex: 'url',
      key: 'url'
    }
  ]

  const handleRowClick = (record: any) => {
    router.push(`/#/knowledge/template/view?id=${record.id}`)
    dispatch(setCurrentUrl('knowledge/template/view'))
  }

  useEffect(() => {
    if (templateList !== null) {
      const dataSource = templateList?.data.map((item: any) => {
        return {
          ...item,
          key: item.id,
        }
      })
      setTableData(dataSource)
    }
  }, [templateList])

  // 当selectedTemplateNode变化时，更新面包屑项
  useEffect(() => {
    if (selectedTemplateNode) {
      // 面包屑逻辑
      const pathParts = selectedTemplateNode.path.split('/');
      const newBreadcrumbItems = pathParts.map((part:any, index:any) => {
        if (index === pathParts.length - 1) {
          return {
            title: <a href="#/knowledge/faq/list" style={{ color: '#000', fontWeight: 500 }}>{part}</a>,
          };
        }
        return {
          title: part,
        };
      });
      setBreadcrumbItems(newBreadcrumbItems);

      // 列表显示逻辑
      const params = {
        pageSize: 10,
        pageNo: 1,
        categoryId: selectedTemplateNode?.id
      }
      // @ts-ignore
      dispatch(getTemplateList(params));
    }
  }, [selectedTemplateNode]);

  return (
    <div className={classNames("templateList")}>
      <Container>
        <div className={classNames("main-title")}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className={classNames("main-table")}>
          <Table 
            columns={columns} 
            dataSource={tableData} 
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