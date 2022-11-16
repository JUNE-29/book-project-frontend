import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import MemberBookDetail from "../../components/memberBookDetail/memberBookDetail";
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
    // backendAPI
    //   .removeMemberBook(book.memberBookId)
    //   .then((response) => goToBooks(response.data.msg));
  };

  const navigate = useNavigate();
  const goToBooks = (msg) => {
    !msg && navigate("/books");
    alert("삭제되었습니다.");
  };

  return (
    <>
      <div className={styles.container}>
        <MemberBookDetail book={book} />
        <div className={styles.buttonBox}>
          {book.donDate === null && (
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
