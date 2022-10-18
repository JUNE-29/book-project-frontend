import React, { useRef } from "react";
import styles from "./doneBooksItem.module.css";

const DoneBooksItem = ({ doneBook, doneBook: { book }, onSelectBook }) => {
  const liCheck = useRef();
  const onClick = () => {
    let checkedBook = liCheck.current.children[0];
    if (checkedBook.checked) {
      OnlyCheckBox(checkedBook);
    }
  };
  return (
    <li className={styles.li} ref={liCheck} onClick={onClick}>
      <input
        name="doneBook"
        className={styles.input}
        type="checkbox"
        id={doneBook.memberBookId}></input>
      <label
        className={styles.label}
        htmlFor={doneBook.memberBookId}
        onClick={() => onSelectBook(doneBook)}>
        <img className={styles.thumbnail} src={book.imageSrc} alt="thumbnail" />
        <span className={styles.title}>
          {book.title.length > 11 ? `${book.title.slice(0, 11)}..` : book.title}
        </span>
        <span className={styles.author}>{book.author}</span>
        <span className={`material-symbols-outlined ${styles.check}`}>
          check_circle
        </span>
      </label>
    </li>
  );
};

function OnlyCheckBox(checkedBook) {
  const checkBoxs = document.getElementsByName("doneBook");
  checkBoxs.forEach((book) => {
    book.checked = false;
  });
  checkedBook.checked = true;
}

export default DoneBooksItem;
