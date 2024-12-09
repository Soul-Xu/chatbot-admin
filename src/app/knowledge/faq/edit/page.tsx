
import React from "react"
import Container from "../../../components/container";
import AddFaq from "../add/page";
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const FaqEdit = () => {
  return (
    <div className={classNames("faqEdit")}>
      <Container>
        <div className={classNames("main-content")}>
          <AddFaq /> 
        </div>
      </Container>
    </div>
  )
}

export default FaqEdit

