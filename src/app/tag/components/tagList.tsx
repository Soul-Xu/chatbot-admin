
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getTagList } from "@/lib/features/slices/tagSlice";
import { Table } from "antd"
import { useRouter } from "next/navigation";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const initialParmas = {
  pageSize: 10,
  pageNo: 1,
  name: null,
}

const tagList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const tagState = useSelector((state: any) => state.tag)
  const { tagList } = tagState
  const [queryParams, setQueryParams] = useState(initialParmas)
  const [tableData, setTableData] = useState<any>([])

  const pagination = {
    current: queryParams.pageNo / queryParams.pageSize + 1,
    pageSize: queryParams.pageSize,
    total: tagList?.totalCount, // 总条数
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
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '标签名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '同义标签',
      dataIndex: 'synonymList',
      key: 'synonymList',
      render: (_:any, record: any) => {
        return <div>{record?.synonymList.map((item:any) => item.name).join(', ')}</div>
      }
    },
    {
      title: '标签分类',
      dataIndex: 'category',
      key: 'category',
      render: (_:any, record: any) => {
        return <div>{record?.category?.name}</div>
      }
    },
    {
      title: '使用次数',
      dataIndex: "useCount",
      key: 'useCount',
    }
  ]

  useEffect(() => {
    if (tagList) {
      const list = tagList?.data.map((item: any, index: number) => {
        return {
          ...item,
          key: index,
          sort: index + 1,
        }
      })
      setTableData(list)
    }
  }, [tagList])

  useEffect(() => {
    const params = {
      pageSize: 10,
      pageNo: 1,
      name: null,
    }
    // @ts-ignore
    dispatch(getTagList(params))
  }, [])

  return (
    <div className={classNames("tagList")}>
      <div className={classNames("tagList-content")}>
        <Table 
          columns={columns} 
          dataSource={tableData} 
          pagination={pagination}
        />
      </div>
    </div>    
  )
}

export default tagList