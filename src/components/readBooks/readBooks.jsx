import React from "react";
import ReadBookItem from "../readBookItem/ReadBookItem";
import styles from "./readBooks.module.css";

const ReadBooks = ({ bookList, onBookClick }) => {
  return (
    <section className={styles.readBooks}>
      <div className={styles.info}>
        <select className={styles.date}>
          <option>2022</option>
        </select>
        <span className={styles.totalBooks}>
          총 읽은 책 : {bookList.length}권
        </span>
      </div>
      <div className={styles.booksBox}>
        <ul>
          {bookList.map((books) => (
            <ReadBookItem
              key={books.book.bookId}
              books={books}
              onBookClick={onBookClick}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReadBooks;
