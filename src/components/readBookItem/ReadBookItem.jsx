import React from "react";
import styles from "./ReadBookItem.module.css";

const ReadBookItem = ({ books, onBookClick }) => {
  const { id, title, author } = books.book;
  const bookType = id % 2 === 0 && styles.second;
  return (
    <>
      {/* <li className={`${styles.book} ${getThickness(page)} ${bookType}`}></li> */}
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

// function getThickness(page) {
//   if (page <= 150) {
//     return styles.thin;
//   } else if (page <= 250) {
//     return styles.light;
//   } else if (page <= 350) {
//     return styles.regular;
//   } else if (page < 550) {
//     return styles.medium;
//   } else if (page > 550) {
//     return styles.bold;
//   } else {
//     throw new Error(`unknown page: ${page}`);
//   }
// }

export default ReadBookItem;
