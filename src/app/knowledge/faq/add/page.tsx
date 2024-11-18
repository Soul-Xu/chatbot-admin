"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { setCurrentUrl } from '@/lib/features/slices/currentUrlSlice';
import Image from "next/image"
import ImgBackIcon from "@/public/images/back-icon.png"
import { Button, Form, Select, Radio, DatePicker, Input } from "antd"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const AddFaq = () => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  const [form] = Form.useForm();
  const [effectiveTime, setEffectiveTime] = useState(1)
  const [editorValue, setEditorValue] = useState("")
  const [curType, setCurType] = useState<any>("add")

  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge/faq/list'))
  }

  const handleEditorChange = (value: any) => {
    console.log('handleEditorChange', value)
  }

  useEffect(() => {
    if (currentUrl === 'knowledge/faq/add') {
      setCurType("add")
    } else {
      setCurType("edit")
    }
  }, [currentUrl])

  return (
    <div className={classNames("addFaq")}>
      { curType === "add" && (
        <div className={classNames("addFaq-header")}>
          <div className={classNames("addFaq-header-left")}>
            <div className={classNames("addFaq-header-left-icon")}>
              <Link href="#/knowledge/faq/list" onClick={handleBack}>
                <Button className={classNames("icon-btn")}>
                  <Image src={ImgBackIcon} alt="back-icon" width={12} height={12} />
                </Button>
              </Link>
            </div>
            <div className={classNames("addFaq-header-left-title")}>新增知识</div>
          </div>
        </div>
      )}
      <div className={classNames("addFaq-content")}>
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
            label="问题类型"
            name="questionType"
            rules={[{ required: true, message: '请选择问题类型' }]}
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
            label="生效时间"
            name="effectiveTime"
            rules={[{ required: true, message: '请选择生效时间' }]}
          >
            <Radio.Group 
              defaultValue={1} 
              value={effectiveTime}
              onChange={(e) => setEffectiveTime(e.target.value)}
            >
              <Radio value={1} style={{ marginRight: "24px" }}>永久</Radio>
              <Radio value={2}>自定义</Radio>
            </Radio.Group>
          </Form.Item>
          {effectiveTime === 2 && (
            <Form.Item
              label="起始时间"
              name="startTime"
              rules={[{ required: true, message: '起始时间' }]}
            >
              <div className={classNames("form-time")}>
                <DatePicker className={classNames("form-time-item")} />
                  <span className={classNames("form-time-divider")}>~</span>
                <DatePicker className={classNames("form-time-item")} />
              </div>
            </Form.Item>
          )}
          <Form.Item
            label="问题"
            name="question"
            rules={[{ required: true, message: '请输入问题' }]}
          >
            <Input className={classNames("form-input")} type="text" placeholder="请输入问题" />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
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
          <Button type="primary" className={classNames("action-btns-submit")}>
            保存
          </Button>
          <Button className={classNames("action-btns-cancel")}>
            取消
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddFaq