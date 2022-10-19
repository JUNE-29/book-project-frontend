import React from "react";
import styles from "./bookReviewList.module.css";
import BookReviewItem from "../bookReviewItem/bookReviewItem";

const BookReviewList = ({ reviewList, onReviewClick }) => {
  return (
    <ul className={styles.ul}>
      {reviewList.map((review) => (
        <BookReviewItem
          key={review.reviewId}
          review={review}
          onReviewClick={onReviewClick}
        />
      ))}
    </ul>
  );
};

export default BookReviewList;
