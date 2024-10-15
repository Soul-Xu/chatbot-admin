// 使用 'use client' 是 Next.js 13+ 的用法，确保在客户端组件中使用
'use client';
import React from 'react';
import Letter from '../components/letter'
import Genre from '../components/genre'
import Line from '../components/line';
import BiFoldLine from '../components/biFoldLine';
import Pie from '../components/pie';
import Donut from '../components/donut';
import classnames from "classnames/bind";
import styles from "./index.module.scss";
const classNames = classnames.bind(styles);

const Dashboard = () => {
  return (
    <div>
      {/* <div className={classNames("graph-box")}>
        <div className={classNames("graph-box-item")}>
          <Letter />
        </div>
        <div className={classNames("graph-box-item")}>
          <Genre />
        </div>
      </div>
      <div className={classNames("graph-box")}>
        <div className={classNames("graph-box-item")}>
          <Line />
        </div>
        <div className={classNames("graph-box-item")}>
          <BiFoldLine />
        </div>
      </div>
      <div className={classNames("graph-box")}>
        <div className={classNames("graph-box-item")}>
          <Pie />
        </div>
        <div className={classNames("graph-box-item")}>
          <Donut />
        </div>
      </div> */}
      首页
    </div>
  );
};

export default Dashboard;
