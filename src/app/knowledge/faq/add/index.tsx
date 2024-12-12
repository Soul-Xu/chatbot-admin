"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import { faqAdd, faqUpdate, getFaqDetail } from '@/lib/features/slices/faqSlice';
import Image from "next/image"
import ImgBackIcon from "@/public/images/back-icon.png"
import { Button, Form, Radio, TreeSelect, DatePicker, Input, Tag } from "antd"
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'
import type { TreeSelectProps } from 'antd';
import AddTagModal from "@/app/components/addTag";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const AddFaq = () => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  let curUrl
  const faqState = useSelector((state: any) => state.faq);
  const { faqTree, faqDetail } = faqState;
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({
    question: "",
    answer: "",
    effectiveType: "FOREVER", // 1:永久 2.自定义
    effectiveBeginTime: "",
    effectiveEndTime: "",
    category: [],
    tagList: []
  })
  const [treeData, setTreeData] = useState<any>([])
  const [curType, setCurType] = useState<any>("add")
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [faqId, setFaqId] = useState<string | null>(null);
  const [selectTags, setSelectTags] = useState<any>([])

  const onShowAddModal = () => {
    setShowAddTagModal(true)
  }

  const handleBack = () => {
    dispatch(setCurrentUrl('knowledge/faq/list'))
  }

  const onFormValuesChange = (key: string, e: any) => {
    if (key === 'effectiveType' || key === 'question') {
      const value = e.target.value
      form.setFieldsValue({
        [key]: value,
      })
      setFormValues({ ...formValues, [key]: value })
    } else if(key === 'effectiveBeginTime' || key === 'effectiveEndTime') {
      const value = dayjs(e); // 确保 e 可以被 dayjs 正确解析
      if (!value.isValid()) { // 检查 value 是否有效
        console.error('Invalid date:', e);
        return;
      }
      form.setFieldsValue({
        [key]: value.valueOf(),
      });
      setFormValues({ ...formValues, [key]: value });
    } else if (key === 'category') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: { id: e } })
    } else if (key === 'tagList') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: e })
    } else if (key === 'answer') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: e })
    }
  }

  // 假设的辅助函数，将标签 ID 转换为标签对象
  const convertListToTags = (lists: string[]) => {
    // 这里需要根据您的数据结构来转换
    return lists.map((list:any) => ({ id: list.key, name: list?.title })); // 示例转换
  };

  const handleAddTag = (selectedTagList: any[], selectedTagIds: string[]) => {
    // 假设您有一个函数可以将标签 ID 转换为标签对象
    const selectedTags = convertListToTags(selectedTagList);
    setFormValues((prevValues:any) => ({
      ...prevValues,
      tagList: [...prevValues.tagList, ...selectedTags]
    }));
  };

  const handleTagClose = (tag:any) => {
    console.log('handleTagClose', tag)
  }

  // Helper function to convert faqList to TreeDataNode format
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

  // 表单校验规则
  const validateRules = {
    category: [{ required: true, message: '请选择问题类型' }],
    effectiveType: [{ required: true, message: '请选择生效时间' }],
    effectiveBeginTime: [{ required: formValues.effectiveType === "CUSTOM", message: '请选择起始时间' }],
    effectiveEndTime: [{ required: formValues.effectiveType === "CUSTOM", message: '请选择结束时间' }],
    question: [{ required: true, message: '请输入问题' }],
    answer: [{ required: true, message: '请输入内容' }],
    tagList: [{ required: true, message: '请选择知识标签' }],
  };

  // 提交
  const onFinish = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    // 进行表单校验
    try {
      const payload = {
        ...values,
        ...formValues,
        category: { id: values.category }, // 假设选择的分类ID是values.category
        tagList: formValues.tagList.map((tag: any) => ({ id: tag.id })), // 构造tagList
      };

      if (formValues.effectiveType === "FOREVER") {
        delete payload.effectiveBeginTime 
        delete payload.effectiveEndTime
      }

      if (curType === "add") {
        // @ts-ignore
        await dispatch(faqAdd(payload));
      } else if (curType === "edit" && faqId) {
        const params = {
          ...payload,
          id: faqId
        }
        console.log('params', params)

        // @ts-ignore
        await dispatch(faqUpdate({ id: faqId, ...payload }));
      }
      // 提交成功后的操作，例如跳转或提示
    } catch (error) {
      // 处理错误，例如显示错误消息
      console.error('Failed to submit form:', error);
    }
  }

  // 在 useEffect 中使用 convertToTreeData 函数来设置树形数据，并添加 parent 属性
  useEffect(() => {
    if (Array.isArray(faqTree)) {
      // 接口返回的树形结构转化成可以渲染的树形结构
      const treeData = convertToTreeData(faqTree);
      setTreeData(treeData);
    } else {
      setTreeData([]);
    }
  }, [faqTree]);

  useEffect(() => {
    curUrl = window.location.href;
    const hasUrl = currentUrl || curUrl
    if (hasUrl && hasUrl.includes('edit')) {
      setCurType("edit");
      // const id = new URLSearchParams(hasUrl).get('id');
      const id = hasUrl.split('=').pop();
      console.log('url-id', id)
      if (id) {
        setFaqId(id);
        // @ts-ignore
        dispatch(getFaqDetail(id));
      }
    } else {
      setCurType("add");
    }
  }, [currentUrl, curUrl]);

  useEffect(() => {
    if (curType === 'edit' && faqDetail) {
      form.setFieldsValue({
        category: faqDetail.category?.id,
        effectiveType: faqDetail.effectiveType,
        effectiveBeginTime: dayjs(faqDetail.effectiveBeginTime, "YYYY-MM-DD HH:mm:ss"),
        effectiveEndTime: dayjs(faqDetail.effectiveEndTime, "YYYY-MM-DD HH:mm:ss"),
        question: faqDetail.question,
        answer: faqDetail.answer,
        tagList: faqDetail.tagList,
      });
      setFormValues({
        ...formValues,
        category: faqDetail.category?.id,
        effectiveType: faqDetail.effectiveType,
        effectiveBeginTime: faqDetail.effectiveBeginTime,
        effectiveEndTime: faqDetail.effectiveEndTime,
        question: faqDetail.question,
        answer: faqDetail.answer,
        tagList: faqDetail.tagList,
      });
    }
  }, [faqDetail])

  useEffect(() => {
    form.setFieldValue('effectiveType', formValues.effectiveType)
  }, [])

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
          name="addFaq"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="问题类型"
            name="category"
            // rules={[{ required: true, message: '请选择问题类型' }]}
            rules={validateRules.category}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={formValues.category}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              className={classNames("form-treeSelect")}
              placeholder="请选择问题类型"
              allowClear
              treeDefaultExpandAll
              onChange={(e: any) => onFormValuesChange("category", e)}
              treeData={treeData}
            />
          </Form.Item>
          <Form.Item
            label="生效时间"
            name="effectiveType"
            // rules={[{ required: true, message: '请选择生效时间' }]}
            rules={validateRules.effectiveType}
          >
            <Radio.Group 
              defaultValue={1} 
              value={formValues.effectiveType}
              onChange={(e: any) => onFormValuesChange("effectiveType", e)}
            >
              <Radio value={"FOREVER"} style={{ marginRight: "24px" }}>永久</Radio>
              <Radio value={"CUSTOM"}>自定义</Radio>
            </Radio.Group>
          </Form.Item>
          {formValues.effectiveBeginTime && (
            <Form.Item
              label="起始时间"
              name="effectiveBeginTime"
              rules={validateRules.effectiveBeginTime}
            >
              <DatePicker
               value={formValues.effectiveBeginTime}
               showTime={{ format: 'HH:mm:ss' }} // 显示时间选择器
               format="YYYY-MM-DD HH:mm:ss" // 设置显示和解析的日期格式
               onChange={(date, dateString) => onFormValuesChange("effectiveBeginTime", date)}
              />
            </Form.Item>
          )}
          {formValues.effectiveType === 'CUSTOM' && (
            <Form.Item
              label="结束时间"
              name="effectiveEndTime"
              rules={validateRules.effectiveEndTime}
            >
              <DatePicker 
                value={formValues.effectiveEndTime}
                showTime={{ format: 'HH:mm:ss' }} // 显示时间选择器
                format="YYYY-MM-DD HH:mm:ss" // 设置显示和解析的日期格式
                onChange={(date, dateString) => onFormValuesChange("effectiveBeginTime", dayjs(date))}
              />
            </Form.Item>
          )}
          <Form.Item
            label="知识标签"
            name="tagList"
            // rules={[{ required: true, message: '请选择知识标签' }]}
            // rules={validateRules.tagList}
          >
            { formValues?.tagList.map((tag: any) => {
              return (
                <Tag 
                  key={tag.id} 
                  className={classNames("form-tag")}
                  closeIcon={<CloseCircleOutlined />}
                  onClose={() => handleTagClose(tag)}
                >
                  {tag.name}
                </Tag>
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
            label="问题"
            name="question"
            // rules={[{ required: true, message: '请输入问题' }]}
            rules={validateRules.question}
          >
            <Input 
              className={classNames("form-input")} 
              type="text" 
              placeholder="请输入问题"
              onChange={(e: any) => onFormValuesChange("question", e)}
            />
          </Form.Item>
          <Form.Item
            label="内容"
            name="answer"
            // rules={[{ required: true, message: '请输入内容' }]}
            rules={validateRules.answer}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              theme="snow"
              value={formValues.answer} 
              className={classNames("form-editor")}
              onChange={(e: any) => onFormValuesChange("answer", e)}
            />
          </Form.Item>
        </Form>
        <div 
          className={classNames({ 
            "action-btns-add" : curType === "add", 
            "action-btns-edit": curType !== "add" 
          })}>
          <Button 
            type="primary" 
            className={classNames("action-btns-submit")}
            onClick={onFinish}
          >
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
          onOk={handleAddTag} // 使用handleAddTag来接收选中的标签
        />
      }
    </div>
  )
}

export default AddFaq