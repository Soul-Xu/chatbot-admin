"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { getTemplateDetail, templateAdd, templateUpdate } from "@/lib/features/slices/templateSlice";
import { setCurrentUrl } from '@/lib/features/slices/urlSlice';
import AddTagModal from "@/app/components/addTag";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Image from "next/image"
import ImgBackIcon from "@/public/images/back-icon.png"
import { Button, Form, Select, Tag, TreeSelect, Input } from "antd"
import type { TreeSelectProps } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
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
  let curUrl
  const templateState = useSelector((state: any) => state.template);
  const { templateTree, templateDetail } = templateState;
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({
    subject: "",
    description: "",
    category: {
      id: ""
    },
    tagList: [],
    url: "",
    readers: []
  })
  const [treeData, setTreeData] = useState<any>([])
  const [curType, setCurType] = useState<any>("add")
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [templateId, setTemplateId] = useState<string | null>(null);
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

  const onFormValuesChange = (key: string, e: any) => {
    if (key === 'category') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: { id: e } })
    } else if (key === 'tagList' || key === 'description') {
      form.setFieldsValue({
        [key]: e,
      })
      setFormValues({ ...formValues, [key]: e })
    } else if (key === 'subject' || key === 'url') {
      form.setFieldsValue({
        [key]: e?.target?.value,
      })
      setFormValues({ ...formValues, [key]: e?.target?.value })
    }
  }

    // 假设的辅助函数，将标签 ID 转换为标签对象
  const convertListToTags = (lists: string[]) => {
    // 这里需要根据您的数据结构来转换
    return lists.map((list:any) => ({ id: list.key, name: list?.title })); // 示例转换
  };

  const handleAddTag = (selectedTagList: any[], selectedTagIds: string[]) => {
    console.log('handleAddTag', selectedTagList, selectedTagIds)
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

  const onShowAddModal = () => {
    setShowAddTagModal(true)
  }

    // 提交
  const onFinish = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log('values', values)
    // 进行表单校验
    try {
      const payload = {
        ...values,
        ...formValues,
        category: { id: values.category }, // 假设选择的分类ID是values.category
        tagList: formValues.tagList.map((tag: any) => ({ id: tag.id })), // 构造tagList
      };

      if (curType === "add") {
        // @ts-ignore
        await dispatch(templateAdd(payload));
      } else if (curType === "edit" && templateId) {
        const params = {
          ...payload,
          id: templateId
        }
        console.log('params', params)

        // @ts-ignore
        await dispatch(templateUpdate({ id: templateId, ...payload }));
      }
      // 提交成功后的操作，例如跳转或提示
    } catch (error) {
      // 处理错误，例如显示错误消息
      console.error('Failed to submit form:', error);
    }
  }

  // 在 useEffect 中使用 convertToTreeData 函数来设置树形数据，并添加 parent 属性
  useEffect(() => {
    if (Array.isArray(templateTree)) {
      // 接口返回的树形结构转化成可以渲染的树形结构
      const treeData = convertToTreeData(templateTree);
      setTreeData(treeData);
    } else {
      setTreeData([]);
    }
  }, [templateTree]);

  useEffect(() => {
    curUrl = window.location.href;
    const hasUrl = currentUrl || curUrl
    if (hasUrl && hasUrl.includes('edit')) {
      setCurType("edit");
      // const id = new URLSearchParams(hasUrl).get('id');
      const id = hasUrl.split('=').pop();
      if (id) {
        setTemplateId(id);
        // @ts-ignore
        dispatch(getTemplateDetail(id));
      }
    } else {
      setCurType("add");
    }
  }, [currentUrl, curUrl]);

  useEffect(() => {
    if (curType === 'edit' && templateDetail) {
      form.setFieldsValue({
        subject: templateDetail.subject,
        description: templateDetail?.description,
        category: templateDetail?.category,
        tagList: templateDetail?.tagList,
        url: templateDetail?.url,
        readers: templateDetail?.readers
      });
      setFormValues({
        ...formValues,
        subject: templateDetail.subject,
        description: templateDetail?.description,
        category: templateDetail?.category,
        tagList: templateDetail?.tagList,
        url: templateDetail?.url,
        readers: templateDetail?.readers
      });
    }
  }, [templateDetail])

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
            name="category"
            rules={[{ required: true, message: '请选择流程分类' }]}
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
            label="知识标签"
            name="tagList"
            // rules={[{ required: true, message: '请选择知识标签' }]}
          >
            <div className={classNames("tag-container")}>
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
            </div>
          </Form.Item>
          <Form.Item
            label="可使用者"
            name="readers"
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
              onChange={(e: any) => onFormValuesChange("readers", e)}
              treeData={treeData}
              onPopupScroll={onPopupScroll}
            />
          </Form.Item>
          <Form.Item
            label="流程名称"
            name="subject"
            rules={[{ required: true, message: '请输入流程名称' }]}
          >
            <Input 
              placeholder="请输入流程名称" 
              className={classNames("form-input")}
              onChange={(e: any) => onFormValuesChange("subject", e)}
            />
          </Form.Item>
          <Form.Item
            label="流程链接"
            name="url"
            rules={[{ required: true, message: '请输入流程链接' }]}
          >
            <Input 
              placeholder="请输入流程链接" 
              className={classNames("form-input")}
              onChange={(e: any) => onFormValuesChange("url", e)}
            />
          </Form.Item>
          <Form.Item
            label="流程描述"
            name="description"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              theme="snow"
              value={formValues.answer} 
              className={classNames("form-editor")}
              onChange={(e: any) => onFormValuesChange("description", e)}
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

export default AddTemplate