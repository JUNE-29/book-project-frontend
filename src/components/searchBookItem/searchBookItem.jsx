import React from "react";
import styles from "./searchBookItem.module.css";

const SearchBookItem = ({ book, onBookClick }) => {
  return (
    <li className={styles.li} onClick={() => onBookClick(book)}>
      <img src={book.thumbnail} alt="thumbnail"></img>
      <div className={styles.info}>
        <p className={styles.title}>{book.title}</p>
        <p className={styles.authors}>{book.authors}</p>
        <p className={styles.contents}>{book.contents}</p>
      </div>
    </li>
  );
};

export default SearchBookItem;
