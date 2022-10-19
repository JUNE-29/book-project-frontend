import React from "react";
import styles from "./reviewDetail.module.css";

const ReviewDetail = ({ reviewDetail }) => {
  const { content, createDateTime, title } = reviewDetail;
  return (
    <div className={styles.contents}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.button}> 수정하기</button>
      </div>
      <span className={styles.date}>작성 날짜: {createDateTime}</span>
      <p className={styles.reviewContents}>{content}</p>
    </div>
  );
};

export default ReviewDetail;
