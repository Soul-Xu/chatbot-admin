
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addTagTree, updateTagTree } from "@/lib/features/slices/tagSlice";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
interface Props {
  nodeInfo: any
  type: string;
  show: boolean;
  onClose: () => void;
  onOk: () => void; // 修改onOk函数类型
}

const initFormValues = {
  name: '',
  sort: 1
}

const AddClassify = (props: Props) => {
  const { nodeInfo, type, show, onClose, onOk } = props;
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>(initFormValues)

  const onFormValuesChange = (key: string, e: any) => {
    if (key === 'name') {
      const value = e.target.value
      form.setFieldsValue({
        [key]: value,
      })
      setFormValues({ ...formValues, [key]: value })
    } else if (key === 'sort') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: e })
    }
  }

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
    console.log('handleOk', nodeInfo)
    try {
      const values = await form.validateFields();
      const params = {
        name: values.name,
        // sort: values.sort,
        parentId: nodeInfo?.parentId || null,
        // tagType: ''
      }
      console.log('1111-params', params)
      if (type === 'add') {
        // @ts-ignore
        dispatch(addTagTree(params))
      } else {
        const query = {
          id: nodeInfo?.id,
          ...params
        }
        // @ts-ignore
        dispatch(updateTagTree(query))
      }
      setFormValues(initFormValues)
      onOk()
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  useEffect(() => {
    const name = nodeInfo?.path.split('/').pop()
    if (type !== 'add' && nodeInfo) {
      form.setFieldsValue({
        name,
        sort: nodeInfo.level
      })
      setFormValues({
        name,
        sort: nodeInfo.level
      })
    }
  }, [nodeInfo])

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
          <Input 
            value={formValues.name}
            className={classNames("form-item-input")} 
            placeholder="请输入"
            onChange={(e) => onFormValuesChange('name', e)}
          />
        </Form.Item>
        <Form.Item
          label="排序"
          name="sort" // 添加name属性
          // @ts-ignore
          rules={validateRules.sort} // 应用校验规则
          className={classNames("form-item-label")}
        >
          <InputNumber 
            value={formValues.sort}
            min={1} 
            className={classNames("form-item-input")} 
            placeholder="请输入"
            onChange={(e) => onFormValuesChange('sort', e)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClassify;
