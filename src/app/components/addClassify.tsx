import React, { useMemo } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addFaqTree, updateFaqTree } from "@/lib/features/slices/faqSlice";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  id?: string
  type: string;
  show: boolean;
  onClose: () => void;
  onOk: (values: { name: string; sort: number }) => void; // 修改onOk函数类型
}

const AddClassify = (props: Props) => {
  const { id, type, show, onClose, onOk } = props;
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  // 校验规则
  const validateRules = {
    name: [
      { required: true, message: '请输入分类名称', whitespace: true },
    ],
    sort: [
      { required: true, message: '请输入排序', type: 'number' },
    ],
  };

  // 处理确认按钮点击事件
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (type === 'add') {
        // @ts-ignore
        dispatch(addFaqTree(values))
      } else {
        const params = {
          id,
          ...values
        }
        // @ts-ignore
        dispatch(updateFaqTree(params))
      }
      onClose()
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

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
          onClick={handleOk}
        >
          确定
        </Button>
      </div>
    );
  }, []);

  return (
    <Modal
      title={
        <div className={classNames("add-classify-title")}>
          <span>{type === "add" ? "新增分类" : "编辑分类"}</span>
        </div>
      }
      width={560}
      open={show}
      onCancel={onClose}
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
          name="name" // 添加name属性
          rules={validateRules.name} // 应用校验规则
          className={classNames("form-item-label")}
        >
          <Input className={classNames("form-item-input")} placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="排序"
          name="sort" // 添加name属性
          // @ts-ignore
          rules={validateRules.sort} // 应用校验规则
          className={classNames("form-item-label")}
        >
          <InputNumber min={1} className={classNames("form-item-input")} placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClassify;
