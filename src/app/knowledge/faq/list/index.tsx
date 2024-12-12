"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { getFaqList } from "@/lib/features/slices/faqSlice";
import { useRouter } from "next/navigation";
import { Breadcrumb, Table, Tooltip } from "antd"
import Container from "../../../components/container";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const initialParmas = {
  pageSize: 10,
  pageNo: 1,
  question: '',
}

const FaqList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const faqState = useSelector((state: any) => state.faq);
  const { faqList, selectedFaqNode } = faqState;
  // 使用useState创建面包屑项的状态
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [queryParams, setQueryParams] = useState(initialParmas)
  const [tableData, setTableData] = useState<any>([])
  // const [totalCount, setTotalCount] = useState<any>(0)

  const pagination = {
    current: queryParams.pageNo / queryParams.pageSize + 1,
    pageSize: queryParams.pageSize,
    total: faqList?.totalCount, // 总条数
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
      width: 150,
      key: 'question',
      render: (text:any) => (
        <div style={{ width: '150px'}}>{text}</div>
      ),
    },
    {
      title: '答案',
      dataIndex: 'answer',
      width: 500,
      key: 'answer',
      render: (text:any) => (
        <div style={{ width: '500px'}}>{text}</div>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'createByName',
      width: 180,
      key: 'createByName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 250,
      key: 'createTime',
    },
    {
      title: '使用量',
      dataIndex: 'fdUseCount',
      width: 100,
      key: 'fdUseCount',
    },
    {
      title: '状态',
      dataIndex: 'fdStatus',
      width: 100,
      key: 'fdStatus'
    }
  ]

  const handleRowClick = (record: any) => {
    router.replace(`#/knowledge/faq/view?id=${record.id}`);
    dispatch(setCurrentUrl('knowledge/faq/view'));
  }

  useEffect(() => {
    if (faqList !== null) {
      const dataSource = faqList?.data.map((item: any) => {
        return {
          ...item,
          key: item.id,
        }
      })
      setTableData(dataSource)
    }
  }, [faqList])

  // 当selectedFaqNode变化时，更新面包屑项
  useEffect(() => {
    if (selectedFaqNode) {
      const pathParts = selectedFaqNode.path.split('/');
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

      const params = {
        pageSize: 10,
        pageNo: 1,
        // question: '',
      }
      // @ts-ignore
      dispatch(getFaqList(params));
    }
  }, [selectedFaqNode]);
 
  return (
    <div className={classNames("faqList")}>
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

export default FaqList

