import React from "react";
import styles from "./bookReviewItem.module.css";

const BookReviewItem = ({ review, onReviewClick }) => {
  const { title, createDateTime } = review;
  const bookTitle = review.bookDto.title;
  const emoji = String.fromCodePoint(`0x${review.emoji}`);
  return (
    <li className={styles.li} onClick={() => onReviewClick(review)}>
      <div className={styles.emojiBox}>
        <span className={styles.emoji}>{emoji}</span>
      </div>
      <div className={styles.titleBox}>
        <span className={styles.bookTitle}>{bookTitle}</span>
        <span className={styles.reviewTitle}>{title}</span>
      </div>
      <span className={styles.reviewDate}>{createDateTime}</span>
    </li>
  );
};

export default BookReviewItem;
