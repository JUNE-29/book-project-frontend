import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import { ReadOnlyHeartRate } from "../../components/rating/rating";
import SearchBookDetailModal from "../../components/searchBookDetailModal/searchBookDetailModal";
import styles from "./bookDetail.module.css";

const BookDetail = ({ backendAPI }) => {
  const location = useLocation();
  const book = location.state.book;

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const addDoneBook = (rate, doneDate) => {
    // 읽고 싶은 책 > 읽은 책으로 변경하는 함수
    //const bookType = "DONE";
    // backendAPI.checkMemberBook(book, bookType, rate, doneDate);
  };

  const DeleteBook = () => {
    backendAPI
      .removeMemberBook(book.memberBookId)
      .then((response) => goToBooks(response.data.msg));
  };

  const navigate = useNavigate();
  const goToBooks = (msg) => {
    !msg && navigate("/books");
    alert("삭제되었습니다.");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.contents}>
          <div>
            <img
              className={styles.thumbnail}
              src={book.book.imageSrc}
              alt="thumbnail"></img>
          </div>
          <div className={styles.infoBox}>
            <h3 className={styles.title}>{book.book.title}</h3>
            <span className={styles.authors}>{book.book.author}</span>
            <span className={styles.division}> | </span>
            <span className={styles.publisher}>{book.book.publisher}</span>
            <span className={styles.division}> | </span>
            <span className={styles.datetime}>{book.book.publishDate}</span>
            <div className={styles.rate}>
              {book.myRate && <ReadOnlyHeartRate rate={book.myRate} />}
            </div>
            <h4 className={styles.h4}>책소개</h4>
            <p className={styles.bookContents}>{book.book.summary}</p>
          </div>
        </div>
        <div className={styles.buttonBox}>
          {book.bookType === "WILL" && (
            <Button text="읽은 책에 담기" onClick={showModal} />
          )}
          {modalOpen && (
            <SearchBookDetailModal
              addDoneBook={addDoneBook}
              setModalOpen={setModalOpen}
            />
          )}
          <Button text="삭제하기" onClick={DeleteBook} />
        </div>
      </div>
    </>
  );
};

export default BookDetail;
