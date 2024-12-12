"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
// import Container from "@/app/components/container";
import AddTagModal from "@/app/components/addTag";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import Image from "next/image"
import ImgBackIcon from "@/public/images/back-icon.png"
import { Button, Form, Select, Tag, TreeSelect, Input } from "antd"
import type { TreeSelectProps } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { treeData } from "@/app/constants/mock"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const tagList = [
  {
    id: 1,
    name: "流程开发",
  },
  {
    id: 2,
    name: "开发规范",
  },
]

const AddTemplate = () => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  const [form] = Form.useForm();
  const [editorValue, setEditorValue] = useState("")
  const [curType, setCurType] = useState<any>("add")
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [selectTags, setSelectTags] = useState<any>([])

  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge/template/list'))
  }

  const handleEditorChange = (value: any) => {
    console.log('handleEditorChange', value)
  }

  const onShowAddModal = () => {
    setShowAddTagModal(true)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentType = window.location.hash.replace(/^#\/?/, '')
      if (currentType && currentType.includes('edit')) {
        setCurType("edit");
        const id = currentUrl.split('/').pop();
        if (id) {
          setTemplateId(id);
          // @ts-ignore
          dispatch(getFaqDetail(id));
        }
      } else {
        setCurType("add")
      }
    }
  }, [])

  return (
    <div className={classNames("addTemplate")}>
      { curType === "add" && (
        <div className={classNames("addTemplate-header")}>
          <div className={classNames("addTemplate-header-left")}>
            <div className={classNames("addTemplate-header-left-icon")}>
              <Link href="#/knowledge/template/list" onClick={handleBack}>
                <Button className={classNames("icon-btn")}>
                  <Image src={ImgBackIcon} alt="back-icon" width={12} height={12} />
                </Button>
              </Link>
            </div>
            <div className={classNames("addTemplate-header-left-title")}>新增知识</div>
          </div>
        </div>
      )}
      <div className={classNames("addTemplate-content")}>
        <Form
          form={form}
          className={classNames("form")}
          name="addKnowledge"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="流程分类"
            name="processType"
            rules={[{ required: true, message: '请选择流程分类' }]}
          >
            <Select
              // onChange={handleChange}
              // value={selectedValue}
              className={classNames("form-select")}
              placeholder="请选择问题类型"
            >
              <Select.Option value="1">数字化办公室 - 金科中心常用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="知识标签"
            name="fdTag"
            rules={[{ required: true, message: '请选择知识标签' }]}
          >
            { tagList.map((tag: any) => {
              return (
                <Tag key={tag.id} className={classNames("form-tag")}>{tag.name}</Tag>
              )
            }) }
            <Button 
              icon={<PlusOutlined />} 
              className={classNames("action-add")}
              onClick={onShowAddModal}
            >
              添加
            </Button>
          </Form.Item>
          <Form.Item
            label="可使用者"
            name="question"
            rules={[{ required: true, message: '请输入问题' }]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              className={classNames("form-treeSelect")}
              placeholder="请选择可使用者"
              allowClear
              treeDefaultExpandAll
              onChange={onChange}
              treeData={treeData}
              onPopupScroll={onPopupScroll}
            />
          </Form.Item>
          <Form.Item
            label="流程名称"
            name="processName"
            rules={[{ required: true, message: '请输入流程名称' }]}
          >
            <Input placeholder="请输入流程名称" className={classNames("form-input")} />
          </Form.Item>
          <Form.Item
            label="流程链接"
            name="processLink"
            rules={[{ required: true, message: '请输入流程链接' }]}
          >
            <Input placeholder="请输入流程链接" className={classNames("form-input")} />
          </Form.Item>
          <Form.Item
            label="流程描述"
            name="fdDescription"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              theme="snow"
              value={editorValue} 
              className={classNames("form-editor")}
              onChange={handleEditorChange}
            />
          </Form.Item>
        </Form>
        <div
          className={classNames({ 
          "action-btns-add" : curType === "add", 
          "action-btns-edit": curType !== "add" 
        })}>
          <Button type="primary" className={classNames("action-btns-submit")}>
            提交
          </Button>
          {/* <Button type="primary" className={classNames("action-btns-submit")}>
            保存草稿
          </Button> */}
          <Button className={classNames("action-btns-cancel")}>
            取消
          </Button>
        </div>
      </div>
      {
        showAddTagModal && 
        <AddTagModal
          selectTags={selectTags}
          show={showAddTagModal}
          onClose={() => setShowAddTagModal(false)}
          onOk={() => setShowAddTagModal(false)}
        />
      }
    </div>
  )
}

export default AddTemplate