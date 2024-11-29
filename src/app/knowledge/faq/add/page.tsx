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
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs'
import type { TreeSelectProps } from 'antd';
import AddTagModal from "@/app/components/addTag/page";
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

const AddFaq = () => {
  const dispatch = useDispatch();
  const currentUrl = useSelector((state: any) => state.currentUrl);
  // const router = useRouter();

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
  const [curType, setCurType] = useState<any>("add")
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [faqId, setFaqId] = useState<string | null>(null);
  const [selectTags, setSelectTags] = useState<any>([])

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

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
      const value = dayjs(e)
      console.log('value', dayjs(value).valueOf())
      form.setFieldsValue({
        [key]: value.valueOf(),
      })
      setFormValues({ ...formValues, [key]: value })
    }
    else {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: e })
    }
  }

  const handleAddTag = (selectedTagIds: string[]) => {
    console.log('selectedTagIds', selectedTagIds)
    setSelectTags(selectedTagIds)
    // 假设tagList中的每个标签对象都有id属性，且与TreeDataNode的key相对应
    const selectedTags = tagList.filter(tag => selectedTagIds.includes(tag.id.toString()));
    setFormValues((prevValues:any) => ({
      ...prevValues,
      tagList: [...prevValues.tagList, ...selectedTags]
    }));
  };

  const handleTagClose = (tag:any) => {
    console.log('handleTagClose', tag)
  }

  useEffect(() => {
    if (currentUrl && currentUrl.includes('edit')) {
      setCurType("edit");
      const id = currentUrl.split('/').pop();
      if (id) {
        setFaqId(id);
        // @ts-ignore
        dispatch(getFaqDetail(id));
      }
    } else {
      setCurType("add");
    }
  }, [currentUrl]);

  useEffect(() => {
    if (curType === "edit" && faqId) {
      // Populate the form with the detail data
      // @ts-ignore
      dispatch(getFaqDetail(faqId)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          const detail = action.payload.data;
          form.setFieldsValue({
            question: detail.question,
            answer: detail.answer,
            category: detail.category,
            effectiveType: detail.effectiveType,
            effectiveBeginTime: detail.effectiveBeginTime,
            effectiveEndTime: detail.effectiveEndTime,
            tagList: detail.tagList,
          });
          setFormValues({
            question: detail.question,
            answer: detail.answer,
            category: detail.category,
            effectiveType: detail.effectiveType,
            effectiveBeginTime: detail.effectiveBeginTime,
            effectiveEndTime: detail.effectiveEndTime,
            tagList: detail.tagList,  
          })
        }
      });
    }
  }, [curType, faqId, dispatch, form]);

  useEffect(() => {
    form.setFieldValue('effectiveType', formValues.effectiveType)
  }, [])

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

  const onFinish = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log('formValues', values);
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

      console.log('post', payload)

      if (curType === "add") {
        // @ts-ignore
        await dispatch(faqAdd(payload));
      } else if (curType === "edit" && faqId) {
        // @ts-ignore
        await dispatch(faqUpdate({ id: faqId, ...payload }));
      }
      // 提交成功后的操作，例如跳转或提示
    } catch (error) {
      // 处理错误，例如显示错误消息
      console.error('Failed to submit form:', error);
    }
  }

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
              onPopupScroll={onPopupScroll}
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
          {/* {formValues.effectiveType === "CUSTOM" && (
            <Form.Item
              label="起始时间"
              name="startTime"
              // rules={[{ required: true, message: '起始时间' }]}
              rules={validateRules.effectiveBeginTime}
            >
              <div className={classNames("form-time")}>
                <DatePicker 
                  locale={locale}
                  format="YYYY-MM-DD" // 可以根据需要设置日期格式
                  className={classNames("form-time-item")}
                  value={formValues.effectiveBeginTime} 
                  onChange={(e: any) => onFormValuesChange("effectiveBeginTime", e)}
                />
                  <span className={classNames("form-time-divider")}>~</span>
                <DatePicker 
                  locale={locale}
                  format="YYYY-MM-DD" // 可以根据需要设置日期格式
                  className={classNames("form-time-item")} 
                  value={formValues.effectiveEndTime} 
                  onChange={(e: any) => onFormValuesChange("effectiveEndTime", e)}
                />
              </div>
            </Form.Item>
          )} */}
          {formValues.effectiveType === "CUSTOM" && (
            <Form.Item
              label="起始时间"
              name="effectiveBeginTime"
              rules={validateRules.effectiveBeginTime}
            >
              <DatePicker
                // ... other props
              />
            </Form.Item>
          )}
          {formValues.effectiveType === "CUSTOM" && (
            <Form.Item
              label="结束时间"
              name="effectiveEndTime"
              rules={validateRules.effectiveEndTime}
            >
              <DatePicker
                // ... other props
              />
            </Form.Item>
          )}
          <Form.Item
            label="知识标签"
            name="fdTag"
            // rules={[{ required: true, message: '请选择知识标签' }]}
            rules={validateRules.tagList}
          >
            { tagList.map((tag: any) => {
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