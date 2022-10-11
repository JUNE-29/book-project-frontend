import React from "react";
import styles from "./bookReviewList.module.css";
import BookReviewItem from "../bookReviewItem/bookReviewItem";

const BookReviewList = ({ reviewList }) => {
  return (
    <ul className={styles.ul}>
      {reviewList.map((review) => (
        <BookReviewItem key={review.reviewId} review={review} />
      ))}
    </ul>
  );
};

export default BookReviewList;
