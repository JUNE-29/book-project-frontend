import { ConstructionOutlined } from "@mui/icons-material";
import React from "react";
import styles from "./ReadBookItem.module.css";

const ReadBookItem = ({ books, onBookClick }) => {
  const { id, title, author } = books.book;
  const bookType = id % 2 === 0 && styles.second;
  return (
    <>
      <li
        className={`${styles.book} ${bookType}`}
        onClick={() => onBookClick(books)}>
        <span>
          {title} - {author}
        </span>
      </li>
    </>
  );
};

export default ReadBookItem;
