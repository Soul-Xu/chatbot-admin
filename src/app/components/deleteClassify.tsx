
import React, { useMemo, useEffect } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFaqTree } from "@/lib/features/slices/faqSlice";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

interface Props {
  nodeInfo: string
  show: boolean;
  onClose: () => void;
  onOk: () => void; // 修改onOk函数类型
}

const DeleteClassify = (props: Props) => {
  const { nodeInfo, show, onClose, onOk } = props;
  const dispatch = useDispatch()
  const selectFaqNode = useSelector((state: any) => state.faq.selectFaqNode)

  // 处理确认按钮点击事件
  const handleOk = async () => {
    try {
      // @ts-ignore
      dispatch(deleteFaqTree(nodeInfo.id))
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

  return (
    <Modal
      title={
        <div className={classNames("add-classify-title")}>
          <span>删除分类</span>
        </div>
      }
      width={560}
      open={show}
      onCancel={onClose}
      className={classNames("add-classify")}
      footer={footer}
    >
      <div className={classNames("add-classify-content")}>您确定要删除该节点吗？</div>
    </Modal>
  );
};

export default DeleteClassify;
