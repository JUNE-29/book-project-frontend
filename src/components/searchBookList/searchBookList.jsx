import React from "react";
import SearchBookItem from "../searchBookItem/searchBookItem";
import styles from "./searchBookList.module.css";

const SearchBookList = ({ target, booklist, onBookClick }) => {
  return (
    <ul className={styles.list}>
      {booklist.map((book) => (
        <SearchBookItem
          key={book.isbn}
          book={book}
          target={target}
          onBookClick={onBookClick}
        />
      ))}
    </ul>
  );
};

export default SearchBookList;
