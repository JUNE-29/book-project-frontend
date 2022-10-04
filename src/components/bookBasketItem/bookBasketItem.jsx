import React from "react";
import styles from "./bookBasketItem.module.css";

const BookBasketItem = ({ book, onBookClick }) => {
  const { imageSrc } = book.book;
  return (
    <>
      <li className={styles.book} onClick={() => onBookClick(book)}>
        <img className={styles.thumbnail} src={imageSrc} alt="thumbnail" />
      </li>
    </>
  );
};

export default BookBasketItem;
