import React from "react";
import styles from "./searchBookItem.module.css";

const SearchBookItem = ({ book, onBookClick }) => {
  return (
    <li className={styles.li} onClick={() => onBookClick(book)}>
      <div>
        <img
          src={book.thumbnail}
          className={styles.thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.authors}>{book.authors}</p>
        <p className={styles.contents}>
          {book.contents.length > 100
            ? `${book.contents.slice(0, 100)}...`
            : book.contents}
        </p>
      </div>
    </li>
  );
};

export default SearchBookItem;
