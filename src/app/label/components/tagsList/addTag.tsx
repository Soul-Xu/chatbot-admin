"use client"
import React, { useMemo } from "react"
import { Modal, Button, Form, Input, Select } from "antd"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  show: boolean
  onClose: () => void
  onOk: () => void
}

const AddTag = (props: Props) => {
  const { show, onClose, onOk } = props
  const [form ] = Form.useForm()

  const footer = useMemo(() => {
    return (
      <div className={classNames("add-tag-footer")}>
        <Button 
          className={classNames("footer-cancel")}
          onClick={onClose}
        >
          取消
        </Button>
        <Button
          type='primary'
          className={classNames("footer-ok")}
          onClick={onOk}
        >
          确定
        </Button>
      </div>
    )
  }, [])

  return (
    <Modal
      title={
        <div className={classNames("add-tag-title")}>
          <span>新增标签</span>
        </div>
      }
      width={560}
      visible={show}
      onCancel={onClose}
      // onOk={handleOk}
      className={classNames("add-tag")}
      footer={footer}
    >
      <Form
        layout={"vertical"}
        form={form}
        className={classNames("add-tag-content")}
      >
        <Form.Item 
          label="标签名" 
          required
          className={classNames("form-item-label")}
        >
          <Input className={classNames("form-item-input")} placeholder="请输入" />
        </Form.Item>
        <Form.Item 
          label="同义标签" 
          className={classNames("form-item-label")}
        >
          <Input disabled className={classNames("form-item-input")} placeholder="请输入" />
        </Form.Item>
        <Form.Item 
          label="标签分类" 
          required
          className={classNames("form-item-label")}
        >
          <Select className={classNames("form-item-select")}>
            <Select.Option value="1">类型1</Select.Option>
            <Select.Option value="2">类型2</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTag