import React from "react";
import ReadBookItem from "../readBookItem/ReadBookItem";
import styles from "./readBooks.module.css";

const ReadBooks = ({ books }) => {
  return (
    <section className={styles.readBooks}>
      <div className={styles.info}>
        <select className={styles.date}>
          <option>2022</option>
        </select>
        <span className={styles.totalBooks}>총 읽은 책 : {books.length}권</span>
      </div>
      <div className={styles.booksBox}>
        <ul>
          {books.map((book) => (
            <ReadBookItem key={book.isbn} book={book} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReadBooks;
