import React, { useMemo } from "react"
import { Modal, Button, Form, Input, InputNumber } from "antd"
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  show: boolean
  onClose: () => void
  onOk: () => void
}

const AddClassify = (props: Props) => {
  const { show, onClose, onOk } = props
  const [form ] = Form.useForm()

  const footer = useMemo(() => {
    return (
      <div className={classNames("add-classify-footer")}>
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
        <div className={classNames("add-classify-title")}>
          <span>新增分类</span>
        </div>
      }
      width={560}
      open={show}
      onCancel={onClose}
      // onOk={handleOk}
      className={classNames("add-classify")}
      footer={footer}
    >
      <Form
        layout={"vertical"}
        form={form}
        className={classNames("add-classify-content")}
      >
        <Form.Item 
          label="分类名称" 
          required
          className={classNames("form-item-label")}
        >
          <Input className={classNames("form-item-input")}  placeholder="请输入" />
        </Form.Item>
        <Form.Item 
          label="排序" 
          required
          className={classNames("form-item-label")}
        >
          <InputNumber min={1} className={classNames("form-item-input")}  placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddClassify