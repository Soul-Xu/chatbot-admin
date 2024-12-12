
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Input, TreeSelect } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from "@/lib/features/slices/tagSlice";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);
interface Props {
  show: boolean;
  onClose: () => void;
  onOk: () => void; // 修改onOk函数类型
}

const initFormValues = {
  name: '',
  sort: 1
}

const AddTagModal = (props: Props) => {
  const { show, onClose, onOk } = props;
  const dispatch = useDispatch()
  const tagState = useSelector((state: any) => state.tag)
  const { tagTree } = tagState
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>(initFormValues)
  const [treeData, setTreeData] = useState<any>([])

  const onFormValuesChange = (key: string, e: any) => {
    if (key === 'name') {
      const value = e.target.value
      form.setFieldsValue({
        [key]: value,
      })
      setFormValues({ ...formValues, [key]: value })
    } else if (key === 'category') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: {
          id: e
      }})
    }
  }

  const convertToTreeData = (data: any) => {
    return data?.map((item: any) => {
      const node = {
        label: item.name, // 设置节点显示的文本
        title: item.name, // 设置节点显示的文本
        value: item.id, // 设置节点的值，通常与 key 相同
        key: item.id, // 设置节点的唯一标识符
        children: item.children ? convertToTreeData(item.children) : undefined,
      };
      return node;
    });
  };

  // 校验规则
  const validateRules = {
    name: [
      { required: true, message: '请输入标签名称', whitespace: true },
    ],
  };

  // 处理确认按钮点击事件
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        name: values.name,
        category: {
          id: values.category
        },
        tagType: 'BUSINESS'
        // synonymList: []
      }
      // @ts-ignore
      dispatch(addTag(params))
      setFormValues(initFormValues)
      onOk()
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

    // 在 useEffect 中使用 convertToTreeData 函数来设置树形数据，并添加 parent 属性
  useEffect(() => {
    if (Array.isArray(tagTree)) {
      // 接口返回的树形结构转化成可以渲染的树形结构
      const treeData = convertToTreeData(tagTree);
      setTreeData(treeData);
    } else {
      setTreeData([]);
    }
  }, [tagTree]);

  return (
    <Modal
      title={
        <div className={classNames("add-classify-title")}>
          <span>新增标签</span>
        </div>
      }
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
          label="标签名称"
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
          label="标签分类"
          name="category"
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={formValues.category}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            className={classNames("form-treeSelect")}
            placeholder="请选择标签分类"
            allowClear
            treeDefaultExpandAll
            onChange={(e: any) => onFormValuesChange("category", e)}
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTagModal;
