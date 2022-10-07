import React from "react";
import BookBasketItem from "../bookBasketItem/bookBasketItem";
import styles from "./bookBasket.module.css";

const BookBasket = ({ totalBooks, bookList, onBookClick }) => {
  return (
    <section className={styles.bookBasket}>
      <div className={styles.info}>
        <span className={styles.totalBooks}>
          총 읽고 싶은 책: {totalBooks}권
        </span>
      </div>
      <div className={styles.booksBox}>
        <ul className={styles.books}>
          {bookList.map((books) => (
            <BookBasketItem
              key={books.book.bookId}
              book={books}
              onBookClick={onBookClick}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookBasket;
