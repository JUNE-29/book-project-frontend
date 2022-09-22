import React from "react";
import SearchBookItem from "../searchBookItem/searchBookItem";
import styles from "./searchBookList.module.css";

const SearchBookList = ({ booklist, onBookClick }) => {
  return (
    <ul>
      {booklist.map((book) => (
        <SearchBookItem key={book.isbn} book={book} onBookClick={onBookClick} />
      ))}
    </ul>
  );
};

export default SearchBookList;
