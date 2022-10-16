import React from "react";
import DoneBooksItem from "../doneBooksItem/doneBooksItem";
import styles from "./doneBooksModal.module.css";

const DoneBooksModal = ({
  doneBooks,
  setModalOpen,
  hasNext,
  moreDoneBooks,
}) => {
  console.log(doneBooks);
  const close = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={close}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={styles.title}>
        <h2 className={styles.h2}>읽은 책 서재</h2>
        <span className={styles.info}>책을 선택해주세요</span>
      </div>
      <div className={styles.contents}>
        <ul className={styles.books}>
          {doneBooks.map((doneBook) => (
            <DoneBooksItem doneBook={doneBook} key={doneBook.memberBookId} />
          ))}
          <div>
            <div className={styles.moreButtonBox}>
              {hasNext && (
                <button
                  className={styles.moreButton}
                  onClick={() => moreDoneBooks()}>
                  읽은 책 더 불러오기
                </button>
              )}
            </div>
          </div>
        </ul>
      </div>
      <button className={styles.button}>선택</button>
    </div>
  );
};

export default DoneBooksModal;
