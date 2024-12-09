
import React from "react"
import Container from "../../../components/container";
import AddTemplate from "../add/page";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const TemplateEdit = () => { 
  return (
    <div className={classNames("templateEdit")}>
      <Container>
        <div className={classNames("main-content")}>
          <AddTemplate /> 
        </div>
      </Container>
    </div>
  )
}

export default TemplateEdit

