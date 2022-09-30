import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
import SearchBookDetailModal from "../searchBookDetailModal/searchBookDetailModal";
import styles from "./searchBookDetail.module.css";

const SearchBookDetail = ({ backendAPI }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const location = useLocation();
  const book = location.state.book;

  const addDoneBook = (rate, doneDate) => {
    const bookType = "DONE";
    backendAPI.checkMemberBook(book, bookType, rate, doneDate);
  };

  const addWillBook = () => {
    const bookType = "WILL";
    backendAPI.checkMemberBook(book, bookType);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h3 className={styles.h3}>책 정보 자세히보기</h3>
        <div className={styles.contents}>
          <div>
            <img className={styles.thumbnail} src={book.thumbnail}></img>
          </div>
          <div className={styles.infoBox}>
            <h3 className={styles.title}>{book.title}</h3>
            <span className={styles.authors}>{book.authors}</span>
            <span className={styles.division}> | </span>
            <span className={styles.publisher}>{book.publisher}</span>
            <span className={styles.division}> | </span>
            <span className={styles.datetime}>
              {book.datetime.slice(0, 10)}
            </span>
            <h4 className={styles.h4}>책소개</h4>
            <p className={styles.bookContents}>{book.contents}</p>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={addWillBook}>
            읽고 싶은 책에 담기
          </button>
          <div className={styles.done}>
            <button className={styles.button} onClick={showModal}>
              읽은 책에 담기
            </button>
            {modalOpen && (
              <SearchBookDetailModal
                addDoneBook={addDoneBook}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBookDetail;