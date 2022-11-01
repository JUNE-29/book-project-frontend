import React from "react";
import styles from "./memberBookDetail.module.css";
import {
  ReadOnlyHeartRate,
  ReadOnlyStarRate,
} from "../../components/rating/rating";

const MemberBookDetail = ({ book }) => {
  console.log(book);
  const totalRate = book.book.totalRate.rate;
  return (
    <div className={styles.contents}>
      <div>
        <img
          className={styles.thumbnail}
          src={book.book.imageSrc}
          alt="thumbnail"></img>
      </div>
      <div className={styles.infoBox}>
        <h3 className={styles.title}>{book.book.title}</h3>
        <span className={styles.authors}>{book.book.author}</span>
        <span className={styles.division}> | </span>
        <span className={styles.publisher}>{book.book.publisher}</span>
        <span className={styles.division}> | </span>
        <span className={styles.datetime}>{book.book.publishDate}</span>
        {totalRate && (
          <>
            <h4 className={styles.totalRate}>전체 점수</h4>
            <div className={styles.rateBox}>
              <ReadOnlyStarRate rate={totalRate} />
              <span className={styles.rateNumber}>{totalRate}</span>
            </div>
          </>
        )}
        {book.myRate && (
          <>
            <h4 className={styles.myRate}> 내 점수 </h4>
            <div className={styles.rateBox}>
              <ReadOnlyHeartRate rate={book.myRate} />
              <span className={styles.rateNumber}>{book.myRate}</span>
            </div>
          </>
        )}
        <h4 className={styles.summaryTitle}>책소개</h4>
        <p className={styles.summary}>{book.book.summary}</p>
      </div>
    </div>
  );
};

export default MemberBookDetail;
